"""Backend Server Launcher with auto-detection for FastAPI/Uvicorn and Standard Library fallback."""

import json
import os
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

# Ensure app directory is importable
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from app.config import HOST, PORT, MOVIE_THEMES
from app.services.analyzer_service import perform_full_analysis
from app.services.localizer_service import compute_line_localization
from app.services.repair_service import perform_code_repair
from app.services.comic_service import synthesize_educational_comic
from app.services.pdf_service import generate_html_report

# Try importing FastAPI/Uvicorn
FASTAPI_AVAILABLE = False
try:
    import fastapi
    import uvicorn
    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False


# Presets data
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


class FallbackHTTPRequestHandler(BaseHTTPRequestHandler):
    """High-reliability standard library HTTP server fallback with CORS."""

    def _set_cors_headers(self, content_type="application/json"):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Content-Type", content_type)

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()
            resp = {
                "status": "healthy",
                "service": "Intelligent Programming Code Evaluation Platform",
                "backend_engine": "Standard Library High-Availability Gateway"
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))

        elif path == "/api/presets":
            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(PRESETS).encode("utf-8"))

        elif path == "/api/movie-themes":
            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(MOVIE_THEMES).encode("utf-8"))

        else:
            self.send_response(404)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not Found"}).encode("utf-8"))

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        try:
            data = json.loads(body)
        except Exception:
            data = {}

        if path == "/api/analyze":
            source_code = data.get("source_code", "")
            language = data.get("language", "python")
            bug_desc = data.get("bug_description")
            test_code = data.get("test_code")

            analysis = perform_full_analysis(source_code, language)
            bugs = analysis.get("bugs", [])
            classification = analysis.get("classification", {})
            localization = compute_line_localization(source_code, bugs)

            repair_data = None
            if bugs or classification.get("prediction") == "BUGGY":
                repair_data = perform_code_repair(source_code, language, bugs, bug_desc, test_code)

            resp = {
                "success": True,
                "language": language,
                "bug_classification": classification,
                "static_analysis": {
                    "success": True,
                    "language": language,
                    "total_bugs": len(bugs),
                    "bugs": bugs
                },
                "suspicious_lines": localization["suspicious_lines"],
                "line_heatmap": localization["line_heatmap"],
                "repair": repair_data,
                "explanation": "; ".join(f"Line {b.get('line')}: {b.get('message')}" for b in bugs) if bugs else "Code conforms to specifications."
            }

            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(resp).encode("utf-8"))

        elif path == "/api/repair":
            source_code = data.get("source_code", "")
            language = data.get("language", "python")
            bug_desc = data.get("bug_description")
            test_code = data.get("test_code")

            analysis = perform_full_analysis(source_code, language)
            bugs = analysis.get("bugs", [])
            repair_data = perform_code_repair(source_code, language, bugs, bug_desc, test_code)

            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(repair_data).encode("utf-8"))

        elif path == "/api/comic":
            source_code = data.get("source_code", "")
            language = data.get("language", "python")
            bug_desc = data.get("bug_description", "")
            repaired_code = data.get("repaired_code")
            movie_theme = data.get("movie_theme", "matrix")
            custom_hero = data.get("custom_hero")

            comic = synthesize_educational_comic(
                source_code=source_code,
                language=language,
                bug_description=bug_desc,
                repaired_code=repaired_code,
                movie_theme_key=movie_theme,
                custom_hero=custom_hero
            )

            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(comic).encode("utf-8"))

        elif path == "/api/export-pdf":
            source_code = data.get("source_code", "")
            language = data.get("language", "python")
            analysis = data.get("analysis", {})
            repair = data.get("repair")
            comic = data.get("comic")

            html_report = generate_html_report(source_code, language, analysis, repair, comic)

            self.send_response(200)
            self._set_cors_headers(content_type="text/html")
            self.end_headers()
            self.wfile.write(html_report.encode("utf-8"))

        else:
            self.send_response(404)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Endpoint Not Found"}).encode("utf-8"))


def start_server():
    if FASTAPI_AVAILABLE:
        print(f"🚀 Starting FastAPI with Uvicorn on {HOST}:{PORT}...")
        uvicorn.run("app.main:app", host=HOST, port=PORT, reload=True)
    else:
        print(f"⚡ FastAPI/Uvicorn not installed. Starting High-Availability Built-in Gateway on http://{HOST}:{PORT}...")
        server = HTTPServer((HOST, PORT), FallbackHTTPRequestHandler)
        print(f"✅ Backend server listening on http://localhost:{PORT}")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down backend server.")
            server.server_close()


if __name__ == "__main__":
    start_server()

