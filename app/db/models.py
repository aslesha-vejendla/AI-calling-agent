from __future__ import annotations

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class SessionStatus(str, enum.Enum):
    created = "created"
    in_progress = "in_progress"
    paused = "paused"
    completed = "completed"


class ScriptStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    archived = "archived"


class CandidateSession(Base):
    __tablename__ = "candidate_sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    candidate_name: Mapped[str] = mapped_column(String(255))
    candidate_email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role_name: Mapped[str] = mapped_column(String(255))
    phone_number: Mapped[str] = mapped_column(String(40))
    company_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    resume_text: Mapped[str] = mapped_column(Text)
    resume_summary: Mapped[dict] = mapped_column(JSON, default=dict)
    questions: Mapped[list] = mapped_column(JSON, default=list)
    script_id: Mapped[str | None] = mapped_column(ForeignKey("script_templates.id", ondelete="SET NULL"), nullable=True)
    script_variables: Mapped[dict] = mapped_column(JSON, default=dict)
    status: Mapped[SessionStatus] = mapped_column(Enum(SessionStatus), default=SessionStatus.created)
    current_question_index: Mapped[int] = mapped_column(Integer, default=0)
    overall_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    recommendation: Mapped[str | None] = mapped_column(String(40), nullable=True)
    final_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    call_sid: Mapped[str | None] = mapped_column(String(64), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    script: Mapped["ScriptTemplate | None"] = relationship(back_populates="sessions")
    responses: Mapped[list["CandidateResponse"]] = relationship(
        back_populates="session",
        cascade="all, delete-orphan",
        order_by="CandidateResponse.question_index",
    )


class CandidateResponse(Base):
    __tablename__ = "candidate_responses"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id: Mapped[str] = mapped_column(ForeignKey("candidate_sessions.id", ondelete="CASCADE"))
    question_index: Mapped[int] = mapped_column(Integer)
    question: Mapped[str] = mapped_column(Text)
    answer: Mapped[str] = mapped_column(Text)
    score: Mapped[int] = mapped_column(Integer)
    feedback: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    session: Mapped[CandidateSession] = relationship(back_populates="responses")


class ScriptTemplate(Base):
    __tablename__ = "script_templates"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), unique=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[ScriptStatus] = mapped_column(Enum(ScriptStatus), default=ScriptStatus.draft)
    language: Mapped[str] = mapped_column(String(32), default="en")
    sections: Mapped[dict] = mapped_column(JSON, default=dict)
    variables: Mapped[list] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    sessions: Mapped[list[CandidateSession]] = relationship(back_populates="script")
