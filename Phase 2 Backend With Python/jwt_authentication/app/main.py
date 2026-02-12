from fastapi import FastAPI
from app.api.auth_controller import router as auth
from app.api.user_controller import router as users

app = FastAPI()
app.include_router(auth)
app.include_router(users)
