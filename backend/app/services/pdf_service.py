"""PDF and HTML Report Generator for Code Evaluation and Educational Comics."""

import html
from typing import Dict, Any, Optional

def generate_html_report(
    source_code: str,
    language: str,
    analysis: Dict[str, Any],
    repair: Optional[Dict[str, Any]] = None,
    comic: Optional[Dict[str, Any]] = None
) -> str:
    """Generates a self-contained, beautifully styled printable HTML report."""
    classification = analysis.get("classification", {})
    bugs = analysis.get("bugs", [])
    pred = classification.get("prediction", "UNKNOWN")
    conf = classification.get("confidence", 0.0)
    model_name = classification.get("model_name", "CodeBERT + Static Ensemble")

    theme_color = "#00FF66" if pred == "CLEAN" else "#FF3366"

    # Format Bugs Table
    bugs_rows = ""
    if bugs:
        for b in bugs:
            bugs_rows += f"""
            <tr>
                <td style="padding: 10px; border: 1px solid #333; font-weight: bold; color: #FF6688;">Line {b.get('line', '?')}</td>
                <td style="padding: 10px; border: 1px solid #333;">{html.escape(str(b.get('category', '')))}</td>
                <td style="padding: 10px; border: 1px solid #333; color: {'#FF3366' if b.get('severity') == 'High' else '#FFAA00'};">{html.escape(str(b.get('severity', 'Medium')))}</td>
                <td style="padding: 10px; border: 1px solid #333;">{html.escape(str(b.get('message', '')))}</td>
                <td style="padding: 10px; border: 1px solid #333; color: #00FF66;">{html.escape(str(b.get('suggestion', '')))}</td>
            </tr>
            """
    else:
        bugs_rows = """
        <tr>
            <td colspan="5" style="padding: 15px; text-align: center; color: #00FF66;">
                ✓ No defects detected. Program conforms to static and neural specifications.
            </td>
        </tr>
        """

    # Format Comic Panels if present
    comic_html = ""
    if comic and comic.get("panels"):
        panels = comic.get("panels", [])
        comic_cards = ""
        for p in panels:
            comic_cards += f"""
            <div style="background: #0d1611; border: 2px solid #00FF66; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #00FF66; padding-bottom: 8px; margin-bottom: 10px;">
                    <span style="font-weight: bold; color: #00FF66; font-size: 14px;">{html.escape(p.get('title', ''))}</span>
                    <span style="background: #00FF66; color: #000; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">{p.get('stage', '')}</span>
                </div>
                <div style="font-size: 28px; margin-bottom: 8px;">{p.get('character_avatar', '🧑‍💻')} <strong style="font-size: 16px; color: #fff;">{html.escape(p.get('speaker', ''))}</strong></div>
                <div style="font-style: italic; color: #e2fee6; margin-bottom: 10px; font-size: 14px; line-height: 1.4;">{html.escape(p.get('dialogue', ''))}</div>
                <div style="background: #000; border-left: 3px solid #00FF66; padding: 8px 12px; font-size: 12px; color: #88ffaa; margin-bottom: 6px;">
                    🎬 <em>Scene: {html.escape(p.get('visual_scene', ''))}</em>
                </div>
                <div style="color: #66cc88; font-size: 11px; font-family: monospace;">⚡ {html.escape(p.get('action_note', ''))}</div>
            </div>
            """
        comic_html = f"""
        <div style="margin-top: 30px;">
            <h2 style="color: #00FF66; border-bottom: 2px solid #00FF66; padding-bottom: 8px;">
                🎨 Educational Comic Narrative: {html.escape(comic.get('title', ''))}
            </h2>
            <p style="color: #a8f8b8; font-size: 13px;"><strong>Theme:</strong> {html.escape(comic.get('movie_title', ''))} ({html.escape(comic.get('universe', ''))})</p>
            <p style="color: #ccc; font-size: 13px; margin-bottom: 20px;"><em>{html.escape(comic.get('synopsis', ''))}</em></p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                {comic_cards}
            </div>
            <div style="background: #032009; border: 1px dashed #00FF66; padding: 12px; margin-top: 15px; border-radius: 6px; color: #00FF66; font-size: 13px;">
                💡 <strong>Moral of the Story:</strong> {html.escape(comic.get('moral_of_the_story', ''))}
            </div>
        </div>
        """

    # Repaired Code Section
    repair_html = ""
    if repair and repair.get("generated_code"):
        repair_html = f"""
        <div style="margin-top: 30px;">
            <h2 style="color: #00FF66; border-bottom: 2px solid #00FF66; padding-bottom: 8px;">
                🛠️ AI Automated Code Repair & Validation
            </h2>
            <p style="color: #ccc; font-size: 13px;"><strong>Engine:</strong> {html.escape(repair.get('model_name', ''))} | <strong>Accepted:</strong> {'✓ YES' if repair.get('accepted') else '✗ NO'}</p>
            <div style="background: #000; border: 1px solid #333; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 12px; overflow-x: auto; color: #88ffaa; margin-top: 10px;">
                <pre style="margin: 0;">{html.escape(repair.get('generated_code', ''))}</pre>
            </div>
        </div>
        """

    report = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Code Evaluation & Comic Diagnostic Report</title>
    <style>
        body {{
            background-color: #050a06;
            color: #e2fee6;
            font-family: 'Courier New', Courier, monospace, sans-serif;
            padding: 30px;
            margin: 0;
        }}
        @media print {{
            body {{
                background-color: #fff;
                color: #000;
            }}
            .no-print {{ display: none; }}
        }}
        .badge {{
            display: inline-block;
            padding: 6px 14px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-top: 10px;
        }}
        th {{
            background-color: #0d2212;
            color: #00FF66;
            padding: 10px;
            text-align: left;
            border: 1px solid #333;
        }}
        button.print-btn {{
            background: #00FF66;
            color: #000;
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            margin-bottom: 20px;
        }}
    </style>
</head>
<body>
    <div class="no-print">
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>

    <div style="border-bottom: 2px solid #00FF66; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: #00FF66; margin: 0; font-size: 26px;">FUN CODE // INTELLIGENT CODE EVALUATION PLATFORM</h1>
        <p style="color: #88ffaa; margin: 5px 0 0 0; font-size: 13px;">Automated Bug Localization, AI Code Repair & Educational Comic Report</p>
    </div>

    <div style="display: flex; gap: 20px; margin-bottom: 25px;">
        <div style="background: #0a140d; border: 1px solid #00FF66; border-radius: 6px; padding: 15px; flex: 1;">
            <div style="font-size: 11px; color: #888; text-transform: uppercase;">Bug Classifier Model</div>
            <div style="font-size: 18px; font-weight: bold; color: #fff; margin-top: 4px;">{html.escape(model_name)}</div>
            <div style="margin-top: 10px;">
                <span class="badge" style="background: {'#FF3366' if pred == 'BUGGY' else '#00FF66'}; color: {'#fff' if pred == 'BUGGY' else '#000'};">
                    {pred}
                </span>
                <span style="font-size: 12px; color: #aaa; margin-left: 10px;">Confidence: {conf*100:.1f}%</span>
            </div>
        </div>

        <div style="background: #0a140d; border: 1px solid #00FF66; border-radius: 6px; padding: 15px; flex: 1;">
            <div style="font-size: 11px; color: #888; text-transform: uppercase;">Target Source Code</div>
            <div style="font-size: 18px; font-weight: bold; color: #00FF66; margin-top: 4px;">{language.upper()}</div>
            <div style="font-size: 12px; color: #aaa; margin-top: 10px;">Total Defects Isolated: <strong>{len(bugs)}</strong></div>
        </div>
    </div>

    <div>
        <h2 style="color: #00FF66; border-bottom: 2px solid #00FF66; padding-bottom: 8px;">
            🔍 Bug Localization & Static Diagnostics
        </h2>
        <table>
            <thead>
                <tr>
                    <th style="width: 10%;">Location</th>
                    <th style="width: 20%;">Category</th>
                    <th style="width: 12%;">Severity</th>
                    <th style="width: 33%;">Root Cause</th>
                    <th style="width: 25%;">Recommended Fix</th>
                </tr>
            </thead>
            <tbody>
                {bugs_rows}
            </tbody>
        </table>
    </div>

    <div style="margin-top: 25px;">
        <h2 style="color: #00FF66; border-bottom: 2px solid #00FF66; padding-bottom: 8px;">
            📜 Analyzed Source Code
        </h2>
        <div style="background: #000; border: 1px solid #333; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 12px; overflow-x: auto; color: #88ffaa;">
            <pre style="margin: 0;">{html.escape(source_code)}</pre>
        </div>
    </div>

    {repair_html}

    {comic_html}

    <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 15px; font-size: 11px; color: #666; text-align: center;">
        Generated by Intelligent Code Evaluation & Automated Bug Localization Platform &copy; Hackathon Edition
    </div>
</body>
</html>"""
    return report

