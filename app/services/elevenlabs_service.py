from __future__ import annotations

from pathlib import Path
from uuid import uuid4

import requests
from fastapi import HTTPException, status

from app.core.config import BASE_DIR, get_settings


class ElevenLabsService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.audio_dir = BASE_DIR / "storage" / "audio"
        self.audio_dir.mkdir(parents=True, exist_ok=True)

    def synthesize(self, text: str) -> str:
        if not self.settings.elevenlabs_api_key or not self.settings.elevenlabs_voice_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Missing ElevenLabs configuration.",
            )

        file_name = f"{uuid4()}.mp3"
        output_path = self.audio_dir / file_name
        response = requests.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{self.settings.elevenlabs_voice_id}",
            headers={
                "xi-api-key": self.settings.elevenlabs_api_key,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg",
            },
            json={
                "text": text,
                "model_id": self.settings.elevenlabs_model_id,
                "voice_settings": {"stability": 0.45, "similarity_boost": 0.8},
            },
            timeout=60,
        )
        response.raise_for_status()
        output_path.write_bytes(response.content)
        return f"{self.settings.public_base_url}/audio/{file_name}"
