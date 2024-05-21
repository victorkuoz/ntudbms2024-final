from fastapi import FastAPI, UploadFile
from utility import *

import io
import soundfile as sf

app = FastAPI()

@app.post("/audio_query")
async def audio_query(audio: UploadFile):
    content, sampling_rate = sf.read(io.BytesIO(await audio.read()))
    embedding = audio_embedding([content])[0]
    result = audio_embedding_search(embedding)

    return {'result': result}

@app.post("/audio_embedding_query")
async def audio_embedding_query(embedding: list[float]):
    embedding = [random.uniform(-1, 1) for _ in range(2048)]
    result = audio_embedding_search(embedding)

    return {'result': result} 

@app.get("/")
def read_root():
    return {"Welcome to BTS"}