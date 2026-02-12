from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from app.database import get_db
from app.models import User
from app.security import SECRET_KEY, ALGORITHM

oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(
        token: str = Depends(oauth2),
        db = Depends(get_db)
):
    payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    user_id = payload.get("sub")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(401)
    return user 