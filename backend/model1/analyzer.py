
import ast
import json
import os
import tempfile
import subprocess

from tree_sitter import Language, Parser
import tree_sitter_java


# Initialize Java parser
java_parser = Parser(Language(tree_sitter_java.language()))


# ---------------- PYTHON ANALYZER ----------------

class BugVisitor(ast.NodeVisitor):
    def __init__(self):
        self.bugs = []

    def visit_BinOp(self, node):
        if isinstance(node.op, (ast.Div, ast.FloorDiv, ast.Mod)):
            if isinstance(node.right, ast.Constant) and node.right.value == 0:
                self.bugs.append({
                    "line": node.lineno,
                    "category": "Division by Zero",
                    "severity": "High",
                    "message": "Division or modulo by zero detected.",
                    "suggestion": "Check that the denominator is not zero.",
                    "source": "AST Analysis"
                })
        self.generic_visit(node)


def analyze_python(code):
    bugs = []

    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return [{
            "line": e.lineno,
            "category": "Syntax Error",
            "severity": "High",
            "message": e.msg,
            "suggestion": "Correct the syntax at this line.",
            "source": "Python AST"
        }]

    visitor = BugVisitor()
    visitor.visit(tree)
    bugs.extend(visitor.bugs)

    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".py", delete=False
    ) as f:
        f.write(code)
        filepath = f.name

    try:
        result = subprocess.run(
            ["ruff", "check", "--output-format", "json", filepath],
            capture_output=True,
            text=True
        )

        for issue in json.loads(result.stdout or "[]"):
            bugs.append({
                "line": issue.get("location", {}).get("row"),
                "category": issue.get("code"),
                "severity": "Medium",
                "message": issue.get("message"),
                "suggestion": issue.get("message"),
                "source": "Ruff"
            })
    finally:
        os.remove(filepath)

    return bugs


# ---------------- JAVA ANALYZER ----------------

def analyze_java(code):
    tree = java_parser.parse(code.encode("utf-8"))
    bugs = []

    def inspect(node):
        if node.type == "ERROR" or node.is_missing:
            bugs.append({
                "line": node.start_point.row + 1,
                "category": "Syntax Error",
                "severity": "High",
                "message": "Invalid or incomplete Java syntax.",
                "suggestion": "Check the syntax around this line.",
                "source": "Tree-sitter Java"
            })

        if node.type == "binary_expression":
            operator = node.child_by_field_name("operator")
            right = node.child_by_field_name("right")

            if (
                operator is not None
                and operator.type == "/"
                and right is not None
                and right.type == "decimal_integer_literal"
                and right.text.strip() in (b"0", b"00")
            ):
                bugs.append({
                    "line": node.start_point.row + 1,
                    "category": "Division by Zero",
                    "severity": "High",
                    "message": "Division by constant zero detected.",
                    "suggestion": "Check the denominator before division.",
                    "source": "Tree-sitter Java"
                })

        for child in node.children:
            inspect(child)

    inspect(tree.root_node)
    return bugs


# ---------------- UNIFIED INTERFACE ----------------

def analyze_code(source_code, language):
    language = language.lower().strip()

    if language == "python":
        bugs = analyze_python(source_code)
    elif language == "java":
        bugs = analyze_java(source_code)
    else:
        return {
            "success": False,
            "error": "Unsupported language. Use Python or Java."
        }

    return {
        "success": True,
        "language": language,
        "total_bugs": len(bugs),
        "bugs": bugs
    }
