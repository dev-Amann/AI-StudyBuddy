from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    clerk_id: str
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    full_name: Optional[str] = None

class UserInDB(UserBase):
    id: str = Field(default_factory=str, alias="_id")
    joined_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
