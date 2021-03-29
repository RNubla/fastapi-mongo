from fastapi import FastAPI, File, UploadFile
from server.routes.student import router as StudentRouter
from server.routes.music import router as MusicRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    '*',
    "http://localhost:8000",
    "http://localhost:8080",
    'http://192.168.1.233:8080/'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(StudentRouter, tags=['Student'], prefix='/student')
app.include_router(MusicRouter, tags=['Music'], prefix='/music')


@app.get('/', tags=['Root'])
async def read_root():
    return {'message': 'Welcome to this app'}
