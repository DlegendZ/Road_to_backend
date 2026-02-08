from sqlalchemy.orm import Session
from app import schemas, models

class UserRepository:
    
    def get_by_id(self, db: Session, user_id: int):
        return db.query(models.User).filter(models.User.id == user_id).first()
    
    def get_by_email(self, db: Session, email: str):
        return db.query(models.User).filter(models.User.email == email).first()
    
    def create(self, db: Session, user: models.User):
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    def delete(self, db: Session, user: models.User):
        db.delete(user)
        db.commit()