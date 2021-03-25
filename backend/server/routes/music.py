from fastapi import APIRouter, Body

from fastapi.encoders import jsonable_encoder

from server.music_database import(
    retrieve_musics,
    retrieve_music,
    update_music,
    delete_music,
    add_music
)

from server.models.music import (
    ErrorResponseModel,
    ResponseModel,
    MusicSchema,
    UpdateMusicModel
)

router = APIRouter()

@router.post('/', response_description='Add Music data to database')
async def add_music_data(music: MusicSchema = Body(...)):
    _music = jsonable_encoder(music)
    new_music = await add_music(_music)
    return ResponseModel(new_music, 'Music added successfully')

@router.get('/', response_description='Retrieve Music from database')
async def get_musics():
    musics = await retrieve_musics()
    if musics:
        return ResponseModel(musics, 'Music data retrieved successfully')
    return ResponseModel(musics, 'Empty list returned')

@router.get('/{id}', response_description='Retrieve Music data based on ID')
async def get_music_data(id):
    music = await retrieve_music(id)
    if music:
        return ResponseModel(music, 'Music data retrieved successfully')
    return ErrorResponseModel(
        'An error occured',
        404,
        'Music does not exist'
    )

@router.put('/{id}', response_description='Update data of specific music')
async def update_music_data(id:str, req: UpdateMusicModel = Body(...)):
    req = {k: v for k,v in req.dict().items() if v is not None}
    updated_music = await update_music(id,req)
    if updated_music:
        return ResponseModel(
            f'Music with ID: {id} update is successful',
            'Music updated successfully'
        )
    return ErrorResponseModel(
        'An error occurred',
        404,
        'There was an error updating the music data'
    )

@router.delete('/{id}', response_description='Delete music')
async def delete_music_from_collection(id):
    deleted_music = await delete_music(id)
    if delete_music:
        return ResponseModel(
            f'Music with ID: {id} removed',
            'Music deleted successfully from collection'
        )
    return ErrorResponseModel(
        'An error occurred',
        404,
        f'Music with ID: {id} does not exist'
    )