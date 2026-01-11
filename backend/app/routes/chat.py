from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from app.auth import get_current_user
from app.database import db
from app.services.groq_service import groq_service

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str
    timestamp: datetime = datetime.utcnow()

class ChatSession(BaseModel):
    id: str
    title: str
    updated_at: datetime
    
class CreateMessageRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    session_id: str
    message: Message
    title: str

# --- Endpoints ---

@router.get("/sessions", response_model=List[ChatSession])
async def get_sessions(user: dict = Depends(get_current_user)):
    user_id = user.get("sub")
    cursor = db.chats.find({"user_id": user_id}).sort("updated_at", -1)
    sessions = []
    async for doc in cursor:
        sessions.append(ChatSession(
            id=str(doc["_id"]),
            title=doc.get("title", "New Chat"),
            updated_at=doc.get("updated_at", datetime.utcnow())
        ))
    return sessions

@router.get("/{session_id}", response_model=List[Message])
async def get_session_messages(session_id: str, user: dict = Depends(get_current_user)):
    user_id = user.get("sub")
    if not ObjectId.is_valid(session_id):
        raise HTTPException(status_code=400, detail="Invalid session ID")
        
    doc = await db.chats.find_one({"_id": ObjectId(session_id), "user_id": user_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Session not found")
        
    messages = [Message(**m) for m in doc.get("messages", [])]
    return messages

@router.post("/", response_model=ChatResponse)
async def create_new_session_and_message(
    request: CreateMessageRequest,
    user: dict = Depends(get_current_user)
):
    """Creates a new session with the first message"""
    return await _process_chat_message(user, request.message, session_id=None)

@router.post("/{session_id}", response_model=ChatResponse)
async def continue_session(
    session_id: str,
    request: CreateMessageRequest,
    user: dict = Depends(get_current_user)
):
    """Adds a message to an existing session"""
    return await _process_chat_message(user, request.message, session_id=session_id)

@router.delete("/{session_id}", status_code=204)
async def delete_session(session_id: str, user: dict = Depends(get_current_user)):
    user_id = user.get("sub")
    if not ObjectId.is_valid(session_id):
        raise HTTPException(status_code=400, detail="Invalid session ID")
        
    result = await db.chats.delete_one({"_id": ObjectId(session_id), "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Session not found")
    return None

# --- Helper ---

async def _process_chat_message(user: dict, user_text: str, session_id: Optional[str]):
    user_id = user["sub"]
    
    # 1. Fetch History or Initialize
    history = []
    title = "New Chat"
    
    if session_id:
        if not ObjectId.is_valid(session_id):
            raise HTTPException(status_code=400, detail="Invalid session ID")
        doc = await db.chats.find_one({"_id": ObjectId(session_id), "user_id": user_id})
        if not doc:
            raise HTTPException(status_code=404, detail="Session not found")
        history = doc.get("messages", [])
        title = doc.get("title", "New Chat")
    else:
        # Generate generic title from first few words
        title = " ".join(user_text.split()[:4]) + "..."
    
    # 2. Append User Message
    user_msg = {
        "role": "user",
        "content": user_text,
        "timestamp": datetime.utcnow()
    }
    history.append(user_msg)
    
    # 3. Call AI
    groq_messages = [{"role": m["role"], "content": m["content"]} for m in history[-10:]]
    if len(groq_messages) == 1:
        groq_messages.insert(0, {"role": "system", "content": "You are a helpful AI Tutor."})
        
    try:
        ai_content = await groq_service.client.chat.completions.create(
            messages=groq_messages,
            model="llama-3.3-70b-versatile"
        )
        response_text = ai_content.choices[0].message.content
        
         # 4. Append AI Message
        ai_msg = {
            "role": "assistant",
            "content": response_text,
            "timestamp": datetime.utcnow()
        }
        history.append(ai_msg)
        
        # 5. Save to DB
        if session_id:
            await db.chats.update_one(
                {"_id": ObjectId(session_id)},
                {"$set": {"messages": history, "updated_at": datetime.utcnow()}}
            )
            final_session_id = session_id
        else:
            new_doc = {
                "user_id": user_id,
                "title": title,
                "messages": history,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            result = await db.chats.insert_one(new_doc)
            final_session_id = str(result.inserted_id)
            
        return ChatResponse(
            session_id=final_session_id,
            message=Message(**ai_msg),
            title=title
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
