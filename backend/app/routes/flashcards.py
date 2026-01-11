from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from app.auth import get_current_user

router = APIRouter()

class FlashcardRequest(BaseModel):
    topic: str

class Flashcard(BaseModel):
    front: str
    back: str

class FlashcardResponse(BaseModel):
    flashcards: List[Flashcard]

from app.services.groq_service import groq_service

@router.post("/", response_model=FlashcardResponse)
async def generate_flashcards(
    request: FlashcardRequest,
    user: dict = Depends(get_current_user)
):
    try:
        cards_data = await groq_service.generate_flashcards(request.topic)
        
        if "flashcards" not in cards_data or not cards_data["flashcards"]:
             raise HTTPException(status_code=500, detail="Failed to generate flashcards")

        return FlashcardResponse(**cards_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
