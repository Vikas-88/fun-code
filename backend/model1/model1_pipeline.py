
import os
import re
import ast
import sys
import torch
import tempfile
import subprocess
import shutil

from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    AutoModelForCausalLM
)

BASE_DIR = "/content/drive/MyDrive/PS4_ML_HANDOVER"

CODEBERT_DIR = os.path.join(
    BASE_DIR, "TRAINED_MODELS", "MODEL_1_CODEBERT"
)

REPAIR_MODEL_ID = "Qwen/Qwen2.5-Coder-0.5B-Instruct"

if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from analyzer import analyze_code

torch.set_num_threads(2)
DEVICE = torch.device("cpu")

# Load CodeBERT
tokenizer = AutoTokenizer.from_pretrained(CODEBERT_DIR)
model = AutoModelForSequenceClassification.from_pretrained(
    CODEBERT_DIR
).to(DEVICE)
model.eval()

# Load Qwen repair model
repair_tokenizer = AutoTokenizer.from_pretrained(REPAIR_MODEL_ID)

repair_model = AutoModelForCausalLM.from_pretrained(
    REPAIR_MODEL_ID,
    torch_dtype=torch.float32,
    low_cpu_mem_usage=True
).to(DEVICE)

repair_model.eval()


def classify_code(code):
    inputs = tokenizer(
        code,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )

    with torch.inference_mode():
        logits = model(**inputs).logits

    probabilities = torch.softmax(logits, dim=-1)[0]
    prediction_id = probabilities.argmax().item()

    return {
        "prediction": model.config.id2label[prediction_id],
        "confidence": round(
            probabilities[prediction_id].item(), 4
        )
    }


def repair_code(code, language, bug_description):
    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert software engineer. Repair the "
                "reported bug while preserving existing functionality, "
                "parameters and variable names. Return the complete "
                "corrected source code only."
            )
        },
        {
            "role": "user",
            "content": f"""
Language: {language}
Bug: {bug_description}

Original code:
{code}

Return the corrected complete program.
"""
        }
    ]

    prompt = repair_tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )

    inputs = repair_tokenizer(prompt, return_tensors="pt")

    with torch.inference_mode():
        outputs = repair_model.generate(
            **inputs,
            max_new_tokens=512,
            do_sample=False
        )

    new_tokens = outputs[0][inputs.input_ids.shape[1]:]

    return repair_tokenizer.decode(
        new_tokens,
        skip_special_tokens=True
    ).strip()


def extract_repaired_code(text, language):
    pattern = rf"```(?:{language.lower()})?\s*(.*?)```"
    match = re.search(
        pattern, text, re.DOTALL | re.IGNORECASE
    )

    return match.group(1).strip() if match else text.strip()


def validate_repaired_code(code, language):
    language = language.lower()

    if language == "python":
        try:
            ast.parse(code)
            return {
                "valid": True,
                "message": "Python syntax passed."
            }
        except SyntaxError as e:
            return {
                "valid": False,
                "message": f"Line {e.lineno}: {e.msg}"
            }

    if language == "java":
        if not shutil.which("javac"):
            return {
                "valid": False,
                "message": "Java compiler unavailable."
            }

        class_match = re.search(
            r"\bpublic\s+class\s+(\w+)", code
        )

        if not class_match:
            return {
                "valid": False,
                "message": "Public Java class not identified."
            }

        with tempfile.TemporaryDirectory() as tmp:
            filepath = os.path.join(
                tmp, class_match.group(1) + ".java"
            )

            with open(filepath, "w") as f:
                f.write(code)

            result = subprocess.run(
                ["javac", filepath],
                capture_output=True,
                text=True,
                timeout=15
            )

            return {
                "valid": result.returncode == 0,
                "message": (
                    "Java compilation passed."
                    if result.returncode == 0
                    else result.stderr
                )
            }

    return {
        "valid": False,
        "message": "Unsupported language."
    }


def verify_python_repair(code, test_code, timeout=5):
    filepath = None

    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            suffix=".py",
            delete=False
        ) as f:
            f.write(code + "\n\n" + test_code)
            filepath = f.name

        result = subprocess.run(
            [sys.executable, filepath],
            capture_output=True,
            text=True,
            timeout=timeout
        )

        return {
            "passed": result.returncode == 0,
            "status": (
                "PASSED" if result.returncode == 0 else "FAILED"
            ),
            "error": result.stderr.strip()
        }

    except subprocess.TimeoutExpired:
        return {
            "passed": False,
            "status": "TIMEOUT",
            "error": "Execution time limit exceeded."
        }

    finally:
        if filepath and os.path.exists(filepath):
            os.remove(filepath)


def analyze_and_repair(
    source_code,
    language,
    bug_description=None,
    test_code=None
):
    language = language.lower().strip()

    if language not in ("python", "java"):
        return {
            "success": False,
            "error": "Only Python and Java are supported."
        }

    classification = classify_code(source_code)

    static_report = analyze_code(source_code, language)

    if not bug_description:
        if static_report.get("bugs"):
            bug_description = "; ".join(
                f"{b['category']}: {b['message']}"
                for b in static_report["bugs"]
            )
        else:
            bug_description = (
                "Review the code for defects. Preserve the original "
                "code if no identifiable defect exists."
            )

    generated = repair_code(
        source_code, language, bug_description
    )

    repaired_code = extract_repaired_code(
        generated, language
    )

    validation = validate_repaired_code(
        repaired_code, language
    )

    functional_report = None

    if language == "python" and test_code:
        if validation["valid"]:
            functional_report = verify_python_repair(
                repaired_code, test_code
            )
        else:
            functional_report = {
                "passed": False,
                "status": "NOT RUN",
                "error": "Syntax validation failed."
            }

    accepted = validation["valid"]

    if functional_report is not None:
        accepted = accepted and functional_report["passed"]

    return {
        "success": True,
        "language": language,
        "bug_classification": classification,
        "static_analysis": static_report,
        "repair": {
            "generated_code": repaired_code,
            "validation": validation,
            "functional_tests": functional_report,
            "accepted": accepted
        }
    }
