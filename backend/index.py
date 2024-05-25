from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from utility import *
import os
import io
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

@app.get("/file_query/{filename}")
async def file_query(filename: str):
    file_path = os.path.join(FILE_DIRECTORY, filename)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename)
    return {"error": "File not found"}

@app.get("/more_audio_query/{filename}")
async def more_audio_query(filename: str):
    # search more similar audios by given filename
    result = [
        {
		"title": "MP3-2",
        "filename": "test2.mp3",
		"similarity": 0.55,
		
	},
	{
		"title": "MP3-3",
        "filename": "test3.mp3",
		"similarity": 0.64,
		
	},
    ]

    return {'result': result}