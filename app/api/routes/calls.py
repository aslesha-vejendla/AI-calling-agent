from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import Response
from sqlalchemy.orm import Session, selectinload
from twilio.twiml.voice_response import Gather, VoiceResponse

from app.db.models import CandidateSession, SessionStatus
from app.db.session import get_db
from app.models.schemas import CallCreatePayload, CallCreateResponse, InterviewQuestion
from app.services.elevenlabs_service import ElevenLabsService
from app.services.interview_service import InterviewService
from app.services.twilio_service import TwilioService

router = APIRouter()


def _get_session_or_404(db: Session, session_id: str) -> CandidateSession:
    session = (
        db.query(CandidateSession)
        .options(selectinload(CandidateSession.responses))
        .filter(CandidateSession.id == session_id)
        .first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Session not found.")
    return session


def _build_prompt_audio(text: str) -> str:
    return ElevenLabsService().synthesize(text)


def _gather_with_audio(action_url: str, prompt_text: str) -> Response:
    audio_url = _build_prompt_audio(prompt_text)
    response = VoiceResponse()
    gather = Gather(
        input="speech",
        action=action_url,
        method="POST",
        speech_timeout="auto",
        speech_model="phone_call",
        enhanced="true",
    )
    gather.play(audio_url)
    response.append(gather)
    response.redirect(action_url, method="POST")
    return Response(content=str(response), media_type="application/xml")


@router.post("", response_model=CallCreateResponse, status_code=status.HTTP_201_CREATED)
def create_call(payload: CallCreatePayload, db: Session = Depends(get_db)) -> CallCreateResponse:
    session = _get_session_or_404(db, payload.session_id)
    if not session.questions:
        raise HTTPException(status_code=400, detail="Session has no interview questions.")

    twilio_service = TwilioService()
    call_sid = twilio_service.create_outbound_call(session.phone_number, session.id)
    session.call_sid = call_sid
    session.status = SessionStatus.in_progress
    db.add(session)
    db.commit()

    return CallCreateResponse(session_id=session.id, call_sid=call_sid, status=session.status.value)


@router.post("/twilio/voice/{session_id}")
def start_voice_call(session_id: str, db: Session = Depends(get_db)) -> Response:
    session = _get_session_or_404(db, session_id)
    questions = [InterviewQuestion.model_validate(item) for item in session.questions]
    first_question = questions[session.current_question_index]
    intro = (
        f"Hello {session.candidate_name}. This is your AI interview for the {session.role_name} role. "
        f"Let us begin. First question. {first_question.question}"
    )
    action_url = f"/api/v1/calls/twilio/answer/{session_id}"
    return _gather_with_audio(action_url, intro)


@router.post("/twilio/answer/{session_id}")
async def handle_answer(
    session_id: str,
    request: Request,
    db: Session = Depends(get_db),
) -> Response:
    session = _get_session_or_404(db, session_id)
    form = await request.form()
    speech_result = str(form.get("SpeechResult") or "").strip()

    if not speech_result:
        reprompt = "I did not catch that. Please answer after the tone."
        action_url = f"/api/v1/calls/twilio/answer/{session_id}"
        return _gather_with_audio(action_url, reprompt)

    evaluation = InterviewService().process_answer(db, session, speech_result)

    if evaluation.completed:
        closing = (
            f"Thank you {session.candidate_name}. Your interview is complete. "
            f"{evaluation.feedback}"
        )
        audio_url = _build_prompt_audio(closing)
        response = VoiceResponse()
        response.play(audio_url)
        response.hangup()
        return Response(content=str(response), media_type="application/xml")

    next_question = evaluation.next_question.question if evaluation.next_question else "Thank you."
    prompt = f"Recorded. {evaluation.feedback} Next question. {next_question}"
    action_url = f"/api/v1/calls/twilio/answer/{session_id}"
    return _gather_with_audio(action_url, prompt)
