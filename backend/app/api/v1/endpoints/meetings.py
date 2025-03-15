from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.config import settings
from app.db.session import get_db
from app.models.meeting import Meeting as MeetingModel, Task as TaskModel
from app.schemas.meeting import Meeting, MeetingCreate, MeetingSummary, Task, MeetingResponse, MeetingAnalysis
from app.api.deps import get_current_user
from app.models.user import User
from app.services.openai_service import transcribe_audio, analyze_meeting, generate_meeting_documents, extract_calendar_events
from app.services.calendar_service import create_calendar_events
from datetime import datetime
import tempfile
import os
import uuid

router = APIRouter()

@router.post("/", response_model=MeetingResponse)
async def create_meeting(
    *,
    db: Session = Depends(get_db),
    meeting_in: MeetingCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create new meeting.
    """
    meeting = MeetingModel(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        **meeting_in.dict()
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return meeting

@router.post("/transcribe/{meeting_id}", response_model=MeetingResponse)
async def transcribe_meeting(
    meeting_id: str,
    background_tasks: BackgroundTasks,
    audio_file: UploadFile = File(...),
    generate_documents: bool = True,
    sync_calendar: bool = True,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Transcribe meeting audio and perform comprehensive analysis:
    - Transcribe audio using OpenAI Whisper
    - Analyze content using GPT-4
    - Generate meeting documents
    - Extract and sync calendar events
    - Create tasks from action items
    """
    meeting = db.query(MeetingModel).filter(
        MeetingModel.id == meeting_id,
        MeetingModel.user_id == current_user.id
    ).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # Validate file type
    if not audio_file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="File must be an audio file")

    try:
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            content = await audio_file.read()
            temp_file.write(content)
            temp_file.flush()
            
            try:
                # Transcribe audio
                with open(temp_file.name, "rb") as audio:
                    transcript = await transcribe_audio(audio)
                meeting.transcript = transcript

                # Analyze meeting content
                analysis = await analyze_meeting(transcript)
                meeting.analysis = analysis

                # Generate meeting documents if requested
                if generate_documents:
                    documents = await generate_meeting_documents(analysis)
                    meeting.minutes = documents["minutes"]
                    meeting.status_email = documents["status_email"]
                    meeting.task_document = documents["task_document"]

                # Extract and create tasks from action items
                for item in analysis.get("action_items", []):
                    task = TaskModel(
                        id=str(uuid.uuid4()),
                        description=item["task"],
                        user_id=current_user.id,
                        meeting_id=meeting_id,
                        priority=item.get("priority", "medium"),
                        deadline=item.get("deadline"),
                        dependencies=item.get("dependencies", [])
                    )
                    db.add(task)

                # Sync calendar events if requested
                if sync_calendar and current_user.google_calendar_token:
                    events = await extract_calendar_events(analysis)
                    background_tasks.add_task(
                        create_calendar_events,
                        current_user.google_calendar_token,
                        events
                    )

                # Update meeting record
                meeting.updated_at = datetime.utcnow()
                db.commit()
                db.refresh(meeting)

                return meeting
            finally:
                # Clean up the temporary file
                os.unlink(temp_file.name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[MeetingResponse])
async def get_meetings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Retrieve meetings.
    """
    meetings = db.query(MeetingModel).filter(
        MeetingModel.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return meetings

@router.get("/{meeting_id}", response_model=MeetingResponse)
async def get_meeting(
    *,
    db: Session = Depends(get_db),
    meeting_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get meeting by ID.
    """
    meeting = db.query(MeetingModel).filter(
        MeetingModel.id == meeting_id,
        MeetingModel.user_id == current_user.id
    ).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting

@router.get("/{meeting_id}/analysis", response_model=MeetingAnalysis)
async def get_meeting_analysis(
    meeting_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get detailed analysis for a specific meeting"""
    meeting = db.query(MeetingModel).filter(
        MeetingModel.id == meeting_id,
        MeetingModel.user_id == current_user.id
    ).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if not meeting.analysis:
        raise HTTPException(status_code=404, detail="Meeting analysis not found")
    return meeting.analysis
