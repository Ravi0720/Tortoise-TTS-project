from tortoise.api import TextToSpeech
from tortoise.utils.audio import load_audio, save_audio
import numpy as np
import os

class TTSEngine:
    def __init__(self):
        self.tts = TextToSpeech()

    def generate_speech(self, text, voice="random", speed=1.0):
        # Available voices: "random", "train", etc. (simplified for demo)
        audio = self.tts.tts(text, voice=voice)
        # Adjust speed (basic approximation)
        if speed != 1.0:
            audio = self._adjust_speed(audio, speed)
        output_path = "static/output.wav"
        save_audio(audio, output_path)
        return output_path

    def _adjust_speed(self, audio, speed):
        # Simplified speed adjustment (requires scipy for resampling)
        from scipy import signal
        new_length = int(len(audio) / speed)
        return signal.resample(audio, new_length)