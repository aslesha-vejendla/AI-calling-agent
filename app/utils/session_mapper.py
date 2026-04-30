from __future__ import annotations

from app.db.models import CandidateSession
from app.models.schemas import SessionDetailResponse, SessionResponseItem


def to_session_detail(session: CandidateSession) -> SessionDetailResponse:
    return SessionDetailResponse(
        id=session.id,
        candidate_name=session.candidate_name,
        candidate_email=session.candidate_email,
        role_name=session.role_name,
        phone_number=session.phone_number,
        company_name=session.company_name,
        status=session.status.value,
        script_id=session.script_id,
        script_variables=session.script_variables,
        current_question_index=session.current_question_index,
        overall_score=session.overall_score,
        recommendation=session.recommendation,
        final_summary=session.final_summary,
        resume_summary=session.resume_summary,
        questions=session.questions,
        responses=[
            SessionResponseItem(
                question_index=item.question_index,
                question=item.question,
                answer=item.answer,
                score=item.score,
                feedback=item.feedback,
                created_at=item.created_at,
            )
            for item in session.responses
        ],
        created_at=session.created_at,
        updated_at=session.updated_at,
    )
