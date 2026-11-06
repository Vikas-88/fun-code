"""Unit tests for analyzer, localizer, and comic generator."""

import unittest
import sys
import os

# Add parent path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.analyzer_service import perform_full_analysis
from app.services.localizer_service import compute_line_localization
from app.services.repair_service import perform_code_repair
from app.services.comic_service import synthesize_educational_comic


class TestCodeEvaluationPlatform(unittest.TestCase):

    def test_python_zero_division(self):
        code = "def divide(a, b):\n    return a / 0"
        res = perform_full_analysis(code, "python")
        self.assertTrue(res["success"])
        self.assertGreaterEqual(res["total_bugs"], 1)
        self.assertEqual(res["classification"]["prediction"], "BUGGY")

        loc = compute_line_localization(code, res["bugs"])
        self.assertIn(2, loc["suspicious_lines"])

    def test_python_off_by_one(self):
        code = "def traverse(items):\n    for i in range(len(items) + 1):\n        print(items[i])"
        res = perform_full_analysis(code, "python")
        self.assertTrue(res["success"])
        self.assertGreaterEqual(res["total_bugs"], 1)

    def test_clean_python_code(self):
        code = "def add(a, b):\n    return a + b"
        res = perform_full_analysis(code, "python")
        self.assertTrue(res["success"])
        self.assertEqual(res["total_bugs"], 0)
        self.assertEqual(res["classification"]["prediction"], "CLEAN")

    def test_code_repair(self):
        code = "def divide(a, b):\n    return a / 0"
        res = perform_full_analysis(code, "python")
        rep = perform_code_repair(code, "python", res["bugs"])
        self.assertTrue(rep["accepted"])
        self.assertIn("def divide", rep["generated_code"])

    def test_comic_generation_themes(self):
        for theme in ["matrix", "marvel", "starwars", "harrypotter", "interstellar"]:
            comic = synthesize_educational_comic("x = 10 / 0", "python", "Zero division error", None, theme)
            self.assertTrue(comic["success"])
            self.assertEqual(len(comic["panels"]), 4)
            self.assertIn("moral_of_the_story", comic)


if __name__ == "__main__":
    unittest.main()

