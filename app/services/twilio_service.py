from __future__ import annotations

from fastapi import HTTPException, status
from twilio.rest import Client

from app.core.config import get_settings


class TwilioService:
    def __init__(self) -> None:
        self.settings = get_settings()

    def _client(self) -> Client:
        if not (
            self.settings.twilio_account_sid
            and self.settings.twilio_auth_token
            and self.settings.twilio_phone_number
        ):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Missing Twilio configuration.",
            )
        return Client(self.settings.twilio_account_sid, self.settings.twilio_auth_token)

    def create_outbound_call(self, to_number: str, session_id: str) -> str:
        call = self._client().calls.create(
            to=to_number,
            from_=self.settings.twilio_phone_number,
            url=f"{self.settings.public_base_url}/api/v1/calls/twilio/voice/{session_id}",
            method="POST",
        )
        return call.sid
