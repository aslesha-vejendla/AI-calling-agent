from __future__ import annotations

import fitz

from app.models.schemas import ResumeAnalysis
from app.services.llm_service import LLMService


def extract_text_from_pdf(file_bytes: bytes) -> str:
    document = fitz.open(stream=file_bytes, filetype="pdf")
    text = "\n".join(page.get_text() for page in document)
    return text.strip()


class ResumeService:
    def __init__(self) -> None:
        self.llm = LLMService()

    def analyze(self, resume_text: str, role_name: str) -> ResumeAnalysis:
        system_prompt = (
            "You analyze candidate resumes for recruiting workflows. "
            "Return concise JSON with keys: candidate_name, strengths, skills, "
            "experience_level, recommended_roles, summary."
        )
        user_prompt = (
            f"Target role: {role_name}\n"
            "Analyze this resume and infer strengths, skills, level, and fit.\n"
            f"Resume:\n{resume_text[:12000]}"
        )
        payload = self.llm.complete_json(system_prompt, user_prompt)
        return ResumeAnalysis.model_validate(payload)
