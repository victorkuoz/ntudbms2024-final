from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from utility import *

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


@app.post("/audio_query")
async def audio_query(file: UploadFile):
    content = await file.read()
    embedding = audio_embedding(content)
    result = audio_embedding_search(embedding)
    # print("POST: /audio_query")
    return {'result': result}

@app.post("/audio_embedding_query")
async def audio_embedding_query(embedding: list[float]):
    embedding = [random.uniform(-1, 1) for _ in range(2048)]
    result = audio_embedding_search(embedding)

    return {'result': result} 

@app.get("/")
def read_root():
    return {"Welcome to BTS"}