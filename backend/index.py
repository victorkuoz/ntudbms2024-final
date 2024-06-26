from fastapi import FastAPI, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import soundfile as sf
from utility import *
import os
import io
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/search_by_audio")
async def search_by_audio(audio: UploadFile):
    content, sampling_rate = sf.read(io.BytesIO(await audio.read()))

    if len(content.shape) == 2:
        content = content[:, 1]

    embedding = audio_embedding([content])[0]
    partiton = get_partition(embedding, centroids)
    result = audio_embedding_search(embedding, partiton)

    return {"result": result}

@app.get("/search_by_filename/{filename}")
async def search_by_audio_embedding(filename: str):
    record = pickle.loads(db[filename])
    embedding = pickle.loads(record["embedding"])
    partiton = get_partition(embedding, centroids)
    result = audio_embedding_search(embedding, partiton)

    return {"result": result}

@app.get("/query_file/{filename}")
async def query_file(filename: str):
    record = pickle.loads(db[filename])
    audio = pickle.loads(record["audio"])

    if os.path.exists("result.wav"):
        os.remove("result.wav")
    sf.write("result.wav", audio["array"], audio["sampling_rate"])

    return FileResponse(path="result.wav", filename=filename)

@app.get("/")
def read_root():
    return {"Welcome to BTS"}