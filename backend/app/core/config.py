from typing import List, Optional, Dict, Any
from pydantic_settings import BaseSettings
from pydantic import BaseModel, PostgresDsn, validator
import secrets

class SecuritySettings(BaseModel):
    encryption_key: str = secrets.token_urlsafe(32)
    enable_e2e_encryption: bool = True
    pii_detection: bool = True
    auto_redaction: bool = True
    data_retention_days: int = 30

class PlatformSettings(BaseModel):
    zoom: Dict[str, str] = {
        "api_key": "",
        "api_secret": "",
        "webhook_token": ""
    }
    google_meet: Dict[str, str] = {
        "credentials_file": "",
        "project_id": ""
    }
    ms_teams: Dict[str, str] = {
        "client_id": "",
        "client_secret": "",
        "tenant_id": ""
    }

class Settings(BaseSettings):
    PROJECT_NAME: str = "WorkMate AI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Database
    DATABASE_URL: PostgresDsn
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://localhost:3000",
    ]
    
    # External APIs
    OPENAI_API_KEY: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

    # Security
    SECURITY_SETTINGS: SecuritySettings = SecuritySettings()

    # Meeting Platforms
    PLATFORM_SETTINGS: PlatformSettings = PlatformSettings()
    
    # Real-time Processing
    ENABLE_LIVE_TRANSCRIPTION: bool = True
    ENABLE_VOICE_COMMANDS: bool = True
    ENABLE_SENTIMENT_ANALYSIS: bool = True
    
    # Feature Flags
    ENABLE_CALENDAR_SYNC: bool = True
    ENABLE_TASK_AUTOMATION: bool = True
    ENABLE_MEETING_ANALYTICS: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
