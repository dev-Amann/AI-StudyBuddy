from fastapi import FastAPI
from app.routes import explain, summarize, quiz, flashcards, chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Study Buddy API")

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

app.include_router(explain.router, prefix="/api/explain", tags=["Explain"])
app.include_router(summarize.router, prefix="/api/summarize", tags=["Summarize"])
app.include_router(quiz.router, prefix="/api/quiz", tags=["Quiz"])
app.include_router(flashcards.router, prefix="/api/flashcards", tags=["Flashcards"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
