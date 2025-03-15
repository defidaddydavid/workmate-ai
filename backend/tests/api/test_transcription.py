import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import json
from datetime import datetime
import uuid
from app.main import app
from app.core.config import settings
from app.services.openai_service import TranscriptionTier

client = TestClient(app)

@pytest.fixture
def mock_openai():
    with patch("app.services.openai_service.client") as mock:
        yield mock

@pytest.fixture
def test_user_token():
    """Create a test JWT token"""
    return "test_token"

@pytest.fixture
def test_meeting_id():
    """Create a test meeting ID"""
    return str(uuid.uuid4())

def test_upload_audio_basic_tier(mock_openai, test_user_token, test_meeting_id):
    """Test basic tier audio upload and transcription"""
    # Mock OpenAI response
    mock_openai.audio.transcriptions.create.return_value = MagicMock(
        text="Test transcript",
        segments=[{"start": 0, "end": 1, "text": "Test"}]
    )
    
    # Create test audio file
    test_audio = b"test audio content"
    
    response = client.post(
        f"/api/v1/transcription/upload/{test_meeting_id}",
        files={"audio_file": ("test.mp3", test_audio, "audio/mpeg")},
        data={"tier": TranscriptionTier.BASIC},
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "processing"
    assert data["tier"] == TranscriptionTier.BASIC

def test_upload_audio_premium_tier(mock_openai, test_user_token, test_meeting_id):
    """Test premium tier audio upload with enhanced features"""
    # Mock OpenAI response with premium features
    mock_openai.audio.transcriptions.create.return_value = MagicMock(
        text="Test transcript",
        segments=[
            {
                "start": 0,
                "end": 1,
                "text": "Test",
                "speaker": "Speaker 1",
                "confidence": 0.95
            }
        ],
        speaker_labels=["Speaker 1"]
    )
    
    # Create larger test audio file
    test_audio = b"test audio content" * 1000  # Simulate larger file
    
    response = client.post(
        f"/api/v1/transcription/upload/{test_meeting_id}",
        files={"audio_file": ("test.mp3", test_audio, "audio/mpeg")},
        data={"tier": TranscriptionTier.PREMIUM},
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "processing"
    assert data["tier"] == TranscriptionTier.PREMIUM

@pytest.mark.asyncio
async def test_live_transcription(mock_openai, test_user_token, test_meeting_id):
    """Test enterprise tier live transcription"""
    # Mock OpenAI response for live transcription
    mock_openai.audio.transcriptions.create.return_value = MagicMock(
        text="Live test chunk",
        segments=[
            {
                "start": 0,
                "end": 0.5,
                "text": "Live test",
                "speaker": "Speaker 1",
                "confidence": 0.98
            }
        ],
        speaker_labels=["Speaker 1"]
    )
    
    # Test WebSocket connection
    with client.websocket_connect(
        f"/api/v1/transcription/live/{test_meeting_id}?tier={TranscriptionTier.ENTERPRISE}"
    ) as websocket:
        # Send test audio chunk
        test_chunk = b"test audio chunk"
        await websocket.send_bytes(test_chunk)
        
        # Receive transcription result
        response = await websocket.receive_json()
        assert response["chunk_text"] == "Live test chunk"
        assert response["speaker_label"] == "Speaker 1"
        assert response["confidence"] > 0.9

def test_get_transcription_status(test_user_token, test_meeting_id):
    """Test transcription status endpoint"""
    response = client.get(
        f"/api/v1/transcription/{test_meeting_id}/status",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "updated_at" in data

def test_get_transcript(mock_openai, test_user_token, test_meeting_id):
    """Test getting completed transcript"""
    response = client.get(
        f"/api/v1/transcription/{test_meeting_id}/transcript",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "text" in data
    assert "segments" in data
    assert "metadata" in data

def test_get_analysis(mock_openai, test_user_token, test_meeting_id):
    """Test getting meeting analysis"""
    response = client.get(
        f"/api/v1/transcription/{test_meeting_id}/analysis",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert "key_points" in data
    assert "action_items" in data

def test_file_size_limits():
    """Test file size limits for different tiers"""
    sizes = {
        TranscriptionTier.BASIC: 25 * 1024 * 1024,  # 25MB
        TranscriptionTier.PREMIUM: 100 * 1024 * 1024,  # 100MB
        TranscriptionTier.ENTERPRISE: 500 * 1024 * 1024  # 500MB
    }
    
    for tier, max_size in sizes.items():
        # Test file slightly over limit
        test_audio = b"x" * (max_size + 1024)
        
        response = client.post(
            f"/api/v1/transcription/upload/{uuid.uuid4()}",
            files={"audio_file": ("test.mp3", test_audio, "audio/mpeg")},
            data={"tier": tier},
            headers={"Authorization": "Bearer test_token"}
        )
        
        assert response.status_code == 400
        assert "File too large" in response.json()["detail"]

def test_invalid_audio_format():
    """Test rejection of invalid audio formats"""
    test_file = b"invalid file content"
    
    response = client.post(
        f"/api/v1/transcription/upload/{uuid.uuid4()}",
        files={"audio_file": ("test.txt", test_file, "text/plain")},
        data={"tier": TranscriptionTier.BASIC},
        headers={"Authorization": "Bearer test_token"}
    )
    
    assert response.status_code == 400
    assert "Unsupported audio format" in response.json()["detail"]

def test_enterprise_features(mock_openai, test_user_token, test_meeting_id):
    """Test enterprise-specific features"""
    # Mock OpenAI responses
    mock_openai.audio.transcriptions.create.return_value = MagicMock(
        text="Enterprise test",
        segments=[
            {
                "start": 0,
                "end": 1,
                "text": "Enterprise test",
                "speaker": "Speaker 1",
                "confidence": 0.99
            }
        ],
        speaker_labels=["Speaker 1"]
    )
    
    # Test voice command processing
    voice_command = "WorkMate, action item: Complete documentation by Friday"
    
    response = client.post(
        f"/api/v1/transcription/{test_meeting_id}/voice-command",
        json={"command": voice_command},
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "action_items" in data
    assert len(data["action_items"]) > 0
