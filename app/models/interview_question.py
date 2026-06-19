from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.id"))
    question_text = Column(String)
    question_type = Column(String)