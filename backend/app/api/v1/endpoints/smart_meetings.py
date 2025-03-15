from fastapi import APIRouter, Depends, HTTPException, WebSocket
from typing import Dict, List
from datetime import datetime
from app.core.config import settings
from app.services.calendar_service import CalendarService
from app.services.meeting_capture_service import MeetingCaptureService, MeetingPlatform
from app.services.meeting_preparation_service import MeetingPreparationService
from app.api import deps
from app.models.user import User
from app.schemas.meeting_platform import (
    LiveMeetingSettings,
    PrivacySettings,
    LiveTranscriptChunk,
    LiveMeetingAnalytics
)

router = APIRouter()

@router.post("/schedule")
async def schedule_smart_meeting(
    title: str,
    start_time: datetime,
    end_time: datetime,
    attendees: List[str],
    description: str = "",
    meeting_type: str = "status_update",
    current_user: User = Depends(deps.get_current_user)
) -> Dict:
    """
    Schedule a new smart meeting with automatic capture setup
    """
    calendar_service = CalendarService(current_user.calendar_token)
    return await calendar_service.create_smart_meeting(
        title=title,
        start_time=start_time,
        end_time=end_time,
        attendees=attendees,
        description=description,
        meeting_type=meeting_type
    )

@router.websocket("/live/{meeting_id}")
async def live_meeting_socket(
    websocket: WebSocket,
    meeting_id: str,
    current_user: User = Depends(deps.get_current_user)
):
    """
    WebSocket connection for real-time meeting features
    """
    await websocket.accept()
    
    capture_service = MeetingCaptureService(platform=MeetingPlatform.GOOGLE_MEET)
    
    try:
        while True:
            # Receive audio chunks and commands
            data = await websocket.receive_json()
            
            if data["type"] == "audio_chunk":
                # Process audio in real-time
                transcript_chunk = await capture_service.process_chunk(
                    audio_chunk=data["audio"],
                    timestamp=data["timestamp"],
                    speaker_id=data["speaker_id"]
                )
                await websocket.send_json({"type": "transcript", "data": transcript_chunk})
                
            elif data["type"] == "voice_command":
                # Handle voice commands
                command_result = await capture_service.handle_voice_command(
                    command=data["command"],
                    meeting_id=meeting_id,
                    user_id=str(current_user.id)
                )
                await websocket.send_json({"type": "command_result", "data": command_result})
                
            elif data["type"] == "analytics_request":
                # Send real-time analytics
                analytics = await capture_service.get_live_analytics(meeting_id)
                await websocket.send_json({"type": "analytics", "data": analytics})
    
    except Exception as e:
        await websocket.close()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{meeting_id}/privacy")
async def get_privacy_settings(
    meeting_id: str,
    current_user: User = Depends(deps.get_current_user)
) -> PrivacySettings:
    """
    Get current privacy settings for a meeting
    """
    capture_service = MeetingCaptureService(platform=MeetingPlatform.GOOGLE_MEET)
    return await capture_service.get_privacy_settings(meeting_id)

@router.put("/{meeting_id}/privacy")
async def update_privacy_settings(
    meeting_id: str,
    settings: PrivacySettings,
    current_user: User = Depends(deps.get_current_user)
) -> PrivacySettings:
    """
    Update privacy settings for a meeting
    """
    capture_service = MeetingCaptureService(platform=MeetingPlatform.GOOGLE_MEET)
    return await capture_service.update_privacy_settings(meeting_id, settings)

@router.get("/{meeting_id}/analytics")
async def get_meeting_analytics(
    meeting_id: str,
    current_user: User = Depends(deps.get_current_user)
) -> LiveMeetingAnalytics:
    """
    Get real-time analytics for an ongoing meeting
    """
    capture_service = MeetingCaptureService(platform=MeetingPlatform.GOOGLE_MEET)
    return await capture_service.get_live_analytics(meeting_id)

@router.post("/{meeting_id}/voice-command")
async def process_voice_command(
    meeting_id: str,
    command: str,
    current_user: User = Depends(deps.get_current_user)
) -> Dict:
    """
    Process a voice command for the meeting
    """
    capture_service = MeetingCaptureService(platform=MeetingPlatform.GOOGLE_MEET)
    return await capture_service.handle_voice_command(
        command=command,
        meeting_id=meeting_id,
        user_id=str(current_user.id)
    )
