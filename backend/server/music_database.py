# from backend.server.database import MONGO_DETAILS
import motor.motor_asyncio
from bson.objectid import ObjectId

MONGO_DETAILS = 'mongodb://localhost:27017'

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

music_db = client.music

music_collection = music_db.get_collection('music_collection')

def music_helper(music)-> dict:
    return{
        'id': str(music['_id']),
        'music_name': music['music_name'],
        'music_artist': music['music_artist'],
        'original_url': music['original_url']
    }

# CRUD OPERATION
async def retrieve_musics():
    musics = []
    async for music in music_collection.find():
        musics.append(music_helper(music=music))
    return musics

async def add_music(music_data: dict) -> dict:
    music =  await music_collection.insert_one(music_data)
    new_music = await music_collection.find_one({'_id': music.inserted_id})
    return music_helper(new_music)

async def retrieve_music(id: str)-> dict:
    music = await music_collection.find_one({'_id': ObjectId(id)})
    if music:
        return music_helper(music=music)

async def update_music(id: str, data: dict):
    if len(data) < 1:
        return False
    music = await music_collection.find_one({'_id': ObjectId(id)})
    if music:
        updated_music = await music_collection.update_one(
            {'_id': ObjectId(id)},
            {'$set': data}
        )
        if updated_music:
            return True
        return False

async def delete_music(id:str):
    music = await music_collection.find_one({'_id': ObjectId(id)})
    if music:
        await music_collection.delete_one({'_id': ObjectId(id)})
        return True