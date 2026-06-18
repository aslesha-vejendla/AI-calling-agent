from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class PreScreenSession(Base):
    __tablename__ = "pre_screen_sessions"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"))
    result = Column(String)
    remarks = Column(String)