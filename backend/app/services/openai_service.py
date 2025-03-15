from typing import Dict, List, Optional, BinaryIO
from datetime import datetime
import json
import asyncio
from openai import AsyncOpenAI
from app.core.config import settings
from app.models.meeting import Meeting

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

class TranscriptionTier:
    BASIC = "basic"      # Free tier: Basic file upload, standard quality
    PREMIUM = "premium"  # Premium: High quality, speaker diarization
    ENTERPRISE = "enterprise"  # Enterprise: Live transcription, real-time analytics

async def transcribe_audio(
    audio_file: BinaryIO,
    tier: str = TranscriptionTier.BASIC,
    language: Optional[str] = None
) -> Dict:
    """
    Transcribe audio using OpenAI Whisper API with tiered features
    """
    try:
        # Configure transcription options based on tier
        options = {
            "model": "whisper-1",
            "response_format": "verbose_json",
        }
        
        if tier in [TranscriptionTier.PREMIUM, TranscriptionTier.ENTERPRISE]:
            options.update({
                "timestamp_granularities": ["segment", "word"],
                "diarization": True
            })
            
        if language:
            options["language"] = language

        # Perform transcription
        transcript = await client.audio.transcriptions.create(
            file=audio_file,
            **options
        )
        
        # Process results based on tier
        result = {
            "text": transcript.text,
            "segments": [],
            "metadata": {
                "processed_at": datetime.utcnow().isoformat(),
                "tier": tier,
                "language": language or "auto-detect"
            }
        }
        
        if tier in [TranscriptionTier.PREMIUM, TranscriptionTier.ENTERPRISE]:
            result["segments"] = transcript.segments
            result["speaker_labels"] = transcript.speaker_labels if hasattr(transcript, "speaker_labels") else None
            
        return result
        
    except Exception as e:
        raise Exception(f"Transcription failed: {str(e)}")

async def process_live_audio_chunk(
    audio_chunk: bytes,
    meeting_id: str,
    tier: str = TranscriptionTier.ENTERPRISE
) -> Dict:
    """
    Process live audio chunks for real-time transcription
    """
    if tier != TranscriptionTier.ENTERPRISE:
        raise ValueError("Live transcription requires Enterprise tier")
        
    try:
        # Process the audio chunk
        result = await client.audio.transcriptions.create(
            file=("chunk.wav", audio_chunk),
            model="whisper-1",
            response_format="verbose_json",
            timestamp_granularities=["word"],
            diarization=True
        )
        
        return {
            "meeting_id": meeting_id,
            "chunk_text": result.text,
            "timestamp": datetime.utcnow().isoformat(),
            "speaker_label": result.speaker_labels[0] if hasattr(result, "speaker_labels") else None,
            "confidence": result.segments[0].confidence if result.segments else None
        }
        
    except Exception as e:
        raise Exception(f"Live transcription chunk processing failed: {str(e)}")

async def analyze_transcript(
    transcript: str,
    tier: str = TranscriptionTier.BASIC
) -> Dict:
    """
    Analyze transcript using GPT-4 to extract insights
    """
    try:
        # Basic tier prompt
        base_prompt = f"""
        Analyze this meeting transcript and provide:
        1. Brief summary (2-3 sentences)
        2. Key discussion points (up to 5)
        3. Action items with assignees

        Transcript:
        {transcript}
        """
        
        # Enhanced prompt for premium tiers
        if tier in [TranscriptionTier.PREMIUM, TranscriptionTier.ENTERPRISE]:
            base_prompt += """
            Also provide:
            4. Decisions made
            5. Risk factors identified
            6. Project timeline updates
            7. Resource requirements
            8. Follow-up meeting suggestions
            9. Sentiment analysis
            10. Participation metrics
            """
        
        completion = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI assistant specialized in analyzing meeting transcripts."},
                {"role": "user", "content": base_prompt}
            ],
            temperature=0.0,
            response_format={ "type": "json_object" }
        )
        
        # Parse and validate the response
        analysis = json.loads(completion.choices[0].message.content)
        
        # Add metadata
        analysis["metadata"] = {
            "analyzed_at": datetime.utcnow().isoformat(),
            "tier": tier,
            "model": "gpt-4"
        }
        
        return analysis
        
    except Exception as e:
        raise Exception(f"Transcript analysis failed: {str(e)}")

async def generate_meeting_documents(
    meeting: Meeting,
    tier: str = TranscriptionTier.BASIC
) -> Dict:
    """
    Generate formal meeting documents based on transcript and analysis
    """
    try:
        # Basic tier: Simple meeting minutes
        base_prompt = f"""
        Generate formal meeting minutes from this transcript and analysis:
        
        Title: {meeting.title}
        Date: {meeting.meeting_date}
        Transcript: {meeting.transcript}
        Analysis: {meeting.analysis}
        """
        
        # Premium tiers: Additional documents
        if tier in [TranscriptionTier.PREMIUM, TranscriptionTier.ENTERPRISE]:
            base_prompt += """
            Also generate:
            1. Executive summary email
            2. Action items tracking document
            3. Project status update
            4. Risk assessment report
            """
            
        completion = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI assistant specialized in generating professional meeting documentation."},
                {"role": "user", "content": base_prompt}
            ],
            temperature=0.0,
            response_format={ "type": "json_object" }
        )
        
        documents = json.loads(completion.choices[0].message.content)
        
        # Add metadata
        documents["metadata"] = {
            "generated_at": datetime.utcnow().isoformat(),
            "tier": tier,
            "model": "gpt-4"
        }
        
        return documents
        
    except Exception as e:
        raise Exception(f"Document generation failed: {str(e)}")
