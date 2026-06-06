from elevenlabs.client import ElevenLabs
from dotenv import load_dotenv
import os

load_dotenv()

print(os.getenv("ELEVENLABS_API_KEY"))
print(os.getenv("ELEVENLABS_VOICE_ID"))

client = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY")
)

def text_to_speech(text):

    audio = client.text_to_speech.convert(
        voice_id=os.getenv("ELEVENLABS_VOICE_ID"),
        text=text,
        model_id="eleven_multilingual_v2"
    )

    with open("output.mp3", "wb") as f:
        for chunk in audio:
            f.write(chunk)

    return "output.mp3"