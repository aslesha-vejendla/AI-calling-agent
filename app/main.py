from fastapi.responses import FileResponse
from app.services.elevenlabs_service import text_to_speech
from fastapi import FastAPI
from app.routes.resume import router as resume_router
from app.routes.session import router as session_router
from app.services.twilio_service import make_call
from fastapi import Request
from fastapi.responses import Response

app = FastAPI()
app.include_router(resume_router)
app.include_router(session_router)

questions = [
    "Tell me about yourself.",
    "Explain a project where you used Python.",
    "How do you handle missing values in a dataset?",
    "What are your strengths as a data analyst?"
]
current_question_index = 0
candidate_answers = []

@app.get("/")
def root():
    return {"message": "Interview Agent Running"}

@app.get("/test-voice")
def test_voice():

    file_path = text_to_speech(
        "Hello Sarveshwar. Your AI voice interview agent is working."
    )

    return FileResponse(
        file_path,
        media_type="audio/mpeg",
        filename="voice.mp3"
    )  

@app.get("/call")
def call():

    sid = make_call(
    "+917977736018",
    questions[current_question_index])

    return {"call_sid": sid}

@app.post("/process-answer")
async def process_answer(request: Request):

    global current_question_index

    form_data = await request.form()

    speech_result = form_data.get("SpeechResult")

    print("\nCandidate Answer:")
    print(speech_result)

    candidate_answers.append({
        "question": questions[current_question_index],
        "answer": speech_result
    })

    current_question_index += 1

    if current_question_index >= len(questions):

        print("\nFinal Answers:")
        print(candidate_answers)

        current_question_index = 0

        twiml_response = """
        <Response>
            <Say>
                Thank you for completing the interview.Our team will review your responses and get back to you soon.
                Have a great day.
            </Say>

            <Pause length="2"/>

        </Response>
        """

    else:

        next_question = questions[current_question_index]

        twiml_response = f"""
        <Response>

            <Gather input="speech"
                    action="https://snort-deprive-deed.ngrok-free.dev/process-answer"
                    method="POST"
                    speechTimeout="5"
                    timeout="10">

                <Say>
                    {next_question}
                </Say>

            </Gather>

        </Response>
        """

    return Response(
        content=twiml_response,
        media_type="application/xml"
    )