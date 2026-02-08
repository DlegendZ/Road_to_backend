from app.services.user_service import UserService
from fastapi import APIRouter, Depends
from app.schemas import user_create, user_response
from app.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["Users"])
service = UserService()

@router.post("/", response_model=user_response, status_code=201)
def create_user(user_data: user_create, db: Session = Depends(get_db)):
    return service.create_user(db, user_data)

@router.get("/{user_id}", response_model=user_response, status_code=200)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return service.get_user(db, user_id)

@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return service.delete_user(db, user_id)
