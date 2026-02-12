from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "SECRET"
ALGORITHM = "HS256"

ACCESS_TOKEN_MIN = 15
REFRESH_TOKEN_DAYS = 7

pwd = CryptContext(schemes=["bcrypt"])

def hash_password(password: str) -> str:
    return pwd.hash(password)

def verify_password(plain, hashed) -> bool:
    return pwd.verify(plain, hashed)

def create_access_token(user_id: int):
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_MIN)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_tokens(user_id: int):
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_DAYS)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)