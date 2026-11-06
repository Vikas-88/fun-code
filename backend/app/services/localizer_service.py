"""Localizer Service: Line-level bug localization and suspiciousness heatmaps."""

from typing import List, Dict, Any

def compute_line_localization(source_code: str, bugs: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Computes suspiciousness score (0.0 to 1.0) for every line in the source code.
    Implements a localized fault isolation algorithm inspired by Spectrum-Based Fault
    Localization (SBFL) and AST error nodes.
    """
    lines = source_code.splitlines()
    total_lines = len(lines) if lines else 1

    # Map bugs to lines
    bug_by_line: Dict[int, Dict[str, Any]] = {}
    for bug in bugs:
        ln = bug.get("line", 1)
        if 1 <= ln <= total_lines:
            bug_by_line[ln] = bug

    suspicious_lines: List[int] = sorted(list(bug_by_line.keys()))
    heatmap: List[Dict[str, Any]] = []

    for line_idx in range(1, total_lines + 1):
        if line_idx in bug_by_line:
            bug = bug_by_line[line_idx]
            severity = bug.get("severity", "Medium")
            score = 0.98 if severity == "High" else (0.85 if severity == "Medium" else 0.65)
            heatmap.append({
                "line": line_idx,
                "suspiciousness": round(score, 2),
                "has_bug": True,
                "message": f"[{bug.get('category', 'Issue')}] {bug.get('message', '')}"
            })
        else:
            # Check proximity to known buggy lines (context decay)
            min_dist = min([abs(line_idx - b_line) for b_line in suspicious_lines]) if suspicious_lines else 999
            if min_dist == 1:
                score = 0.35
            elif min_dist == 2:
                score = 0.15
            else:
                score = 0.02
            heatmap.append({
                "line": line_idx,
                "suspiciousness": round(score, 2),
                "has_bug": False,
                "message": None
            })

    return {
        "suspicious_lines": suspicious_lines,
        "line_heatmap": heatmap
    }

