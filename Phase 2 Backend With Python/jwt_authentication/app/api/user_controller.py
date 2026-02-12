from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.models import User

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return user
