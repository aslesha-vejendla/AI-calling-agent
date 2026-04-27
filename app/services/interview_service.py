from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.models import CandidateResponse, CandidateSession, SessionStatus
from app.models.schemas import AnswerEvaluation, InterviewQuestion, ResumeAnalysis
from app.services.llm_service import LLMService


class InterviewService:
    def __init__(self) -> None:
        self.llm = LLMService()
        self.settings = get_settings()

    def generate_questions(self, role_name: str, analysis: ResumeAnalysis) -> list[InterviewQuestion]:
        system_prompt = (
            "You are an AI recruiter. Generate structured interview questions as JSON. "
            "Return a top-level key named questions containing an array of objects with "
            "question, skill, objective."
        )
        user_prompt = (
            f"Role: {role_name}\n"
            f"Candidate profile: {analysis.model_dump_json(indent=2)}\n"
            f"Generate exactly {self.settings.interview_question_count} voice-friendly interview questions."
        )
        payload = self.llm.complete_json(system_prompt, user_prompt)
        return [InterviewQuestion.model_validate(item) for item in payload["questions"]]

    def evaluate_answer(
        self,
        role_name: str,
        question: InterviewQuestion,
        answer: str,
    ) -> tuple[int, str]:
        system_prompt = (
            "You score interview answers for recruiters. "
            "Return JSON with integer score from 0 to 100 and short feedback."
        )
        user_prompt = (
            f"Role: {role_name}\n"
            f"Question: {question.question}\n"
            f"Skill: {question.skill}\n"
            f"Objective: {question.objective}\n"
            f"Candidate answer: {answer}"
        )
        payload = self.llm.complete_json(system_prompt, user_prompt)
        return int(payload["score"]), payload["feedback"]

    def process_answer(
        self,
        db: Session,
        session: CandidateSession,
        answer: str,
    ) -> AnswerEvaluation:
        questions = [InterviewQuestion.model_validate(item) for item in session.questions]
        question_index = session.current_question_index
        current_question = questions[question_index]
        score, feedback = self.evaluate_answer(session.role_name, current_question, answer)

        db.add(
            CandidateResponse(
                session_id=session.id,
                question_index=question_index,
                question=current_question.question,
                answer=answer,
                score=score,
                feedback=feedback,
            )
        )

        next_index = question_index + 1
        session.current_question_index = next_index
        session.status = SessionStatus.in_progress

        if next_index >= len(questions):
            summary = self._finalize_session(db, session)
            db.commit()
            return AnswerEvaluation(score=score, feedback=summary, completed=True)

        db.commit()
        return AnswerEvaluation(
            score=score,
            feedback=feedback,
            next_question=questions[next_index],
            completed=False,
        )

    def _finalize_session(self, db: Session, session: CandidateSession) -> str:
        db.flush()
        db.refresh(session)
        responses = list(session.responses)
        overall_score = round(sum(item.score for item in responses) / max(len(responses), 1))
        session.overall_score = overall_score
        session.recommendation = "selected" if overall_score >= self.settings.passing_score else "hold"
        session.status = SessionStatus.completed

        system_prompt = (
            "You summarize completed recruitment interviews. Return concise plain text suitable "
            "for a hiring dashboard and a spoken closing statement."
        )
        answers_blob = "\n".join(
            f"Q: {item.question}\nA: {item.answer}\nScore: {item.score}\nFeedback: {item.feedback}"
            for item in responses
        )
        session.final_summary = self.llm.complete_text(
            system_prompt,
            (
                f"Candidate: {session.candidate_name}\nRole: {session.role_name}\n"
                f"Overall score: {overall_score}\nRecommendation: {session.recommendation}\n"
                f"Interview transcript:\n{answers_blob}"
            ),
        )
        db.add(session)
        return session.final_summary
