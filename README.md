# FUN CODE: Intelligent Code Evaluation, Automated Bug Localization & Educational Comic Platform

[![Python 3.11](https://img.shields.io/badge/Python-3.11-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green.svg)](https://fastapi.tiangolo.com)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-cyan.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Bundler-Vite-purple.svg)](https://vitejs.dev)
[![CodeBERT](https://img.shields.io/badge/Model-CodeBERT-orange.svg)](https://huggingface.co/microsoft/codebert-base)

> **Hackathon Deliverable:** An end-to-end intelligent platform that analyzes Python and Java code, locates defects at the line level, explains root causes in human language, repairs bugs automatically, and translates abstract programming concepts into engaging educational comic books featuring characters from popular movies.

---

## 🌟 Key Capabilities

1. **Source Code Analysis (Python & Java):**
   - Live browser-based code editor and file upload (`.py`, `.java`).
   - Unified multi-language parsing with Abstract Syntax Trees (AST) and pattern extractors.

2. **Dual-Layer Bug Detection & Classification:**
   - **Neural Layer:** CodeBERT binary classifier (`CLEAN` vs `BUGGY`).
   - **Static Layer:** Python AST rule visitor + Java syntactic/semantic analyzers.

3. **Automated Line-Level Bug Localization:**
   - Highlights suspicious lines directly in the code editor with severity badges (High, Medium, Low) and fault isolation heatmaps.

4. **Root Cause Explanation:**
   - Translates cryptic compiler/runtime tracebacks into crystal-clear pedagogical explanations.

5. **Automated AI Code Repair:**
   - Generates verified, defensively guarded source code patches using AI code models.
   - Includes syntax validation and automated functional unit test execution.

6. **Educational Movie Comic Generator:**
   - Uses knowledge retrieval from a movie-concept dataset (`comic_movie_dataset.json`).
   - Converts programming concepts into 4-panel cinematic comics across multiple movie universes:
     - ⚔️ **Baahubali** (Mahishmati warfare, resource containers, army drills)
     - 🕶️ **The Matrix** (Construct anomalies, memory corruption, Neo & Morpheus)
     - 🤖 **Marvel Avengers** (Tony Stark, nanotech functions, team arrays, Jarvis)
     - 🧙‍♂️ **Star Wars** (Jedi navigation, logic invariants, Master Yoda)
     - 👑 **Game of Thrones** (Royal council conditions, parameter contracts)

7. **Exportable Diagnostic Reports:**
   - One-click printable PDF reports combining code analysis, bug localization tables, repaired diffs, and full 4-panel illustrated comic strips.

---

## 📁 Repository Structure

```
code-comic-platform/
├── backend/
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── models/          # Pydantic schemas (schemas.py)
│   │   ├── services/
│   │   │   ├── analyzer_service.py   # Python AST + Java + CodeBERT classifier
│   │   │   ├── localizer_service.py  # Line-level fault localization & heatmaps
│   │   │   ├── repair_service.py     # AI code repair & syntax validator
│   │   │   ├── comic_service.py      # Educational movie comic generator
│   │   │   └── pdf_service.py        # Printable report generator
│   │   ├── config.py                 # Paths, models, movie themes
│   │   └── main.py                   # FastAPI application
│   ├── model1/              # Model 1 Package (CodeBERT, analyzer, test results)
│   ├── model2/              # Model 2 Package (dataset, images, comic pipeline)
│   │   ├── dataset/comic_movie_dataset.json
│   │   ├── generated_images/
│   │   └── output/
│   ├── tests/               # Backend test suite (all tests passing)
│   ├── requirements.txt     # Python backend dependencies
│   └── run_backend.py       # Standalone launcher with FastAPI/Uvicorn & fallback
├── frontend/                # Vite + React 19 + TypeScript + Tailwind CSS UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeStudio.tsx        # Interactive Code Evaluation & Comic Studio
│   │   │   ├── Hero.tsx              # Cyberpunk landing hero & terminal
│   │   │   ├── Features.tsx          # 4 core feature modules
│   │   │   ├── MatrixRain.tsx        # Matrix digital rain background
│   │   │   └── ...
│   │   ├── App.tsx
│   │   └── ...
│   └── package.json
├── start_backend.bat        # Windows single-click backend runner
├── start_frontend.bat       # Windows single-click frontend runner
└── README.md
```

---

## 🚀 Getting Started

### 1. Launching the Backend

```bash
cd backend
python run_backend.py
```
* The backend will listen at `http://localhost:8000`.
* API documentation is available at `http://localhost:8000/docs`.

### 2. Launching the Frontend

```bash
cd frontend
npm install
npm run dev
```
* The web app will launch at `http://localhost:3000` (or `http://localhost:5173`).

---

## 🧪 Testing & Verification

Run the comprehensive unit test suite:

```bash
cd backend
python -m unittest discover -s tests
```
All unit tests verify:
- Python zero division and AST fault detection
- Loop boundary off-by-one errors
- Clean code baseline evaluation
- AI code repair generation
- Multi-theme comic generation across all movie universes

