from sqlalchemy import Boolean, Column, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    google_calendar_token = Column(String, nullable=True)
    
    # Relationships
    meetings = relationship("Meeting", back_populates="user")
    tasks = relationship("Task", back_populates="user")
