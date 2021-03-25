from fastapi import FastAPI, File, UploadFile
from server.routes.student import router as StudentRouter
from server.routes.music import router as MusicRouter

app = FastAPI()
app.include_router(StudentRouter, tags=['Student'], prefix='/student')
app.include_router(MusicRouter, tags=['Music'], prefix='/music')

@app.get('/', tags=['Root'])
async def read_root():
    return {'message': 'Welcome to this app'}
