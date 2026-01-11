import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGODB_URI = os.getenv("MONGODB_URI")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    CLERK_ISSUER_URL = os.getenv("CLERK_ISSUER_URL")
    
settings = Settings()
