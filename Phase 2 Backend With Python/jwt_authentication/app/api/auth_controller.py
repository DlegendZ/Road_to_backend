from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import UserCreate, UserLogin, Token
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])
service = AuthService()

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    return service.register(db, data)

@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    access, refresh = service.login(db, data)
    return {
        "access_token": access,
        "refresh_token": refresh
    }

@router.post("/refresh")
def refresh(token: str, db: Session = Depends(get_db)):
    return {"access_token": service.refresh(db, token)}
