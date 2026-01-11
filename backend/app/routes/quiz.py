from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from app.auth import get_current_user
from app.services.groq_service import groq_service
# Note: groq_service needs update to support quiz generation prompts

router = APIRouter()

class QuizRequest(BaseModel):
    topic: str
    difficulty: str = "medium"

class Question(BaseModel):
    question: str
    options: List[str]
    correct_answer: int # Index of correct option

class QuizResponse(BaseModel):
    title: str
    questions: List[Question]

@router.post("/", response_model=QuizResponse)
async def generate_quiz(
    request: QuizRequest,
    user: dict = Depends(get_current_user)
):
    # TODO: Implement generate_quiz in groq_service
    # For now, mocking logic or placeholder until service is updated
    try:
        quiz_data = await groq_service.generate_quiz(request.topic, request.difficulty)
        
        # Validate structure (Basic check)
        if "questions" not in quiz_data or not quiz_data["questions"]:
             raise HTTPException(status_code=500, detail="Failed to generate quiz questions")

        return QuizResponse(**quiz_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
