from sqlalchemy import Column, Integer, String
from app.core.database import Base


class LeadCall(Base):
    __tablename__ = "lead_calls"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    interest_level = Column(String)
    notes = Column(String)