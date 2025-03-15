from fastapi import APIRouter
from app.api.v1.endpoints import auth, meetings, transcription

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(meetings.router, prefix="/meetings", tags=["Meetings"])
api_router.include_router(transcription.router, prefix="/transcription", tags=["Transcription"])
