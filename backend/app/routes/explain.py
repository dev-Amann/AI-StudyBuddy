from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from app.auth import get_current_user
from app.services.groq_service import groq_service

router = APIRouter()

class ExplainRequest(BaseModel):
    topic: str

class ExplainResponse(BaseModel):
    explanation: str
    topic: str

@router.post("/", response_model=ExplainResponse)
async def explain_topic(
    request: ExplainRequest,
    user: dict = Depends(get_current_user) # Require auth
):
    try:
        explanation = await groq_service.get_explanation(request.topic)
        # TODO: Save to MongoDB 'activity_logs' or 'histories'
        return ExplainResponse(explanation=explanation, topic=request.topic)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
