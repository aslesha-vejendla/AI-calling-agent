from __future__ import annotations

import re
from typing import Any

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.db.models import CandidateSession, ScriptStatus, ScriptTemplate
from app.models.schemas import ScriptCreatePayload, ScriptUpdatePayload


class ScriptService:
    placeholder_pattern = re.compile(r"{{\s*([a-zA-Z0-9_]+)\s*}}")

    def list_scripts(self, db: Session) -> list[ScriptTemplate]:
        return db.query(ScriptTemplate).order_by(ScriptTemplate.updated_at.desc()).all()

    def get_script(self, db: Session, script_id: str) -> ScriptTemplate:
        script = db.query(ScriptTemplate).filter(ScriptTemplate.id == script_id).first()
        if not script:
            raise HTTPException(status_code=404, detail="Script not found.")
        return script

    def create_script(self, db: Session, payload: ScriptCreatePayload) -> ScriptTemplate:
        script = ScriptTemplate(
            name=payload.name,
            description=payload.description,
            status=ScriptStatus(payload.status),
            language=payload.language,
            variables=[item.model_dump() for item in payload.variables],
            sections=payload.sections.model_dump(),
        )
        db.add(script)
        db.commit()
        db.refresh(script)
        return script

    def update_script(self, db: Session, script_id: str, payload: ScriptUpdatePayload) -> ScriptTemplate:
        script = self.get_script(db, script_id)
        if payload.name is not None:
            script.name = payload.name
        if payload.description is not None:
            script.description = payload.description
        if payload.status is not None:
            script.status = ScriptStatus(payload.status)
        if payload.language is not None:
            script.language = payload.language
        if payload.variables is not None:
            script.variables = [item.model_dump() for item in payload.variables]
        if payload.sections is not None:
            script.sections = payload.sections.model_dump()

        db.add(script)
        db.commit()
        db.refresh(script)
        return script

    def render_sections(self, script: ScriptTemplate, variables: dict[str, str]) -> dict[str, str]:
        rendered: dict[str, str] = {}
        for key, value in script.sections.items():
            if value is None:
                continue
            rendered[key] = self._render_text(str(value), variables)
        return rendered

    def build_intro(self, session: CandidateSession, first_question: str) -> str:
        variables = self._default_variables(session)
        if session.script:
            rendered = self.render_sections(session.script, variables)
            intro = rendered.get("intro")
            if intro:
                return f"{intro} First question. {first_question}"
        return (
            f"Hello {session.candidate_name}. This is your AI interview for the {session.role_name} role. "
            f"Let us begin. First question. {first_question}"
        )

    def build_pause_message(self, session: CandidateSession) -> str:
        variables = self._default_variables(session)
        if session.script:
            rendered = self.render_sections(session.script, variables)
            pause_message = rendered.get("pause_message")
            if pause_message:
                return pause_message
        return "The interview is currently paused. Please wait while we resume."

    def build_follow_up(self, session: CandidateSession, feedback: str, next_question: str) -> str:
        variables = self._default_variables(session)
        if session.script:
            rendered = self.render_sections(session.script, variables)
            qualification = rendered.get("qualification")
            if qualification:
                return f"{qualification} {feedback} Next question. {next_question}"
        return f"Recorded. {feedback} Next question. {next_question}"

    def _default_variables(self, session: CandidateSession) -> dict[str, str]:
        base = {
            "candidate_name": session.candidate_name,
            "job_title": session.role_name,
            "company_name": session.company_name or "your company",
        }
        extra = {key: str(value) for key, value in (session.script_variables or {}).items()}
        base.update(extra)
        return base

    def _render_text(self, text: str, variables: dict[str, Any]) -> str:
        def replace(match: re.Match[str]) -> str:
            key = match.group(1)
            return str(variables.get(key, f"{{{{{key}}}}}"))

        return self.placeholder_pattern.sub(replace, text)
