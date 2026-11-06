"""Comic Service: Merged Educational Comic Generation Engine integrating Model 2's dataset."""

import ast
import json
import os
import re
from typing import Dict, Any, List, Optional
from ..config import MOVIE_THEMES

# Path to Model 2's dataset
DATASET_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "model2", "dataset", "comic_movie_dataset.json"
)

# Load dataset once
MOVIE_DATASET = []
if os.path.exists(DATASET_PATH):
    try:
        with open(DATASET_PATH, "r", encoding="utf-8") as f:
            MOVIE_DATASET = json.load(f)
    except Exception as e:
        print(f"[ComicService] Warning loading dataset: {e}")

AVATARS = {
    # The Matrix
    "Neo": "🕶️",
    "Morpheus": "🧥",
    "Trinity": "🏍️",
    "Agent Smith": "🕴️",
    # Marvel
    "Iron Man": "🤖",
    "Tony Stark": "🤖",
    "Avengers": "🦸",
    "Spider-Man": "🕷️",
    "Doctor Strange": "🔮",
    # Baahubali
    "Baahubali": "⚔️",
    "Bhallaladeva": "👑",
    "The Kingdom's Army": "🛡️",
    "Kattappa": "🗡️",
    # Game of Thrones
    "King": "👑",
    "The King's Council": "📜",
    "Jon Snow": "🐺",
    "Daenerys": "🐉",
    # Star Wars
    "Luke Skywalker": "⚔️",
    "Master Yoda": "🧙‍♂️",
    "Darth Vader": "🦹",
    "R2-D2": "🤖",
    # Harry Potter
    "Harry Potter": "⚡",
    "Hermione Granger": "📚",
    "Professor Dumbledore": "🧙",
    "Default": "🧑‍💻"
}


def get_character_avatar(name: str) -> str:
    for key, val in AVATARS.items():
        if key.lower() in name.lower():
            return val
    return "🧑‍💻"


def extract_program_concepts(source_code: str, language: str = "python") -> List[str]:
    """Extracts programming concepts using AST (Python) and pattern matching (Java)."""
    concepts = set()
    lang = language.lower()

    if lang == "python":
        try:
            tree = ast.parse(source_code)
            for node in ast.walk(tree):
                if isinstance(node, (ast.Assign, ast.AnnAssign)):
                    concepts.add("variable")
                elif isinstance(node, (ast.For, ast.AsyncFor)):
                    concepts.update(["for loop", "loop"])
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
                elif isinstance(node, ast.BinOp) and isinstance(node.op, (ast.Div, ast.FloorDiv, ast.Mod)):
                    concepts.add("arithmetic")
        except Exception:
            concepts.add("syntax")
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

    return sorted(list(concepts))


def query_movie_knowledge(concepts: List[str], movie: str) -> List[Dict[str, Any]]:
    """Retrieves relevant scenes and metaphors from Model 2's dataset."""
    results = []
    movie_lower = movie.lower()

    for item in MOVIE_DATASET:
        if item.get("movie", "").lower() != movie_lower:
            continue
        keywords = {k.lower() for k in item.get("keywords", [])}
        keywords.add(item.get("concept", "").lower())

        matches = [c for c in concepts if c.lower() in keywords]
        if matches:
            res = dict(item)
            res["matched_concepts"] = matches
            results.append(res)

    return results


def synthesize_educational_comic(
    source_code: str,
    language: str,
    bug_description: str,
    repaired_code: Optional[str] = None,
    movie_theme_key: str = "baahubali",
    custom_hero: Optional[str] = None
) -> Dict[str, Any]:
    """Generates a complete 4-panel educational movie comic."""
    concepts = extract_program_concepts(source_code, language)
    movie_name = movie_theme_key.capitalize()

    # Normalize movie name
    if "baahu" in movie_theme_key.lower():
        movie_name = "Baahubali"
    elif "marvel" in movie_theme_key.lower():
        movie_name = "Marvel"
    elif "throne" in movie_theme_key.lower() or "got" in movie_theme_key.lower():
        movie_name = "Game of Thrones"
    elif "matrix" in movie_theme_key.lower():
        movie_name = "The Matrix"

    # Query knowledge dataset from Model 2
    matched_knowledge = query_movie_knowledge(concepts, movie_name)
    primary_item = matched_knowledge[0] if matched_knowledge else None

    # Fallbacks and theme details
    desc = bug_description or "Programming logic and boundary conditions require attention."
    code_lines = [l for l in source_code.splitlines() if l.strip()]
    code_snippet = code_lines[0] if code_lines else "def process():"
    repaired_lines = [l for l in (repaired_code or "").splitlines() if l.strip()]
    repaired_snippet = repaired_lines[0] if repaired_lines else "return verified_result"

    if movie_name == "Baahubali":
        hero = custom_hero or "Baahubali"
        character = primary_item["character"] if primary_item else "Baahubali"
        concept_title = primary_item["concept"] if primary_item else (concepts[0].title() if concepts else "Logic Flow")
        scenario = primary_item["scenario"] if primary_item else "The kingdom defends its borders through tactical discipline"
        mapping = primary_item["mapping"] if primary_item else "Discipline = Program execution; Wall = Boundary check"
        explanation = primary_item["explanation"] if primary_item else "Computers require precise instructions to avoid runtime collapses."

        title = f"Baahubali: Battle for Clean Code ({concept_title})"
        synopsis = (
            f"In the kingdom of Mahishmati, {hero} commands the defense forces. "
            f"A dangerous breakdown occurs due to: {desc}. "
            f"Using royal tactical wisdom ({mapping}), {character} restores victory to the realm."
        )

        panels = [
            {
                "panel_number": 1,
                "title": "Panel 1: The Kingdom's Peril",
                "stage": "The Challenge",
                "speaker": hero,
                "character_avatar": get_character_avatar(hero),
                "dialogue": f'"Halt! A fatal flaw threatens our army: {desc}! The battle formation is disrupted!"',
                "visual_scene": "Mahishmati fortress walls beneath dark thunderclouds. War drums echo as soldiers face an unexpected impasse.",
                "code_snippet": code_snippet,
                "action_note": "FATAL CRASH DETECTED // FORMATION HALTED"
            },
            {
                "panel_number": 2,
                "title": f"Panel 2: Understanding {concept_title}",
                "stage": "The Teaching",
                "speaker": character,
                "character_avatar": get_character_avatar(character),
                "dialogue": f'"{scenario}! Remember this truth: {mapping}!"',
                "visual_scene": f"{character} unrolls the ancient battle parchment, revealing the exact mathematical relationship.",
                "code_snippet": f"// Concept Mapping:\n// {mapping}",
                "action_note": f"EXPLAINING {concept_title.upper()}"
            },
            {
                "panel_number": 3,
                "title": "Panel 3: The Tactical Strike (The Fix)",
                "stage": "The Resolution",
                "speaker": hero,
                "character_avatar": get_character_avatar(hero),
                "dialogue": f'"Re-align the front ranks! Guard every flank, validate all inputs, and strike forward!"',
                "visual_scene": "Golden shields interlock with perfect precision. The corrected algorithm executes without resistance.",
                "code_snippet": repaired_snippet,
                "action_note": "APPLYING DEFENSIVE LOGIC REFACTOR"
            },
            {
                "panel_number": 4,
                "title": "Panel 4: Victory of Mahishmati",
                "stage": "Mastery",
                "speaker": "Kattappa",
                "character_avatar": get_character_avatar("Kattappa"),
                "dialogue": f'"Hail Baahubali! The army advances with zero defects! As long as our logic is sound, Mahishmati shall never fall!"',
                "visual_scene": "Sunlight breaks over the royal palace of Mahishmati. The kingdom celebrates 100% test pass rate.",
                "code_snippet": "// STATUS: VICTORY // TESTS: 100% PASSED",
                "action_note": "CODE BASE FULLY STABILIZED"
            }
        ]
        moral = f"Just as an army requires clear orders, programming requires clean boundaries: {explanation}"

    elif movie_name == "Marvel":
        hero = custom_hero or "Iron Man"
        concept_title = primary_item["concept"] if primary_item else "Algorithmic Precision"
        mapping = primary_item["mapping"] if primary_item else "Array = Team roster; Element = Superhero"
        explanation = primary_item["explanation"] if primary_item else "Defensive programming prevents catastrophic hardware overloads."

        title = f"Avengers Protocol: Debugging {concept_title}"
        synopsis = f"Tony Stark and the Avengers encounter a critical system error: {desc}. Jarvis and Tony implement a quantum software patch."
        panels = [
            {
                "panel_number": 1,
                "title": "Panel 1: Jarvis Diagnostic Alert",
                "stage": "The Challenge",
                "speaker": "Iron Man",
                "character_avatar": get_character_avatar("Iron Man"),
                "dialogue": f'"Jarvis, why did the nanotech forge freeze? Talk to me!" "Sir, we have encountered {desc}."',
                "visual_scene": "Arc reactor lab glows with amber emergency holograms. Suit schematics flicker with red alert flags.",
                "code_snippet": code_snippet,
                "action_note": "NANOTECH RECURSION FAILURE"
            },
            {
                "panel_number": 2,
                "title": f"Panel 2: Jarvis Decodes {concept_title}",
                "stage": "The Teaching",
                "speaker": "Jarvis",
                "character_avatar": "💻",
                "dialogue": f'"Sir, consider this analogy: {mapping}. Without index boundaries, the system attempts to reference a non-existent hero!"',
                "visual_scene": "Holographic array visualization projects glowing hero slots hovering in 3D space.",
                "code_snippet": f"// Jarvis Mapping: {mapping}",
                "action_note": "ISOLATING LOGIC DEFECT"
            },
            {
                "panel_number": 3,
                "title": "Panel 3: The Nanotech Hotfix",
                "stage": "The Resolution",
                "speaker": "Iron Man",
                "character_avatar": get_character_avatar("Iron Man"),
                "dialogue": f'"Re-routing logic pipelines, adding boundary validation, and compiling the patch now!"',
                "visual_scene": "Tony manipulates holographic code blocks with his hands, snapping the guarded logic into place.",
                "code_snippet": repaired_snippet,
                "action_note": "COMPILING REPAIRED ALGORITHM"
            },
            {
                "panel_number": 4,
                "title": "Panel 4: Avengers Assemble",
                "stage": "Mastery",
                "speaker": "Spider-Man",
                "character_avatar": get_character_avatar("Spider-Man"),
                "dialogue": f'"Mr. Stark, diagnostics are at 100%! All unit tests green! Defensive programming is totally awesome!"',
                "visual_scene": "The Mark 85 armor locks onto Stark with a radiant pulse. The terminal displays 0 defects found.",
                "code_snippet": "// BUILD: SUCCESS // ZERO ERRORS",
                "action_note": "AVENGERS PROTOCOL ONLINE"
            }
        ]
        moral = f"A genius billionaire engineer always verifies bounds before accessing data: {explanation}"

    else:
        # The Matrix or Generic
        hero = custom_hero or "Neo"
        title = f"The Matrix: Anomaly in the Construct ({desc[:35]})"
        synopsis = f"{hero} detects a critical flaw in the green phosphor stream: {desc}. Morpheus reveals the nature of the logic loop."
        panels = [
            {
                "panel_number": 1,
                "title": "Panel 1: Glitch in the Matrix",
                "stage": "The Challenge",
                "speaker": hero,
                "character_avatar": get_character_avatar("Neo"),
                "dialogue": f'"Morpheus! The stream just locked up. We hit an uncaught exception: {desc}!"',
                "visual_scene": "Neon green rain fractures across terminal monitors in the Nebuchadnezzar cockpit.",
                "code_snippet": code_snippet,
                "action_note": "CPU CORE HALTED // UNCAUGHT FAULT"
            },
            {
                "panel_number": 2,
                "title": "Panel 2: Morpheus's Diagnostic",
                "stage": "The Teaching",
                "speaker": "Morpheus",
                "character_avatar": get_character_avatar("Morpheus"),
                "dialogue": f'"Free your mind, {hero}. The computer only executes what you specify. Check your boundary invariants!"',
                "visual_scene": "Morpheus points directly to the glowing offending instruction frozen in the air.",
                "code_snippet": f"// Offending line:\n{code_snippet}",
                "action_note": "ANALYZING CALL STACK"
            },
            {
                "panel_number": 3,
                "title": "Panel 3: Rewriting Reality",
                "stage": "The Resolution",
                "speaker": hero,
                "character_avatar": get_character_avatar("Neo"),
                "dialogue": f'"I see the code now. Guarding the input, correcting the loop condition, and rebooting!"',
                "visual_scene": "Neo's hands blur across the mechanical keys. Golden code threads weave into the green streams.",
                "code_snippet": repaired_snippet,
                "action_note": "RE-COMPILING BYTECODE"
            },
            {
                "panel_number": 4,
                "title": "Panel 4: The Construct Stabilized",
                "stage": "Mastery",
                "speaker": "Trinity",
                "character_avatar": get_character_avatar("Trinity"),
                "dialogue": f'"The anomaly is dissolved! All subroutines at 100% throughput! Clean code wins again."',
                "visual_scene": "Digital rain cascades in smooth emerald ribbons. The Nebuchadnezzar systems hum with power.",
                "code_snippet": "// ALL UNIT TESTS PASSED",
                "action_note": "MATRIX 100% OPERATIONAL"
            }
        ]
        moral = "In software and in life: never assume inputs are valid. Always guard your edge conditions!"

    return {
        "success": True,
        "title": title,
        "movie_theme": movie_name.lower(),
        "movie_title": movie_name,
        "universe": movie_name + " Universe",
        "synopsis": synopsis,
        "detected_concepts": concepts,
        "characters": {
            "hero": hero,
            "theme": movie_name
        },
        "panels": panels,
        "moral_of_the_story": moral
    }
