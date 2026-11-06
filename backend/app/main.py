"""FastAPI Application Entrypoint for Code Evaluation & Comic Generation Platform."""

import os
import sys
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse

from .config import CORS_ORIGINS, MOVIE_THEMES
from .models.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    RepairRequest,
    RepairResponse,
    ComicRequest,
    ComicResponse,
    ExportPdfRequest,
    BugLocation,
    BugClassification,
    StaticAnalysisSummary,
    LineHeatmap,
    RepairResult,
    ComicPanel
)
from .services.analyzer_service import perform_full_analysis
from .services.localizer_service import compute_line_localization
from .services.repair_service import perform_code_repair
from .services.comic_service import synthesize_educational_comic
from .services.pdf_service import generate_html_report

# Initialize FastAPI
app = FastAPI(
    title="Intelligent Programming Code Evaluation and Bug Localization Platform",
    description="API for CodeBERT bug classification, line localization, AI code repair, and educational comics.",
    version="1.0.0"
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Preset code examples for rapid demonstration
PRESETS = {
    "python": [
        {
            "id": "py-div-zero",
            "name": "Division by Zero",
            "description": "Function dividing by zero when denominator is 0.",
            "code": "def calculate_average(total, count):\n    # Buggy: fails when count is 0\n    avg = total / count\n    return avg\n\nprint(calculate_average(100, 0))",
            "test_code": "assert calculate_average(100, 2) == 50"
        },
        {
            "id": "py-index-oob",
            "name": "Loop Boundary Off-by-One",
            "description": "Loop iterates one element past list boundary.",
            "code": "def get_elements(items):\n    result = []\n    # Off-by-one error: index goes beyond length\n    for i in range(len(items) + 1):\n        result.append(items[i])\n    return result",
            "test_code": "assert get_elements([1, 2, 3]) == [1, 2, 3]"
        },
        {
            "id": "py-infinite-recursion",
            "name": "Infinite Recursion",
            "description": "Recursive countdown without base condition.",
            "code": "def countdown(n):\n    print(f'T-minus {n}')\n    # Missing base case: if n <= 0: return\n    return countdown(n - 1)\n\ncountdown(10)",
            "test_code": ""
        },
        {
            "id": "py-clean",
            "name": "Clean Working Code",
            "description": "Valid Python function with safe checks.",
            "code": "def safe_divide(a, b):\n    if b == 0:\n        return 0\n    return a / b\n\nprint(safe_divide(10, 2))",
            "test_code": "assert safe_divide(10, 2) == 5"
        }
    ],
    "java": [
        {
            "id": "java-div-zero",
            "name": "Java Division by Zero",
            "description": "Integer division by zero in method.",
            "code": "public class Calculator {\n    public static int divide(int a, int b) {\n        // Unchecked division\n        return a / 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(divide(10, 0));\n    }\n}",
            "test_code": ""
        },
        {
            "id": "java-syntax-semi",
            "name": "Java Missing Semicolon",
            "description": "Syntax error due to omitted semicolon.",
            "code": "public class Greeting {\n    public static void main(String[] args) {\n        String msg = \"Hello Hackathon\"\n        System.out.println(msg);\n    }\n}",
            "test_code": ""
        },
        {
            "id": "java-clean",
            "name": "Java Clean Class",
            "description": "Properly structured Java program.",
            "code": "public class Fibonacci {\n    public static int fib(int n) {\n        if (n <= 1) return n;\n        return fib(n - 1) + fib(n - 2);\n    }\n    public static void main(String[] args) {\n        System.out.println(fib(5));\n    }\n}",
            "test_code": ""
        }
    ]
}


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Intelligent Programming Code Evaluation Platform",
        "supported_languages": ["python", "java"],
        "modules": ["CodeBERT Classifier", "AST Bug Localizer", "AI Code Repair", "Educational Comic Engine"]
    }


@app.get("/api/presets")
def get_presets():
    return PRESETS


@app.get("/api/movie-themes")
def get_movie_themes():
    return MOVIE_THEMES


@app.post("/api/analyze")
def analyze_code_endpoint(req: AnalyzeRequest):
    # 1. Full analysis
    analysis_res = perform_full_analysis(req.source_code, req.language)
    if not analysis_res.get("success"):
        raise HTTPException(status_code=400, detail=analysis_res.get("error", "Analysis failed"))

    bugs = analysis_res.get("bugs", [])
    classification_data = analysis_res.get("classification", {})

    # 2. Bug Localization & Heatmap
    localization = compute_line_localization(req.source_code, bugs)

    # 3. Optional Repair
    repair_data = None
    if bugs or classification_data.get("prediction") == "BUGGY":
        repair_res = perform_code_repair(
            source_code=req.source_code,
            language=req.language,
            bugs=bugs,
            bug_description=req.bug_description,
            test_code=req.test_code
        )
        repair_data = RepairResult(
            generated_code=repair_res["generated_code"],
            diff=repair_res["diff"],
            validation=repair_res["validation"],
            functional_tests=repair_res["functional_tests"],
            accepted=repair_res["accepted"],
            model_name=repair_res["model_name"]
        )

    # 4. Synthesize explanation
    explanation = None
    if bugs:
        explanation = "; ".join(f"Line {b.get('line')}: {b.get('message')}" for b in bugs)
    else:
        explanation = "Code passes static syntax analysis and pattern checks."

    return {
        "success": True,
        "language": req.language,
        "bug_classification": classification_data,
        "static_analysis": {
            "success": True,
            "language": req.language,
            "total_bugs": len(bugs),
            "bugs": bugs
        },
        "suspicious_lines": localization["suspicious_lines"],
        "line_heatmap": localization["line_heatmap"],
        "repair": repair_data.dict() if repair_data else None,
        "explanation": explanation
    }


@app.post("/api/repair")
def repair_code_endpoint(req: RepairRequest):
    # First analyze to find bugs
    analysis_res = perform_full_analysis(req.source_code, req.language)
    bugs = analysis_res.get("bugs", [])

    repair_res = perform_code_repair(
        source_code=req.source_code,
        language=req.language,
        bugs=bugs,
        bug_description=req.bug_description,
        test_code=req.test_code
    )

    return {
        "success": True,
        "language": req.language,
        "repaired_code": repair_res["generated_code"],
        "explanation": repair_res["explanation"],
        "diff": repair_res["diff"],
        "validation": repair_res["validation"],
        "functional_tests": repair_res["functional_tests"],
        "accepted": repair_res["accepted"],
        "model_name": repair_res["model_name"]
    }


@app.post("/api/comic")
def generate_comic_endpoint(req: ComicRequest):
    comic = synthesize_educational_comic(
        source_code=req.source_code,
        language=req.language,
        bug_description=req.bug_description or "Unhandled exception in code logic",
        repaired_code=req.repaired_code,
        movie_theme_key=req.movie_theme,
        custom_hero=req.custom_hero
    )
    return comic


@app.post("/api/export-pdf")
def export_pdf_endpoint(req: ExportPdfRequest):
    html_content = generate_html_report(
        source_code=req.source_code,
        language=req.language,
        analysis=req.analysis,
        repair=req.repair,
        comic=req.comic
    )
    return HTMLResponse(content=html_content)

