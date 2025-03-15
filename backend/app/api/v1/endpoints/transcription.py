from fastapi import APIRouter, Depends, File, UploadFile, WebSocket, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from typing import Dict, Optional
from datetime import datetime
import aiofiles
import os
from uuid import UUID

from app.core.config import settings
from app.api import deps
from app.models.user import User
from app.models.meeting import Meeting
from app.services.openai_service import (
    transcribe_audio,
    process_live_audio_chunk,
    analyze_transcript,
    generate_meeting_documents,
    TranscriptionTier
)
from app.schemas.transcription import (
    AudioUploadResponse,
    TranscriptionResult,
    LiveTranscriptionChunk,
    TranscriptionAnalysis,
    MeetingDocument
)
from app.db.session import AsyncSessionLocal

router = APIRouter()

ALLOWED_AUDIO_TYPES = {
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/m4a": "m4a",
    "audio/mp4": "m4a"
}

UPLOAD_DIR = "uploads/audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def process_audio_file(
    meeting_id: UUID,
    file_path: str,
    tier: str,
    db: AsyncSessionLocal
):
    """Background task to process uploaded audio file"""
    try:
        # Read and transcribe audio
        async with aiofiles.open(file_path, "rb") as audio_file:
            transcript_result = await transcribe_audio(
                audio_file=audio_file,
                tier=tier
            )
        
        # Get meeting from database
        async with db() as session:
            meeting = await session.get(Meeting, meeting_id)
            if not meeting:
                raise HTTPException(status_code=404, detail="Meeting not found")
            
            # Update meeting with transcript
            meeting.transcript = transcript_result["text"]
            meeting.updated_at = datetime.utcnow()
            
            # Analyze transcript
            analysis = await analyze_transcript(
                transcript=transcript_result["text"],
                tier=tier
            )
            meeting.analysis = analysis
            
            # Generate documents for premium tiers
            if tier in [TranscriptionTier.PREMIUM, TranscriptionTier.ENTERPRISE]:
                documents = await generate_meeting_documents(
                    meeting=meeting,
                    tier=tier
                )
                meeting.minutes = documents.get("minutes")
                meeting.status_email = documents.get("status_email")
                meeting.task_document = documents.get("task_document")
            
            await session.commit()
            
        # Clean up uploaded file
        os.remove(file_path)
        
    except Exception as e:
        # Log error and update meeting status
        print(f"Error processing audio: {str(e)}")
        async with db() as session:
            meeting = await session.get(Meeting, meeting_id)
            if meeting:
                meeting.status = "error"
                meeting.error_message = str(e)
                meeting.updated_at = datetime.utcnow()
                await session.commit()

@router.post("/upload/{meeting_id}", response_model=AudioUploadResponse)
async def upload_audio(
    meeting_id: UUID,
    background_tasks: BackgroundTasks,
    tier: str = TranscriptionTier.BASIC,
    audio_file: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_user),
    db: AsyncSessionLocal = Depends(deps.get_db)
):
    """
    Upload audio file for transcription
    
    - Supports MP3, WAV, M4A formats
    - File size limits:
      * Basic: 25MB
      * Premium: 100MB
      * Enterprise: 500MB
    - Premium features:
      * Speaker diarization
      * Higher accuracy
      * Word-level timestamps
    """
    # Validate audio format
    if audio_file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported audio format. Allowed types: {', '.join(ALLOWED_AUDIO_TYPES.values())}"
        )
    
    # Validate file size based on tier
    size_limits = {
        TranscriptionTier.BASIC: 25 * 1024 * 1024,  # 25MB
        TranscriptionTier.PREMIUM: 100 * 1024 * 1024,  # 100MB
        TranscriptionTier.ENTERPRISE: 500 * 1024 * 1024  # 500MB
    }
    
    file_size = 0
    chunk_size = 1024 * 1024  # 1MB chunks
    
    while chunk := await audio_file.read(chunk_size):
        file_size += len(chunk)
        if file_size > size_limits[tier]:
            raise HTTPException(
                status_code=400,
                detail=f"File too large for {tier} tier. Maximum size: {size_limits[tier] // (1024 * 1024)}MB"
            )
    
    # Reset file position
    await audio_file.seek(0)
    
    # Save file temporarily
    file_ext = ALLOWED_AUDIO_TYPES[audio_file.content_type]
    file_path = os.path.join(UPLOAD_DIR, f"{meeting_id}.{file_ext}")
    
    async with aiofiles.open(file_path, "wb") as out_file:
        while chunk := await audio_file.read(chunk_size):
            await out_file.write(chunk)
    
    # Start background processing
    background_tasks.add_task(
        process_audio_file,
        meeting_id=meeting_id,
        file_path=file_path,
        tier=tier,
        db=db
    )
    
    return AudioUploadResponse(
        meeting_id=meeting_id,
        status="processing",
        file_format=file_ext,
        tier=tier
    )

@router.websocket("/live/{meeting_id}")
async def live_transcription(
    websocket: WebSocket,
    meeting_id: UUID,
    tier: str = TranscriptionTier.ENTERPRISE
):
    """
    WebSocket endpoint for live transcription
    
    Enterprise tier features:
    - Real-time transcription
    - Speaker diarization
    - Live analytics
    - Instant action item detection
    """
    if tier != TranscriptionTier.ENTERPRISE:
        await websocket.close(code=4000, reason="Live transcription requires Enterprise tier")
        return
    
    await websocket.accept()
    
    try:
        while True:
            # Receive audio chunk
            audio_data = await websocket.receive_bytes()
            
            # Process chunk
            result = await process_live_audio_chunk(
                audio_chunk=audio_data,
                meeting_id=str(meeting_id),
                tier=tier
            )
            
            # Send back transcription
            await websocket.send_json(result)
            
    except Exception as e:
        print(f"Live transcription error: {str(e)}")
        await websocket.close(code=1001, reason=str(e))

@router.get("/{meeting_id}/status", response_model=Dict)
async def get_transcription_status(
    meeting_id: UUID,
    current_user: User = Depends(deps.get_current_user),
    db: AsyncSessionLocal = Depends(deps.get_db)
):
    """Get status of audio processing"""
    async with db() as session:
        meeting = await session.get(Meeting, meeting_id)
        if not meeting:
            raise HTTPException(status_code=404, detail="Meeting not found")
            
        return {
            "meeting_id": meeting_id,
            "status": "completed" if meeting.transcript else "processing",
            "error": meeting.error_message if hasattr(meeting, "error_message") else None,
            "updated_at": meeting.updated_at
        }

@router.get("/{meeting_id}/transcript", response_model=TranscriptionResult)
async def get_transcript(
    meeting_id: UUID,
    current_user: User = Depends(deps.get_current_user),
    db: AsyncSessionLocal = Depends(deps.get_db)
):
    """Get meeting transcript"""
    async with db() as session:
        meeting = await session.get(Meeting, meeting_id)
        if not meeting:
            raise HTTPException(status_code=404, detail="Meeting not found")
        if not meeting.transcript:
            raise HTTPException(status_code=404, detail="Transcript not yet available")
            
        return TranscriptionResult(
            meeting_id=meeting_id,
            text=meeting.transcript,
            segments=meeting.transcript_segments if hasattr(meeting, "transcript_segments") else [],
            language=meeting.language if hasattr(meeting, "language") else "en",
            duration=meeting.duration if hasattr(meeting, "duration") else 0.0,
            metadata=meeting.metadata if hasattr(meeting, "metadata") else {}
        )

@router.get("/{meeting_id}/analysis", response_model=TranscriptionAnalysis)
async def get_analysis(
    meeting_id: UUID,
    current_user: User = Depends(deps.get_current_user),
    db: AsyncSessionLocal = Depends(deps.get_db)
):
    """Get meeting analysis"""
    async with db() as session:
        meeting = await session.get(Meeting, meeting_id)
        if not meeting:
            raise HTTPException(status_code=404, detail="Meeting not found")
        if not meeting.analysis:
            raise HTTPException(status_code=404, detail="Analysis not yet available")
            
        return TranscriptionAnalysis(
            meeting_id=meeting_id,
            **meeting.analysis
        )

@router.get("/{meeting_id}/documents", response_model=MeetingDocument)
async def get_documents(
    meeting_id: UUID,
    current_user: User = Depends(deps.get_current_user),
    db: AsyncSessionLocal = Depends(deps.get_db)
):
    """Get generated meeting documents"""
    async with db() as session:
        meeting = await session.get(Meeting, meeting_id)
        if not meeting:
            raise HTTPException(status_code=404, detail="Meeting not found")
        if not meeting.minutes:
            raise HTTPException(status_code=404, detail="Documents not yet available")
            
        return MeetingDocument(
            meeting_id=meeting_id,
            minutes=meeting.minutes,
            status_email=meeting.status_email,
            task_document=meeting.task_document
        )
