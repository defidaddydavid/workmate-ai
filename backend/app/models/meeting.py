from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, JSON, Text, Float, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base_class import Base
from app.schemas.transcription import TranscriptionTier

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String, nullable=False)
    meeting_date = Column(DateTime, nullable=False)
    
    # Transcription fields
    transcript = Column(Text, nullable=True)
    transcript_segments = Column(JSONB, nullable=True)  # For premium/enterprise diarization
    audio_duration = Column(Float, nullable=True)
    language = Column(String, default="en")
    tier = Column(SQLEnum(TranscriptionTier), default=TranscriptionTier.BASIC)
    
    # Analysis fields
    analysis = Column(JSONB, nullable=True)
    summary = Column(Text, nullable=True)
    key_points = Column(JSONB, default=list)
    action_items = Column(JSONB, default=list)
    decisions = Column(JSONB, default=list)
    risks = Column(JSONB, default=list)
    sentiment = Column(JSONB, nullable=True)
    
    # Generated documents
    minutes = Column(Text, nullable=True)
    status_email = Column(Text, nullable=True)
    task_document = Column(Text, nullable=True)
    risk_assessment = Column(Text, nullable=True)
    
    # Processing status
    status = Column(String, default="pending")  # pending, processing, completed, error
    error_message = Column(Text, nullable=True)
    processed_at = Column(DateTime, nullable=True)
    
    # Calendar integration
    calendar_event_id = Column(String, nullable=True)
    
    # Metadata and timestamps
    metadata = Column(JSONB, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="meetings")
    tasks = relationship("Task", back_populates="meeting", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    meeting_id = Column(UUID(as_uuid=True), ForeignKey("meetings.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    description = Column(String, nullable=False)
    priority = Column(String, default="medium")  # high, medium, low
    deadline = Column(DateTime, nullable=True)
    dependencies = Column(JSONB, default=list)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)

    # Relationships
    meeting = relationship("Meeting", back_populates="tasks")
    user = relationship("User", back_populates="tasks")
