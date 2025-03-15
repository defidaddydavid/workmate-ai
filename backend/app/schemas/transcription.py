from pydantic import BaseModel, UUID4, Field
from typing import Optional, List, Dict
from datetime import datetime
from enum import Enum

class TranscriptionTier(str, Enum):
    BASIC = "basic"
    PREMIUM = "premium"
    ENTERPRISE = "enterprise"

class AudioUploadResponse(BaseModel):
    meeting_id: UUID4
    status: str = "processing"
    estimated_duration: Optional[float] = None
    file_format: str
    tier: TranscriptionTier
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TranscriptionSegment(BaseModel):
    start: float
    end: float
    text: str
    speaker: Optional[str] = None
    confidence: Optional[float] = None

class TranscriptionResult(BaseModel):
    meeting_id: UUID4
    text: str
    segments: List[TranscriptionSegment] = []
    language: str
    duration: float
    metadata: Dict = {}
    processed_at: datetime = Field(default_factory=datetime.utcnow)

class LiveTranscriptionChunk(BaseModel):
    meeting_id: UUID4
    chunk_text: str
    timestamp: datetime
    speaker_label: Optional[str] = None
    confidence: Optional[float] = None

class TranscriptionAnalysis(BaseModel):
    meeting_id: UUID4
    summary: str
    key_points: List[str]
    action_items: List[Dict]
    decisions: Optional[List[str]] = None
    risks: Optional[List[str]] = None
    sentiment: Optional[Dict] = None
    metadata: Dict = {}
    analyzed_at: datetime = Field(default_factory=datetime.utcnow)

class MeetingDocument(BaseModel):
    meeting_id: UUID4
    minutes: str
    status_email: Optional[str] = None
    task_document: Optional[str] = None
    risk_assessment: Optional[str] = None
    metadata: Dict = {}
    generated_at: datetime = Field(default_factory=datetime.utcnow)
