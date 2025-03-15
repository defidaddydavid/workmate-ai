from pydantic import BaseModel, UUID4, HttpUrl
from typing import Optional, List, Dict
from datetime import datetime

class PlatformCredentials(BaseModel):
    platform: str  # zoom, google_meet, teams, webex
    api_key: str
    api_secret: Optional[str]
    oauth_token: Optional[str]
    webhook_url: Optional[HttpUrl]

class LiveMeetingSettings(BaseModel):
    enable_live_transcription: bool = True
    enable_speaker_diarization: bool = True
    enable_voice_commands: bool = True
    enable_sentiment_analysis: bool = True
    language: str = "en"
    privacy_level: str = "high"  # high, medium, low

class PrivacySettings(BaseModel):
    encrypt_audio: bool = True
    encrypt_transcript: bool = True
    retain_audio: bool = False
    retention_period_days: int = 30
    pii_detection: bool = True
    auto_redaction: bool = True
    allowed_domains: List[str] = []
    restricted_participants: List[str] = []

class VoiceCommand(BaseModel):
    command_type: str  # action_item, decision, reminder, follow_up
    timestamp: datetime
    content: str
    speaker: Optional[str]
    confidence: float

class LiveTranscriptChunk(BaseModel):
    meeting_id: UUID4
    timestamp: datetime
    speaker_id: Optional[str]
    content: str
    is_key_point: bool = False
    sentiment_score: Optional[float]
    voice_commands: List[VoiceCommand] = []

class LiveMeetingAnalytics(BaseModel):
    meeting_id: UUID4
    start_time: datetime
    current_duration: int  # seconds
    participant_count: int
    speaking_time_distribution: Dict[str, int]  # speaker_id -> seconds
    key_topics: List[str]
    sentiment_trends: Dict[str, float]  # timestamp -> score
    engagement_metrics: Dict[str, float]  # participant -> score
    action_items_count: int
    decisions_count: int

class MeetingPlatformConfig(BaseModel):
    platform_name: str
    credentials: PlatformCredentials
    live_settings: LiveMeetingSettings
    privacy_settings: PrivacySettings
    webhook_events: List[str] = [
        "meeting.started",
        "meeting.ended",
        "participant.joined",
        "participant.left",
        "recording.started",
        "recording.stopped"
    ]
