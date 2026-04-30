# AI Recruitment Voice Assistant Backend

FastAPI backend for an AI recruitment platform with:

- resume upload and Llama-based candidate analysis
- auto-generated interview questions
- configurable recruiter scripts with placeholders
- Twilio outbound interview calls
- ElevenLabs voice prompts
- pause, resume, skip, and end call controls
- session scoring and hiring summaries
- Render deployment support

## Flow

1. Upload a PDF resume to `/api/v1/resume/upload`.
2. The backend extracts text, asks a Llama 3.2 model for profile analysis, and generates interview questions.
3. Start an outbound call with `/api/v1/calls`.
4. Twilio calls the candidate, captures spoken answers, and posts them back to the backend.
5. The backend evaluates each answer with the LLM, speaks the next prompt with ElevenLabs, and stores the session result.
6. Recruiters can control the session with pause, resume, skip, and end actions.

## Project layout

```text
app/
  api/routes/      # FastAPI endpoints
  core/            # configuration
  db/              # SQLAlchemy models and session
  models/          # Pydantic schemas
  services/        # LLM, resume, Twilio, ElevenLabs logic
  utils/           # response mappers
```

## Local run

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

Open `http://localhost:8000/docs`.

See [SETUP_AND_VERIFICATION.md](D:/ai-recruitment-platform/SETUP_AND_VERIFICATION.md) for key setup, integration, and test steps.

## Required environment variables

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`
- `LLM_API_KEY`

## Llama 3.2 note

This backend is wired to an OpenAI-compatible chat endpoint. The default configuration targets `meta-llama/llama-3.2-3b-instruct:free` through OpenRouter. If you prefer another compatible free host, update `LLM_BASE_URL`, `LLM_MODEL`, and `LLM_API_KEY`.

## Render deployment

1. Create a new Web Service on Render from this repo or folder.
2. Render will read `render.yaml`.
3. Set `PUBLIC_BASE_URL` to your Render URL, for example `https://your-service.onrender.com`.
4. Add all Twilio, ElevenLabs, and LLM environment variables in Render.
5. In Twilio, use the live webhook path:

```text
POST https://your-service.onrender.com/api/v1/calls/twilio/voice/{session_id}
```

## Suggested next steps

- add recruiter auth and dashboards
- store call recordings and transcripts
- move from SQLite to Render Postgres
- add WebSocket streaming if you want live barge-in conversations later
