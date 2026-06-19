from fastapi.responses import FileResponse
from app.services.elevenlabs_service import text_to_speech
from fastapi import FastAPI, Request
from fastapi.responses import Response
from app.services.twilio_service import make_call
from fastapi.middleware.cors import CORSMiddleware
from app.services.question_generator import generate_questions
from app.services.evaluation_agent import EvaluationAgent

app = FastAPI()

questions = generate_questions()

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
        questions[current_question_index]
    )

    return {"call_sid": sid}


@app.post("/process-answer")
async def process_answer(request: Request):

    global current_question_index
    global candidate_answers

    form_data = await request.form()

    speech_result = form_data.get("SpeechResult", "")

    print("\nCandidate Answer:")
    print(speech_result)

    candidate_answers.append({
        "question": questions[current_question_index],
        "answer": speech_result
    })

    current_question_index += 1

    # =========================
    # INTERVIEW COMPLETED
    # =========================
    if current_question_index >= len(questions):

        print("\n========== FINAL ANSWERS ==========")
        print(candidate_answers)

        # -------------------------
        # AI EVALUATION
        # -------------------------
        evaluator = EvaluationAgent()

        answers_only = [
            item["answer"]
            for item in candidate_answers
        ]

        evaluation_result = evaluator.evaluate(
            answers_only
        )

        print("\n========== AI EVALUATION ==========")
        print(evaluation_result)

        print("\n========== INTERVIEW REPORT ==========")

        for item in candidate_answers:
            print(f"\nQ: {item['question']}")
            print(f"A: {item['answer']}")

        print("\nFINAL RESULT:")
        print(evaluation_result)

        # Reset for next interview
        candidate_answers.clear()
        current_question_index = 0

        twiml_response = """
        <Response>
            <Say>
                Thank you for completing the interview.
                Our team will review your responses and get back to you soon.
                Have a great day.
            </Say>

            <Pause length="2"/>

        </Response>
        """

    # =========================
    # ASK NEXT QUESTION
    # =========================
    else:

        next_question = questions[current_question_index]

        twiml_response = f"""
        <Response>

            <Gather input="speech"
                    action="https://brethren-curtly-shun.ngrok-free.dev/process-answer"
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


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)