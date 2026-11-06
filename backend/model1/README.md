# Model 1 - Intelligent Code Evaluation and Bug Repair

## Overview

Model 1 analyzes Python and Java source code using:

1. CodeBERT - program-level CLEAN/BUGGY classification.
2. Python AST - Python static analysis.
3. Tree-sitter Java - Java syntax and selected bug-pattern analysis.
4. Ruff - Python lint analysis.
5. Qwen2.5-Coder-0.5B-Instruct - AI-based code repair.
6. Syntax validation and optional Python functional tests.

## Model Locations

CodeBERT:
TRAINED_MODELS/MODEL_1_CODEBERT

Repair model:
Qwen/Qwen2.5-Coder-0.5B-Instruct

Analyzer:
analyzer.py

## Usage

Import the module:

    from model1_pipeline import analyze_and_repair

Call the pipeline:

    result = analyze_and_repair(
        source_code="def add(a, b): return a - b",
        language="python",
        bug_description="The function should add two numbers.",
        test_code="assert add(5, 3) == 8"
    )

## Output

The result includes:

- Bug classification
- Static analysis findings
- Generated repaired code
- Syntax validation
- Optional Python functional test results
- Repair acceptance status

## Important Limitations

- CodeBERT is a binary program-level classifier, not a line-level bug localizer.
- Its current test accuracy is approximately 60.7%.
- Static analysis detects selected bug patterns, not every possible defect.
- Qwen is a pretrained repair model, not a fine-tuned model.
- Functional testing is optional and currently implemented for Python.
- Java validation currently checks compilation, not functional correctness.
- Arbitrary uploaded code must be executed in an isolated sandbox before public deployment.

## Runtime

The current implementation supports CPU inference, although model loading and generation may be slow.
