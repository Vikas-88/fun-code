"""Configuration settings for Code Evaluation & Comic Generation Platform."""

import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
WORKSPACE_DIR = BASE_DIR.parent
MODELS_DIR = os.getenv("MODELS_DIR", str(BASE_DIR / "model1"))
CODEBERT_MODEL_PATH = os.getenv(
    "CODEBERT_MODEL_PATH",
    str(Path(MODELS_DIR) / "TRAINED_MODELS" / "MODEL_1_CODEBERT")
)
QWEN_MODEL_ID = os.getenv("QWEN_MODEL_ID", "Qwen/Qwen2.5-Coder-0.5B-Instruct")

# Server Config
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "*"
]

# Supported Languages
SUPPORTED_LANGUAGES = ["python", "java"]

# Movie Themes for Comic Generation
MOVIE_THEMES = {
    "matrix": {
        "title": "The Matrix",
        "universe": "Cyberpunk Simulation",
        "default_hero": "Neo",
        "mentor": "Morpheus",
        "villain": "Agent Smith",
        "assistant": "Trinity",
        "setting": "The Construct / Matrix Megacity Mainframe",
        "theme_color": "#00FF66"
    },
    "marvel": {
        "title": "Marvel Avengers",
        "universe": "Superhero Tech & Magic",
        "default_hero": "Iron Man (Tony Stark)",
        "mentor": "Doctor Strange",
        "villain": "Thanos",
        "assistant": "Spider-Man (Peter Parker)",
        "setting": "Avengers Tower Quantum Server Lab",
        "theme_color": "#E62429"
    },
    "starwars": {
        "title": "Star Wars",
        "universe": "Galactic Sci-Fi",
        "default_hero": "Luke Skywalker",
        "mentor": "Master Yoda",
        "villain": "Darth Vader",
        "assistant": "R2-D2",
        "setting": "Death Star Reactor Subsystem Core",
        "theme_color": "#FFE81F"
    },
    "harrypotter": {
        "title": "Harry Potter",
        "universe": "Wizarding Magic & Spells",
        "default_hero": "Harry Potter",
        "mentor": "Professor Dumbledore",
        "villain": "Lord Voldemort",
        "assistant": "Hermione Granger",
        "setting": "Hogwarts Chamber of Arcane Runes",
        "theme_color": "#946B2D"
    },
    "interstellar": {
        "title": "Interstellar",
        "universe": "Space & Gravitational Physics",
        "default_hero": "Cooper",
        "mentor": "Professor Brand",
        "villain": "Entropy & Gravitational Singularity",
        "assistant": "TARS",
        "setting": "Endurance Navigation Computer near Gargantua",
        "theme_color": "#00A8FF"
    }
}

