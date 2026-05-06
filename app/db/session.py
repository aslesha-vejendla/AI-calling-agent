from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_settings


settings = get_settings()

# MySQL connection args
mysql_connect_args = {
    "charset": "utf8mb4",
    "connect_timeout": 10,
}

# Determine engine args based on database type
if settings.database_url.startswith("mysql"):
    connect_args = mysql_connect_args
    engine_kwargs = {
        "pool_size": 10,
        "max_overflow": 20,
        "pool_pre_ping": True,  # Validate connections before using
        "echo": False,
    }
else:
    connect_args = {"check_same_thread": False}
    engine_kwargs = {}

engine = create_engine(settings.database_url, future=True, connect_args=connect_args, **engine_kwargs)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
