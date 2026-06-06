from twilio.rest import Client
import os
from dotenv import load_dotenv

load_dotenv()

client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

def make_call(to_number, question):

    call = client.calls.create(
        to=to_number,
        from_=os.getenv("TWILIO_PHONE_NUMBER"),
        twiml=f"""
        <Response>

            <Gather input="speech"
                    action="https://snort-deprive-deed.ngrok-free.dev/process-answer"
                    method="POST"
                    speechTimeout="5"
                    timeout="10">

                <Say>
                    {question}
                </Say>

            </Gather>

        </Response>
        """
    )

    return call.sid