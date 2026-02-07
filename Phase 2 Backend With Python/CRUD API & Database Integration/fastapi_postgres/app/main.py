from app.models import Base
from app.database import engine, SessionLocal
from fastapi import FastAPI, Depends
from app import schemas, crud
from sqlalchemy.orm import Session

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db() : 
    db = SessionLocal()
    try :
        yield db
    finally :
        db.close()

@app.post("/users", response_model=schemas.UserResponse)
def create_user(user:schemas.UserCreate, db:Session = Depends(get_db)):
    return crud.create_user(db, user)

@app.get("/users", response_model=list[schemas.UserResponse])
def read_users(db:Session = Depends(get_db)):
    return crud.get_users(db)