from typing import Optional
from pydantic import BaseModel, Field

class MusicSchema(BaseModel):
    music_name: str = Field(...)
    music_artist: str = Field(...)
    original_url: str = Field(...)


    class Config:
        schema_extra = {
            'example':{
                'music_name': 'Viva La Vida',
                'music_artist': 'ColdPlay',
                'original_url': 'https://youtube.com/'
            }
        }

class UpdateMusicModel(BaseModel):
    music_name: Optional[str]
    music_artist: Optional[str]
    original_url: Optional[str]

    class Config:
        schema_extra = {
            'example': {
                'music_name': 'Viva La Vida',
                'music_artist': 'Cold Play',
                'original_url': 'https://youtube.com/'
            }
        }

def ResponseModel(data, message):
    return{
        'data': [data],
        'code': 200,
        'message': message
    }

def ErrorResponseModel(error,code, message):
    return{
        'error': error,
        'code': code,
        'message': message
    }