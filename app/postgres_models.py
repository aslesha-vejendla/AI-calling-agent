import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship

# Update 'your_password' and 'database_name' with your actual PostgreSQL details
DATABASE_URL = "postgresql://postgres:Admin123@localhost:5432/talent_corner"
engine = create_engine(DATABASE_URL)
Base = declarative_base()

class Candidate(Base):
    __tablename__ = 'candidates'
    candidate_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    conversations = relationship("Conversation", back_populates="candidate", cascade="all, delete")

class Conversation(Base):
    __tablename__ = 'conversations'
    conversation_id = Column(Integer, primary_key=True, autoincrement=True)
    candidate_id = Column(Integer, ForeignKey('candidates.candidate_id', ondelete='CASCADE'))
    session_date = Column(DateTime, nullable=False)
    status = Column(String(20), default='Scheduled')
    candidate = relationship("Candidate", back_populates="conversations")
    interviews = relationship("Interview", back_populates="conversation", cascade="all, delete")

class Interview(Base):
    __tablename__ = 'interviews'
    interview_id = Column(Integer, primary_key=True, autoincrement=True)
    conversation_id = Column(Integer, ForeignKey('conversations.conversation_id', ondelete='CASCADE'))
    question_asked = Column(Text, nullable=False)
    answer_given = Column(Text)
    score = Column(Integer)
    interviewer_notes = Column(Text)
    conversation = relationship("Conversation", back_populates="interviews")

# This creates the tables in your PostgreSQL database
Base.metadata.create_all(engine)
print("Database tables created successfully!")