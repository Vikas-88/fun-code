
import ast
import re
import json
import os
import time
import base64
import requests

from io import BytesIO
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer,
    Image as PDFImage, PageBreak, Table, TableStyle
)
from xml.sax.saxutils import escape


def extract_program_concepts(source_code, language="python"):
    concepts = set()

    if language.lower() == "python":
        try:
            tree = ast.parse(source_code)
        except SyntaxError as e:
            return {"error": f"Syntax error at line {e.lineno}"}

        for node in ast.walk(tree):
            if isinstance(node, (ast.Assign, ast.AnnAssign)):
                concepts.add("variable")
            elif isinstance(node, (ast.For, ast.AsyncFor)):
                concepts.add("for loop")
            elif isinstance(node, ast.While):
                concepts.add("loop")
            elif isinstance(node, ast.If):
                concepts.update(["if", "condition"])
            elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                concepts.add("function")
            elif isinstance(node, ast.ClassDef):
                concepts.add("class")
                if node.bases:
                    concepts.add("inheritance")
            elif isinstance(node, (ast.List, ast.Tuple)):
                concepts.add("array")
            elif isinstance(node, ast.Dict):
                concepts.add("data")
            elif isinstance(node, ast.BoolOp):
                concepts.update(["boolean", "logic"])
            elif isinstance(node, ast.Try):
                concepts.update(["exception", "error"])

    else:
        patterns = {
            "variable": r"\b(int|float|double|char|String|boolean|var)\s+\w+",
            "for loop": r"\bfor\s*\(",
            "loop": r"\b(while|do)\b",
            "if": r"\bif\s*\(",
            "condition": r"\b(if|else|switch)\b",
            "function": r"\b(public|private|protected|static)\s+\w+\s+\w+\s*\(",
            "class": r"\bclass\s+\w+",
            "inheritance": r"\bextends\s+\w+",
            "array": r"\[\s*\]",
            "boolean": r"\b(boolean|true|false)\b",
            "exception": r"\b(try|catch|finally|throw)\b"
        }

        for concept, pattern in patterns.items():
            if re.search(pattern, source_code):
                concepts.add(concept)

    return {"concepts": sorted(concepts)}


def retrieve_movie_knowledge(concepts, selected_movie, dataset):
    results = []

    for record in dataset:
        if record["movie"].lower() != selected_movie.lower():
            continue

        keywords = {
            x.lower() for x in record["keywords"]
        }
        keywords.add(record["concept"].lower())

        matches = [
            concept for concept in concepts
            if concept.lower() in keywords
        ]

        if matches:
            item = dict(record)
            item["matched_concepts"] = matches
            results.append(item)

    return results


def generate_comic_story(source_code, language, movie, concepts, knowledge):
    if not knowledge:
        return {
            "success": False,
            "message": "No matching movie knowledge found."
        }

    scenes = []

    for index, item in enumerate(knowledge, 1):
        scenes.append({
            "scene_number": index,
            "movie": movie,
            "character": item["character"],
            "programming_concept": item["concept"],
            "scene_title": "Understanding " + item["concept"],
            "visual_description": item["scenario"],
            "dialogue": [
                item["character"] + ": " + item["scenario"],
                "Narrator: " + item["mapping"]
            ],
            "concept_mapping": item["mapping"],
            "educational_explanation": item["explanation"]
        })

    return {
        "success": True,
        "movie": movie,
        "language": language,
        "source_code": source_code,
        "detected_concepts": concepts,
        "total_scenes": len(scenes),
        "scenes": scenes
    }


def expand_into_comic_panels(story):
    panels = []

    for scene in story["scenes"]:
        concept = scene["programming_concept"].lower()

        if concept == "for loop":
            descriptions = [
                ("The Mission", "The army receives a repeated training order."),
                ("First Iteration", "The soldiers perform the first round."),
                ("Repeated Execution", "The soldiers perform the next rounds."),
                ("Mission Complete", "The soldiers finish all iterations.")
            ]
        else:
            descriptions = [
                (scene["scene_title"], scene["visual_description"]),
                ("Understanding the Concept", scene["concept_mapping"]),
                ("How It Works", scene["educational_explanation"]),
                ("Concept Complete", "The programming concept is demonstrated.")
            ]

        for title, description in descriptions:
            panels.append({
                "panel_number": len(panels) + 1,
                "scene_title": title,
                "character": scene["character"],
                "visual_description": description,
                "dialogue": scene["dialogue"][0],
                "programming_concept": scene["programming_concept"],
                "educational_explanation": scene["educational_explanation"]
            })

    return panels


def generate_comic_images(
    panels,
    image_dir,
    api_key="0000000000",
    models=None
):
    os.makedirs(image_dir, exist_ok=True)

    api_url = "https://aihorde.net/api/v2"

    headers = {
        "apikey": api_key,
        "Client-Agent": "FunCode-ComicGenerator:1.0"
    }

    if models is None:
        models = ["Deliberate"]

    saved_images = []

    for panel in panels:
        prompt = (
            "Epic Indian fantasy graphic novel illustration. "
            + panel["visual_description"]
            + ". Detailed hand-drawn comic artwork, "
            "consistent visual style, no text, no watermark."
        )

        response = requests.post(
            f"{api_url}/generate/async",
            headers=headers,
            json={
                "prompt": prompt,
                "params": {
                    "width": 512,
                    "height": 512,
                    "steps": 20,
                    "n": 1,
                    "sampler_name": "k_euler"
                },
                "nsfw": False,
                "censor_nsfw": True,
                "models": models
            },
            timeout=30
        )

        response.raise_for_status()
        request_id = response.json()["id"]

        for attempt in range(60):
            check = requests.get(
                f"{api_url}/generate/check/{request_id}",
                headers=headers,
                timeout=30
            )
            check.raise_for_status()
            status = check.json()

            if status.get("faulted"):
                raise RuntimeError(
                    f"Image generation failed for panel {panel['panel_number']}"
                )

            if status.get("done"):
                result = requests.get(
                    f"{api_url}/generate/status/{request_id}",
                    headers=headers,
                    timeout=30
                )
                result.raise_for_status()

                generations = result.json().get("generations", [])
                if not generations:
                    raise RuntimeError("No image returned.")

                image_data = generations[0]["img"]

                if image_data.startswith(("http://", "https://")):
                    image_bytes = requests.get(
                        image_data, timeout=60
                    ).content
                else:
                    encoded = image_data.split(",", 1)[-1] if image_data.startswith("data:image") else image_data
                    encoded += "=" * (-len(encoded) % 4)
                    image_bytes = base64.b64decode(encoded)

                image = Image.open(
                    BytesIO(image_bytes)
                ).convert("RGB")

                path = os.path.join(
                    image_dir,
                    f"panel_{panel['panel_number']}.png"
                )
                image.save(path)
                saved_images.append(path)
                break

            time.sleep(10)
        else:
            raise TimeoutError(
                f"Panel {panel['panel_number']} is still queued."
            )

    return saved_images


def create_comic_pdf(panels, image_paths, output_path, movie):
    styles = getSampleStyleSheet()

    title = ParagraphStyle(
        "ComicTitle",
        parent=styles["Title"],
        alignment=TA_CENTER,
        fontSize=24
    )

    story = [
        Spacer(1, 30*mm),
        Paragraph(escape(movie) + " Educational Comic", title),
        Spacer(1, 10*mm),
        Paragraph("Learn programming through illustrated storytelling.",
                  styles["Normal"]),
        PageBreak()
    ]

    for panel, image_path in zip(panels, image_paths):
        story.append(
            Paragraph(
                escape(panel["scene_title"]),
                styles["Heading2"]
            )
        )

        story.append(
            PDFImage(image_path, width=155*mm, height=155*mm,
                     kind="proportional")
        )

        story.append(
            Paragraph(
                "<b>Dialogue:</b> " + escape(panel["dialogue"]),
                styles["BodyText"]
            )
        )

        story.append(Spacer(1, 4*mm))

        story.append(
            Paragraph(
                "<b>Explanation:</b> " +
                escape(panel["educational_explanation"]),
                styles["BodyText"]
            )
        )

        story.append(PageBreak())

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    document = SimpleDocTemplate(
        output_path,
        pagesize=A4
    )

    document.build(story)

    return output_path
