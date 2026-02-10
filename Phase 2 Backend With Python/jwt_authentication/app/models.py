from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)

    refresh_tokens = relationship("RefreshTokens", back_populates="users", cascade="all, delete")

class RefreshTokens(Base):
    __tablename__ = "refresh_tokens"
    user_id = Column(Integer, ForeignKey("users.id"))
    token = Column(String, unique=True)
    expires_at = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())

    users = relationship("User", back_populates="refresh_tokens")