from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from pydantic import BaseModel
from app.auth import get_current_user
from app.services.groq_service import groq_service
import PyPDF2
import io

router = APIRouter()

class SummaryResponse(BaseModel):
    summary: str
    original_filename: str

@router.post("/", response_model=SummaryResponse)
async def summarize_pdf(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        content = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
            
        summary = await groq_service.summarize_text(text)
        
        # TODO: Save summary to DB
        
        return SummaryResponse(summary=summary, original_filename=file.filename)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
