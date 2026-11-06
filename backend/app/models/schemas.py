"""Pydantic schemas and dataclasses for API requests and responses."""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Code Analysis Schemas ---

class BugLocation(BaseModel):
    line: int
    column: Optional[int] = 1
    category: str
    severity: str = "Medium"  # High, Medium, Low
    message: str
    suggestion: str
    source: str = "Static Analysis"  # "Python AST", "Tree-sitter Java", "CodeBERT Attention", etc.
    confidence: float = 0.95

class LineHeatmap(BaseModel):
    line: int
    suspiciousness: float = Field(ge=0.0, le=1.0)
    has_bug: bool = False
    message: Optional[str] = None

class BugClassification(BaseModel):
    prediction: str  # "BUGGY" or "CLEAN"
    confidence: float
    model_name: str = "CodeBERT"

class StaticAnalysisSummary(BaseModel):
    success: bool
    language: str
    total_bugs: int
    bugs: List[BugLocation]

class AnalyzeRequest(BaseModel):
    source_code: str
    language: str = "python"
    bug_description: Optional[str] = None
    test_code: Optional[str] = None

class RepairResult(BaseModel):
    generated_code: str
    diff: Optional[str] = None
    validation: Dict[str, Any]
    functional_tests: Optional[Dict[str, Any]] = None
    accepted: bool
    model_name: str = "Qwen2.5-Coder / AI Engine"

class AnalyzeResponse(BaseModel):
    success: bool
    language: str
    bug_classification: BugClassification
    static_analysis: StaticAnalysisSummary
    suspicious_lines: List[int]
    line_heatmap: List[LineHeatmap]
    repair: Optional[RepairResult] = None
    explanation: Optional[str] = None

# --- Code Repair Schemas ---

class RepairRequest(BaseModel):
    source_code: str
    language: str = "python"
    bug_description: Optional[str] = None
    test_code: Optional[str] = None

class RepairResponse(BaseModel):
    success: bool
    language: str
    repaired_code: str
    explanation: str
    diff: str
    validation: Dict[str, Any]
    accepted: bool

# --- Comic Generation Schemas ---

class ComicPanel(BaseModel):
    panel_number: int
    title: str
    stage: str  # "Inciting Incident", "Investigation", "Breakthrough", "Resolution"
    speaker: str
    character_avatar: str  # emoji or avatar key
    dialogue: str
    visual_scene: str
    code_snippet: Optional[str] = None
    action_note: str

class ComicRequest(BaseModel):
    source_code: str
    language: str = "python"
    bug_description: Optional[str] = None
    repaired_code: Optional[str] = None
    movie_theme: str = "matrix"  # "matrix", "marvel", "starwars", "harrypotter", "interstellar"
    custom_hero: Optional[str] = None

class ComicResponse(BaseModel):
    success: bool
    title: str
    movie_theme: str
    movie_title: str
    universe: str
    synopsis: str
    characters: Dict[str, str]
    panels: List[ComicPanel]
    moral_of_the_story: str

# --- Export Schemas ---

class ExportPdfRequest(BaseModel):
    source_code: str
    language: str
    analysis: Dict[str, Any]
    repair: Optional[Dict[str, Any]] = None
    comic: Optional[Dict[str, Any]] = None

