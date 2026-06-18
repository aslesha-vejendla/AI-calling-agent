from app.core.database import Base, engine

# Import all models
from app.models.user import User
from app.models.candidate import Candidate
from app.models.resume import Resume
from app.models.interview_session import InterviewSession
from app.models.interview_question import InterviewQuestion
from app.models.interview_answer import InterviewAnswer
from app.models.pre_screen_session import PreScreenSession
from app.models.lead_call import LeadCall
from app.models.agent import Agent

Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully!")