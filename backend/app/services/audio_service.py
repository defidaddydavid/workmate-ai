from typing import BinaryIO, Dict, Optional
import os
import aiofiles
from datetime import datetime
from uuid import UUID
import soundfile as sf
from pydub import AudioSegment
from app.core.config import settings

class AudioFormat:
    MP3 = "mp3"
    WAV = "wav"
    M4A = "m4a"

    @staticmethod
    def get_mime_type(format: str) -> str:
        mime_types = {
            "mp3": "audio/mpeg",
            "wav": "audio/wav",
            "m4a": "audio/m4a"
        }
        return mime_types.get(format, "application/octet-stream")

class AudioService:
    """
    Service for handling audio file operations
    """
    
    def __init__(self):
        self.upload_dir = os.path.join("uploads", "audio")
        os.makedirs(self.upload_dir, exist_ok=True)
        
        # Size limits in bytes
        self.size_limits = {
            "basic": 25 * 1024 * 1024,      # 25MB
            "premium": 100 * 1024 * 1024,   # 100MB
            "enterprise": 500 * 1024 * 1024 # 500MB
        }
    
    async def save_audio_file(
        self,
        file: BinaryIO,
        meeting_id: UUID,
        original_filename: str,
        tier: str = "basic"
    ) -> Dict:
        """
        Save uploaded audio file with validation and optimization
        """
        try:
            # Extract file extension
            ext = original_filename.split(".")[-1].lower()
            if ext not in [AudioFormat.MP3, AudioFormat.WAV, AudioFormat.M4A]:
                raise ValueError(f"Unsupported audio format: {ext}")
            
            # Generate filename
            timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
            filename = f"{meeting_id}_{timestamp}.{ext}"
            filepath = os.path.join(self.upload_dir, filename)
            
            # Save file
            async with aiofiles.open(filepath, "wb") as out_file:
                # Read and write in chunks to handle large files
                chunk_size = 1024 * 1024  # 1MB chunks
                total_size = 0
                
                while chunk := await file.read(chunk_size):
                    total_size += len(chunk)
                    
                    # Check size limit
                    if total_size > self.size_limits[tier]:
                        os.remove(filepath)  # Clean up partial file
                        raise ValueError(f"File size exceeds {tier} tier limit")
                    
                    await out_file.write(chunk)
            
            # Get audio metadata
            metadata = await self.get_audio_metadata(filepath)
            
            return {
                "filepath": filepath,
                "filename": filename,
                "format": ext,
                "size": total_size,
                "metadata": metadata
            }
            
        except Exception as e:
            # Clean up any partial files
            if 'filepath' in locals() and os.path.exists(filepath):
                os.remove(filepath)
            raise e
    
    async def get_audio_metadata(self, filepath: str) -> Dict:
        """
        Extract metadata from audio file
        """
        try:
            audio = AudioSegment.from_file(filepath)
            
            return {
                "duration": len(audio) / 1000.0,  # Convert to seconds
                "channels": audio.channels,
                "sample_width": audio.sample_width,
                "frame_rate": audio.frame_rate,
                "frame_count": int(len(audio) * audio.frame_rate / 1000)
            }
            
        except Exception as e:
            raise Exception(f"Failed to extract audio metadata: {str(e)}")
    
    async def optimize_audio(
        self,
        filepath: str,
        target_format: str = AudioFormat.WAV,
        **kwargs
    ) -> str:
        """
        Optimize audio file for transcription
        """
        try:
            audio = AudioSegment.from_file(filepath)
            
            # Apply optimizations based on kwargs
            if kwargs.get("normalize", True):
                audio = audio.normalize()
            
            if kwargs.get("channels") == 1:
                audio = audio.set_channels(1)
            
            if sample_rate := kwargs.get("sample_rate"):
                audio = audio.set_frame_rate(sample_rate)
            
            # Generate optimized filename
            opt_filename = f"{os.path.splitext(filepath)[0]}_opt.{target_format}"
            
            # Export optimized file
            audio.export(
                opt_filename,
                format=target_format,
                parameters=["-ac", "1"]  # Force mono for better transcription
            )
            
            return opt_filename
            
        except Exception as e:
            raise Exception(f"Audio optimization failed: {str(e)}")
    
    async def prepare_for_transcription(
        self,
        filepath: str,
        tier: str = "basic"
    ) -> str:
        """
        Prepare audio file for optimal transcription based on tier
        """
        try:
            if tier == "basic":
                # Basic optimization for standard quality
                return await self.optimize_audio(
                    filepath,
                    normalize=True,
                    channels=1,
                    sample_rate=16000
                )
            
            elif tier in ["premium", "enterprise"]:
                # Enhanced optimization for better quality
                return await self.optimize_audio(
                    filepath,
                    normalize=True,
                    channels=1,
                    sample_rate=44100,
                    target_format=AudioFormat.WAV
                )
                
        except Exception as e:
            raise Exception(f"Failed to prepare audio: {str(e)}")
    
    async def cleanup_audio_files(self, meeting_id: UUID):
        """
        Clean up audio files after processing
        """
        try:
            # Find all files for this meeting
            for filename in os.listdir(self.upload_dir):
                if str(meeting_id) in filename:
                    filepath = os.path.join(self.upload_dir, filename)
                    os.remove(filepath)
                    
        except Exception as e:
            raise Exception(f"Failed to cleanup audio files: {str(e)}")
    
    async def split_audio_for_streaming(
        self,
        filepath: str,
        chunk_duration: float = 0.5
    ) -> str:
        """
        Split audio file into chunks for streaming
        Returns generator of audio chunks
        """
        try:
            audio = AudioSegment.from_file(filepath)
            chunk_length = int(chunk_duration * 1000)  # Convert to milliseconds
            
            for i in range(0, len(audio), chunk_length):
                chunk = audio[i:i + chunk_length]
                
                # Create temporary chunk file
                chunk_path = f"{filepath}_chunk_{i}.wav"
                chunk.export(chunk_path, format="wav")
                
                yield chunk_path
                
                # Clean up chunk file
                os.remove(chunk_path)
                
        except Exception as e:
            raise Exception(f"Failed to split audio: {str(e)}")
    
    @staticmethod
    async def validate_audio_format(filename: str) -> bool:
        """
        Validate if file has supported audio format
        """
        allowed_extensions = [AudioFormat.MP3, AudioFormat.WAV, AudioFormat.M4A]
        return filename.lower().split(".")[-1] in allowed_extensions
