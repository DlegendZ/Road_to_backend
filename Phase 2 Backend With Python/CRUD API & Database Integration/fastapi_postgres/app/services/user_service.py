from repositories.user_repository import UserRepository
from sqlalchemy.orm import Session
from app.schemas import user_create
from fastapi import HTTPException
from models import User

class UserService:
    def __init__(self):
        self.repo = UserRepository()

    def create_user(self, db: Session, user_data: user_create):
        if self.repo.get_by_email(db, user_data.email):
            raise HTTPException(
                status_code=409,
                detail="Email already exists"
            )

        user = User(
            name = user_data.name,
            email = user_data.email
        )

        return self.repo.create(db, user)
    
    def get_user(self, db:Session, user_id: int):
        user = self.repo.get_by_id(db, user_id)
        if not user:
            raise HTTPException(404, "User not found")
        return user
    
    def delete_user(self, db: Session, user_id: int):
        user = self.repo.get_by_id(db, user_id)

        if not user:
            raise HTTPException(404, "User not found")
        
        self.repo.delete(db, user)
        