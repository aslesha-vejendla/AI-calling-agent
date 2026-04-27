from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload

from app.db.models import CandidateSession
from app.db.session import get_db
from app.models.schemas import SessionDetailResponse
from app.utils.session_mapper import to_session_detail

router = APIRouter()


@router.get("/{session_id}", response_model=SessionDetailResponse)
def get_session(session_id: str, db: Session = Depends(get_db)) -> SessionDetailResponse:
    session = (
        db.query(CandidateSession)
        .options(selectinload(CandidateSession.responses))
        .filter(CandidateSession.id == session_id)
        .first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Session not found.")
    return to_session_detail(session)
