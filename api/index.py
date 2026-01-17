import sys
import os

# Add backend directory to path so 'app' module can be imported
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from fastapi import FastAPI
from app.routes import explain, summarize, quiz, flashcards
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Study Buddy API", root_path="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for dev, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Study Buddy API is running"}

# Routes with /api prefix removed (handled by Vercel rewrites or base path)
app.include_router(explain.router, prefix="/explain", tags=["Explain"])
app.include_router(summarize.router, prefix="/summarize", tags=["Summarize"])
app.include_router(quiz.router, prefix="/quiz", tags=["Quiz"])
app.include_router(flashcards.router, prefix="/flashcards", tags=["Flashcards"])
