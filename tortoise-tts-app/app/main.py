from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from app.tts import TTSEngine
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
tts_engine = TTSEngine()

@app.get("/")
async def root():
    return FileResponse("static/index.html")

@app.post("/generate")
async def generate_speech(text: str = Form(...), voice: str = Form("random"), speed: float = Form(1.0)):
    output_path = tts_engine.generate_speech(text, voice, speed)
    return FileResponse(output_path, media_type="audio/wav", filename="output.wav")