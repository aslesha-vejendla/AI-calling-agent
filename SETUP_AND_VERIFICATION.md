# Setup And Verification

This guide covers:

- where to get API keys
- how to integrate them into this project
- how to verify the backend locally

## 1. Required Accounts

- Twilio
- ElevenLabs
- OpenRouter or another OpenAI-compatible LLM provider for Llama 3.2
- Render for deployment

## 2. Where To Get Keys

### Twilio

You need:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

Official docs:

- Twilio API credentials: https://www.twilio.com/docs/iam/api-keys
- Twilio phone numbers: https://www.twilio.com/docs/phone-numbers

Typical setup:

1. Create a Twilio account.
2. In the Twilio Console, copy your Account SID and Auth Token.
3. Buy or provision a voice-capable Twilio phone number.
4. Put those values into `.env`.

### ElevenLabs

You need:

- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`

Official docs:

- ElevenLabs API docs: https://elevenlabs.io/docs/api-reference/quick-start/introduction
- Text to speech docs: https://elevenlabs.io/docs/cookbooks/text-to-speech/streaming

Typical setup:

1. Create an ElevenLabs account.
2. Create or select a voice in the ElevenLabs dashboard.
3. Copy your API key from account settings.
4. Copy the voice ID for the selected voice.
5. Put both values into `.env`.

### OpenRouter For Llama 3.2

You need:

- `LLM_API_KEY`
- `LLM_BASE_URL`
- `LLM_MODEL`

Official docs:

- OpenRouter API keys: https://openrouter.ai/settings/keys
- OpenRouter docs: https://openrouter.ai/docs/quickstart
- Model routing docs: https://openrouter.ai/docs/features/provider-routing

Typical setup:

1. Create an OpenRouter account.
2. Generate an API key.
3. Keep `LLM_BASE_URL=https://openrouter.ai/api/v1`.
4. Keep `LLM_MODEL=meta-llama/llama-3.2-3b-instruct:free` unless you want another model.
5. Put the key into `.env`.

### Render

Official docs:

- Render environment variables: https://render.com/docs/configure-environment-variables
- Render web services: https://render.com/docs/web-services

## 3. Environment Setup

Create your local env file:

```powershell
cd D:\ai-recruitment-platform
copy .env.example .env
```

Fill in:

```env
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
LLM_API_KEY=
```

## 4. Install And Run

```powershell
cd D:\ai-recruitment-platform
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

- `http://localhost:8000/docs`
- `http://localhost:8000/api/v1/health`

## 5. Verify Core Backend

### Health check

`GET /api/v1/health`

Expected:

```json
{
  "status": "ok",
  "app": "AI Recruitment Voice Assistant"
}
```

### Create a script

`POST /api/v1/scripts`

Example body:

```json
{
  "name": "Default Recruiter Script",
  "description": "Main interview script",
  "status": "active",
  "language": "en",
  "variables": [
    { "key": "candidate_name", "label": "Candidate Name", "required": true },
    { "key": "job_title", "label": "Job Title", "required": true },
    { "key": "company_name", "label": "Company Name", "required": true }
  ],
  "sections": {
    "intro": "Hello {{candidate_name}}, welcome to your interview for the {{job_title}} role at {{company_name}}.",
    "qualification": "Thank you {{candidate_name}}.",
    "objections": "Let me clarify that for you.",
    "closing": "Thank you for your time, {{candidate_name}}.",
    "pause_message": "The call is paused right now. Please stay on the line."
  }
}
```

### Render a script

`POST /api/v1/scripts/{script_id}/render`

Example body:

```json
{
  "variables": {
    "candidate_name": "John Doe",
    "job_title": "Backend Engineer",
    "company_name": "AI Recruiter"
  }
}
```

Expected result: placeholders are replaced in all sections.

### Upload a resume

`POST /api/v1/resume/upload`

Form fields:

- `role_name`
- `phone_number`
- `candidate_email`
- `company_name`
- `script_id`
- `file`

Expected result:

- session is created
- resume is analyzed
- questions are generated
- script variables are attached to the session

### Start a call

`POST /api/v1/calls`

Example body:

```json
{
  "session_id": "your-session-id"
}
```

Expected result:

- Twilio returns a `call_sid`
- session status becomes `in_progress`

### Pause or resume a live session

`POST /api/v1/calls/sessions/{session_id}/controls`

Example bodies:

```json
{ "action": "pause" }
```

```json
{ "action": "resume" }
```

```json
{ "action": "skip" }
```

```json
{ "action": "end" }
```

## 6. Local Twilio Testing

Twilio needs a public URL for callbacks. For local testing, use a tunnel such as `ngrok`.

Official docs:

- https://ngrok.com/docs/getting-started/
- Twilio webhook basics: https://www.twilio.com/docs/usage/webhooks

Typical flow:

1. Run the FastAPI app locally on port `8000`.
2. Start ngrok:

```powershell
ngrok http 8000
```

3. Update `.env`:

```env
PUBLIC_BASE_URL=https://your-ngrok-domain.ngrok-free.app
```

4. Restart the FastAPI app.
5. Start the interview call using `/api/v1/calls`.

## 7. What Counts As Verified

You can consider the backend verified when:

- health endpoint returns `ok`
- script creation works
- script rendering replaces variables correctly
- resume upload creates a session
- session detail shows `script_id` and `script_variables`
- call creation returns a `call_sid`
- pause and resume endpoints change session status
- Twilio callback reaches `/api/v1/calls/twilio/voice/{session_id}`
- ElevenLabs generates prompt audio files in `storage/audio`

## 8. Current Limits

Current backend support is good for the interview and scripting foundation, but still not full production scope for:

- auth and teams
- campaigns orchestration
- recruiter dashboard aggregates
- call recordings and transcripts
- analytics pipelines
- Postgres migrations
