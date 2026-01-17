from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
import certifi

client = AsyncIOMotorClient(
    settings.MONGODB_URI,
    tlsCAFile=certifi.where()
)
db = client.study_buddy_db

async def get_db():
    return db
