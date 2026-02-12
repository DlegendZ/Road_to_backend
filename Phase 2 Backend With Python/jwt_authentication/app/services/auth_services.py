from fastapi import HTTPException, status
from datetime import datetime
from app.models import User, RefreshTokens
from app.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_tokens
)
from app.repositories.user_repository import UserRepository
from app.repositories.token_repository import TokenRepository

class AuthService:
    def __init__(self):
        self.users = UserRepository()
        self.tokens - TokenRepository()

    def register(self, db, data):
        if self.users.get_by_email(db, data.email):
            raise HTTPException(409, "Email exists")
        
        user = User(
            email= data.email,
            hashed_password=hash_password(data.password)
        )

        return self.users.create(db, user)
    
    def login(self, db, data):
        user = self.users.get_by_email(db, data.email)
        if not user or not verify_password(
            data.password, user.hashed_password
        ):
            raise HTTPException(status.HTTP_401_UNAUTHORIZED)
        
        access = create_access_token(user.id)
        refresh = create_refresh_tokens(user.id)

        self.tokens.save(
            db, 
            RefreshTokens(
                user_id= user.id,
                token=refresh,
                expires_at=datetime.utcnow()
            )
        )

        return access, refresh

    def refresh(self, db, token: str):
        stored = self.tokens.get(db, token)
        if not stored:
            raise HTTPException(401, "Invalid refresh token")
        
        access = create_access_token(stored.user_id)
        return access