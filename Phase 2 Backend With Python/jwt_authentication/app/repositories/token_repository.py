from sqlalchemy.orm import Session
from app.models import RefreshTokens

class TokenRepository:
    def save(self, db: Session, token: RefreshTokens):
        db.add(token)
        db.commit()

    def get(self, db: Session, token: str):
        return db.query(RefreshTokens).filter(RefreshTokens.token == token).first()
    
    def delete(self, db: Session, token: RefreshTokens):
        db.delete(token)
        db.commit()