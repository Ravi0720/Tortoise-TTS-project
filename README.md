# Tortoise TTS Web App
A text-to-speech app using Tortoise TTS, FastAPI, and Three.js.

## Setup
1. Clone: `git clone https://github.com/Ravi0720/Tortoise-TTS-project`
2. Create venv: `python -m venv venv`
3. Activate: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install: `pip install -r requirements.txt`
5. Run: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## Deploy on Render
1. Push to GitHub.
2. Create Web Service on Render, link repo.
3. Use `render.yaml` config.

