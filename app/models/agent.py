from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    agent_name = Column(String)
    agent_type = Column(String)
    status = Column(String, default="Active")