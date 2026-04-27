from __future__ import annotations

import json

import requests
from fastapi import HTTPException, status

from app.core.config import get_settings


class LLMService:
    def __init__(self) -> None:
        self.settings = get_settings()

    def _headers(self) -> dict[str, str]:
        if not self.settings.llm_api_key:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Missing LLM_API_KEY configuration.",
            )

        headers = {
            "Authorization": f"Bearer {self.settings.llm_api_key}",
            "Content-Type": "application/json",
        }
        if self.settings.llm_site_url:
            headers["HTTP-Referer"] = str(self.settings.llm_site_url)
        if self.settings.llm_app_name:
            headers["X-Title"] = self.settings.llm_app_name
        return headers

    def complete_json(self, system_prompt: str, user_prompt: str) -> dict:
        response = requests.post(
            f"{self.settings.llm_base_url}/chat/completions",
            headers=self._headers(),
            json={
                "model": self.settings.llm_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.2,
                "response_format": {"type": "json_object"},
            },
            timeout=45,
        )
        response.raise_for_status()
        payload = response.json()
        content = payload["choices"][0]["message"]["content"]
        return self._parse_json_content(content)

    def complete_text(self, system_prompt: str, user_prompt: str) -> str:
        response = requests.post(
            f"{self.settings.llm_base_url}/chat/completions",
            headers=self._headers(),
            json={
                "model": self.settings.llm_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.3,
            },
            timeout=45,
        )
        response.raise_for_status()
        payload = response.json()
        return payload["choices"][0]["message"]["content"].strip()

    @staticmethod
    def _parse_json_content(content: str) -> dict:
        cleaned = content.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.strip("`")
            if cleaned.startswith("json"):
                cleaned = cleaned[4:].strip()
        return json.loads(cleaned)
