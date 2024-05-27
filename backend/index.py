from fastapi import FastAPI, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from utility import *
import os
import io
import json
import soundfile as sf

app = FastAPI()

# Define the origins that should be allowed to make requests to this API
origins = [
    "http://localhost:3000",  # Add your frontend URL here
    "http://127.0.0.1:3000",  # If you're using a different port, include it as well
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FILE_DIRECTORY = "../sample_mp3/"

@app.post("/search_by_audio")
async def search_by_audio(audio: UploadFile):
    content, sampling_rate = sf.read(io.BytesIO(await audio.read()))
    embedding = audio_embedding([content])[0]
    result = audio_embedding_search(embedding)
    return {"result": result}

@app.get("/search_by_filename/{filename}")
async def search_by_audio_embedding(filename: str):
    record = pickle.loads(db[filename])
    embedding = pickle.loads(record["embedding"])
    result = audio_embedding_search(embedding)
    print("serach_by_filename: " + str(result))
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