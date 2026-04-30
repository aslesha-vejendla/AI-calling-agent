from __future__ import annotations

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.db.models import CandidateSession, SessionStatus
from app.db.session import get_db
from app.models.schemas import ResumeUploadResponse
from app.services.interview_service import InterviewService
from app.services.resume_service import ResumeService, extract_text_from_pdf

router = APIRouter()


@router.post("/upload", response_model=ResumeUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    role_name: str = Form(...),
    phone_number: str = Form(...),
    candidate_email: str | None = Form(None),
    company_name: str | None = Form(None),
    script_id: str | None = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> ResumeUploadResponse:
    if file.content_type not in {"application/pdf", "application/octet-stream"}:
        raise HTTPException(status_code=400, detail="Only PDF resumes are supported.")

    file_bytes = await file.read()
    resume_text = extract_text_from_pdf(file_bytes)
    if not resume_text:
        raise HTTPException(status_code=400, detail="Could not extract text from resume.")

    resume_service = ResumeService()
    interview_service = InterviewService()
    profile = resume_service.analyze(resume_text, role_name)
    questions = interview_service.generate_questions(role_name, profile)

    session = CandidateSession(
        candidate_name=profile.candidate_name,
        candidate_email=candidate_email,
        role_name=role_name,
        phone_number=phone_number,
        company_name=company_name,
        resume_text=resume_text,
        resume_summary=profile.model_dump(),
        questions=[item.model_dump() for item in questions],
        script_id=script_id,
        script_variables={
            "candidate_name": profile.candidate_name,
            "job_title": role_name,
            "company_name": company_name or "your company",
        },
        status=SessionStatus.created,
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    return ResumeUploadResponse(
        session_id=session.id,
        candidate_name=session.candidate_name,
        role_name=role_name,
        profile=profile,
        questions=questions,
    )
