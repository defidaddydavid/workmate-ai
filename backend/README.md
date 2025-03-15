# WorkMate AI Backend

Backend service for WorkMate AI, providing meeting transcription, summarization, and task management capabilities.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with the following variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/workmate
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Run the development server:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once running, visit http://localhost:8000/docs for the interactive API documentation.

## Transcription Service

WorkMate AI provides a comprehensive meeting transcription service with tiered features:

### Service Tiers

#### Basic (Free)
- Audio file upload (up to 25MB)
- Basic transcription
- Simple meeting minutes
- Action item extraction
- File formats: MP3, WAV, M4A

#### Premium
- Larger file uploads (up to 100MB)
- Speaker diarization
- Higher accuracy transcription
- Word-level timestamps
- Enhanced meeting analysis
- Multiple document formats
- Sentiment analysis

#### Enterprise
- Maximum file size: 500MB
- Live transcription support
- Real-time analytics
- Voice commands
- Custom vocabulary
- Priority processing
- Advanced security features

### API Endpoints

#### File Upload Transcription
```bash
# Upload audio file
POST /api/v1/transcription/upload/{meeting_id}
Content-Type: multipart/form-data
{
    "audio_file": file,
    "tier": "basic|premium|enterprise"
}

# Check transcription status
GET /api/v1/transcription/{meeting_id}/status

# Get transcript
GET /api/v1/transcription/{meeting_id}/transcript

# Get analysis
GET /api/v1/transcription/{meeting_id}/analysis

# Get generated documents
GET /api/v1/transcription/{meeting_id}/documents
```

#### Live Transcription (Enterprise)
```bash
# WebSocket connection
WS /api/v1/transcription/live/{meeting_id}?tier=enterprise

# Voice commands during meeting:
"WorkMate, action item: [task]"
"WorkMate, decision: [decision]"
"WorkMate, follow up: [note]"
```

### Integration Example

```python
import requests

# 1. Upload audio file
with open("meeting.mp3", "rb") as f:
    response = requests.post(
        "http://localhost:8000/api/v1/transcription/upload/meeting-id",
        files={"audio_file": f},
        data={"tier": "premium"},
        headers={"Authorization": f"Bearer {token}"}
    )

# 2. Check status
status = requests.get(
    "http://localhost:8000/api/v1/transcription/meeting-id/status",
    headers={"Authorization": f"Bearer {token}"}
)

# 3. Get transcript and analysis
if status.json()["status"] == "completed":
    transcript = requests.get(
        "http://localhost:8000/api/v1/transcription/meeting-id/transcript",
        headers={"Authorization": f"Bearer {token}"}
    )
    analysis = requests.get(
        "http://localhost:8000/api/v1/transcription/meeting-id/analysis",
        headers={"Authorization": f"Bearer {token}"}
    )
```

### WebSocket Example (Enterprise)

```python
import websockets
import json

async def live_transcription():
    uri = "ws://localhost:8000/api/v1/transcription/live/meeting-id?tier=enterprise"
    async with websockets.connect(uri) as websocket:
        # Send audio chunks
        chunk = await get_audio_chunk()  # Your audio capture function
        await websocket.send(chunk)
        
        # Receive transcription
        result = await websocket.recv()
        print(json.loads(result))
```

## Security Features

- End-to-end encryption for audio and transcripts
- PII detection and auto-redaction
- Role-based access control
- Compliance with privacy regulations
- Secure data retention policies

## Dependencies

- FastAPI: Web framework
- PostgreSQL: Database
- OpenAI Whisper: Speech-to-text
- OpenAI GPT-4: Meeting analysis
- SQLAlchemy: ORM
- PyJWT: Authentication
- WebSockets: Live transcription
- aiofiles: Async file handling
