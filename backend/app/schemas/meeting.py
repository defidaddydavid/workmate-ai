from pydantic import BaseModel, UUID4
from datetime import datetime
from typing import Optional, List

class TaskBase(BaseModel):
    description: str
    due_date: Optional[datetime] = None
    status: str = "pending"

class TaskCreate(TaskBase):
    meeting_id: Optional[str] = None

class Task(TaskBase):
    id: str
    user_id: str
    meeting_id: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class MeetingBase(BaseModel):
    title: str
    meeting_date: datetime

class MeetingCreate(MeetingBase):
    pass

class Meeting(MeetingBase):
    id: str
    user_id: str
    transcript: Optional[str] = None
    summary: Optional[str] = None
    created_at: datetime
    calendar_event_id: Optional[str] = None
    action_items: List[Task] = []

    class Config:
        from_attributes = True

class MeetingTranscription(BaseModel):
    meeting_id: str
    audio_file: str  # Base64 encoded audio or file path

class MeetingSummary(BaseModel):
    meeting_id: str
    transcript: str
    summary: Optional[str] = None
    action_items: List[str] = []

class Task(BaseModel):
    id: UUID4
    description: str
    completed: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class MeetingResponse(MeetingBase):
    id: UUID4
    user_id: UUID4
    transcript: Optional[str] = None
    summary: Optional[str] = None
    action_items: List[str] = []
    calendar_event_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
