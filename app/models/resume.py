from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"))
    file_name = Column(String)
    skills = Column(String)
    projects = Column(String)
    experience_level = Column(String)