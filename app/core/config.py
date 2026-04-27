from functools import lru_cache
from pathlib import Path

from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    app_name: str = "AI Recruitment Voice Assistant"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    database_url: str = f"sqlite:///{BASE_DIR / 'recruitment.db'}"
    public_base_url: AnyHttpUrl = "http://localhost:8000"
    cors_origins: list[str] = Field(default_factory=lambda: ["*"])

    twilio_account_sid: str | None = None
    twilio_auth_token: str | None = None
    twilio_phone_number: str | None = None

    elevenlabs_api_key: str | None = None
    elevenlabs_voice_id: str | None = None
    elevenlabs_model_id: str = "eleven_multilingual_v2"

    llm_api_key: str | None = None
    llm_base_url: AnyHttpUrl = "https://openrouter.ai/api/v1"
    llm_model: str = "meta-llama/llama-3.2-3b-instruct:free"
    llm_app_name: str = "AI Recruitment Voice Assistant"
    llm_site_url: AnyHttpUrl | None = None

    interview_question_count: int = 5
    passing_score: int = 70

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
