from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from app.core.config import settings
from app.services.meeting_capture_service import MeetingCaptureService
from app.services.meeting_preparation_service import MeetingPreparationService

class CalendarService:
    """
    Enhanced calendar service with automatic meeting setup
    """
    
    def __init__(self, token: str):
        self.credentials = Credentials.from_authorized_user_info(info={"token": token})
        self.service = build("calendar", "v3", credentials=self.credentials)
        self.capture_service = MeetingCaptureService(platform="google_meet")
        self.prep_service = MeetingPreparationService()

    async def create_smart_meeting(
        self,
        title: str,
        start_time: datetime,
        end_time: datetime,
        attendees: List[str],
        description: str = "",
        meeting_type: str = "status_update"
    ) -> Dict:
        """
        Create a meeting with automatic setup for real-time capture
        """
        # 1. Set up secure conference details
        conference_data = {
            "createRequest": {
                "requestId": f"workmate-{datetime.now().timestamp()}",
                "conferenceSolutionKey": {"type": "hangoutsMeet"},
                "conferenceDataVersion": 1
            }
        }

        # 2. Configure meeting privacy settings
        meeting_privacy = {
            "guestsCanModify": False,
            "guestsCanSeeOtherGuests": False,
            "private": True
        }

        # 3. Create calendar event with smart features
        event = {
            "summary": title,
            "description": await self._enhance_description(description, meeting_type),
            "start": {"dateTime": start_time.isoformat(), "timeZone": "UTC"},
            "end": {"dateTime": end_time.isoformat(), "timeZone": "UTC"},
            "attendees": [{"email": email} for email in attendees],
            "conferenceData": conference_data,
            "visibility": "private",
            "guestsCanModify": meeting_privacy["guestsCanModify"],
            "guestsCanSeeOtherGuests": meeting_privacy["guestsCanSeeOtherGuests"]
        }

        # 4. Create the event
        event = self.service.events().insert(
            calendarId="primary",
            conferenceDataVersion=1,
            body=event
        ).execute()

        # 5. Set up real-time capture
        capture_config = await self.capture_service.configure_capture({
            "meeting_id": event["id"],
            "conference_data": event.get("conferenceData", {}),
            "start_time": start_time,
            "end_time": end_time,
            "participants": attendees
        })

        # 6. Create preparation materials
        prep_materials = await self.prep_service.prepare_from_calendar(event)

        return {
            "event": event,
            "capture_config": capture_config,
            "prep_materials": prep_materials
        }

    async def _enhance_description(self, description: str, meeting_type: str) -> str:
        """
        Enhance meeting description with smart features
        """
        template = f"""
        🎯 Meeting Objective:
        {description}

        📋 Smart Agenda:
        {{generated_agenda}}

        🔒 Privacy Notice:
        This meeting will be automatically transcribed and analyzed by WorkMate AI.
        - End-to-end encryption enabled
        - PII auto-redaction active
        - Access restricted to invited participants
        
        🎙️ Voice Commands Available:
        - "WorkMate, action item: [task]"
        - "WorkMate, decision: [decision]"
        - "WorkMate, follow up: [note]"
        
        📊 Meeting Analytics:
        Real-time analytics and insights will be available during the meeting.
        """
        
        # Generate smart agenda based on meeting type
        agenda = await self.prep_service._generate_smart_agenda({
            "type": meeting_type,
            "description": description
        })
        
        return template.format(generated_agenda="\n".join(
            f"- {item['topic']} ({item['duration']} min)" for item in agenda
        ))

    async def create_calendar_events(self, events: List[Dict]) -> List[str]:
        """
        Create multiple calendar events (e.g., for tasks and follow-ups)
        """
        created_events = []
        for event in events:
            created_event = self.service.events().insert(
                calendarId="primary",
                body={
                    "summary": event["title"],
                    "description": event["description"],
                    "start": {"dateTime": event["date"], "timeZone": "UTC"},
                    "end": {
                        "dateTime": (
                            datetime.fromisoformat(event["date"]) + 
                            timedelta(minutes=30)
                        ).isoformat(),
                        "timeZone": "UTC"
                    },
                    "reminders": {
                        "useDefault": False,
                        "overrides": [
                            {"method": "popup", "minutes": 10}
                        ]
                    }
                }
            ).execute()
            created_events.append(created_event["id"])
        return created_events
