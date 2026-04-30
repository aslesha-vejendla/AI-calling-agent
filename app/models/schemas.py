from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, Field


class HealthResponse(BaseModel):
    status: str
    app: str


class ResumeAnalysis(BaseModel):
    candidate_name: str = "Candidate"
    strengths: list[str] = Field(default_factory=list)
    skills: list[str] = Field(default_factory=list)
    experience_level: str = "mid"
    recommended_roles: list[str] = Field(default_factory=list)
    summary: str = ""


class InterviewQuestion(BaseModel):
    question: str
    skill: str
    objective: str


class ResumeUploadResponse(BaseModel):
    session_id: str
    candidate_name: str
    role_name: str
    profile: ResumeAnalysis
    questions: list[InterviewQuestion]


class SessionCreatePayload(BaseModel):
    role_name: str = Field(..., min_length=2)
    phone_number: str = Field(..., min_length=8)
    candidate_email: EmailStr | None = None


class CallCreatePayload(BaseModel):
    session_id: str


class CallCreateResponse(BaseModel):
    session_id: str
    call_sid: str
    status: str


class AnswerEvaluation(BaseModel):
    score: int = Field(ge=0, le=100)
    feedback: str
    prompt: str | None = None
    next_question: InterviewQuestion | None = None
    completed: bool = False


class ScriptVariable(BaseModel):
    key: str
    label: str
    required: bool = True
    default_value: str | None = None


class ScriptSections(BaseModel):
    intro: str
    qualification: str | None = None
    objections: str | None = None
    closing: str | None = None
    pause_message: str | None = "The interview is currently paused. Please wait while we resume."


class ScriptCreatePayload(BaseModel):
    name: str = Field(..., min_length=2)
    description: str | None = None
    status: str = "draft"
    language: str = "en"
    variables: list[ScriptVariable] = Field(default_factory=list)
    sections: ScriptSections


class ScriptUpdatePayload(BaseModel):
    name: str | None = Field(default=None, min_length=2)
    description: str | None = None
    status: str | None = None
    language: str | None = None
    variables: list[ScriptVariable] | None = None
    sections: ScriptSections | None = None


class ScriptRenderPayload(BaseModel):
    variables: dict[str, str] = Field(default_factory=dict)


class ScriptResponse(BaseModel):
    id: str
    name: str
    description: str | None = None
    status: str
    language: str
    variables: list[ScriptVariable]
    sections: dict[str, Any]
    created_at: datetime
    updated_at: datetime


class RenderedScriptResponse(BaseModel):
    script_id: str
    variables: dict[str, str]
    sections: dict[str, str]


class SessionControlPayload(BaseModel):
    action: str = Field(..., pattern="^(pause|resume|skip|end)$")


class SessionResponseItem(BaseModel):
    question_index: int
    question: str
    answer: str
    score: int
    feedback: str
    created_at: datetime


class SessionDetailResponse(BaseModel):
    id: str
    candidate_name: str
    candidate_email: EmailStr | None = None
    role_name: str
    phone_number: str
    company_name: str | None = None
    status: str
    script_id: str | None = None
    script_variables: dict[str, Any]
    current_question_index: int
    overall_score: int | None = None
    recommendation: str | None = None
    final_summary: str | None = None
    resume_summary: dict[str, Any]
    questions: list[dict[str, Any]]
    responses: list[SessionResponseItem]
    created_at: datetime
    updated_at: datetime
