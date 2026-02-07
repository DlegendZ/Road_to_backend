from fastapi import FastAPI, Depends, HTTPException
from app import schemas, database, crud, models
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally :
        db.close()
    

@app.post("/users", response_model= schemas.user_response)
def create_user(user:schemas.user_create, db:Session = Depends(get_db)):
    return crud.user_create(db, user)

@app.get("/users", response_model=list[schemas.user_response])
def read_user(db:Session = Depends(get_db)):
    return crud.read_user(db)

@app.get("/users/{user_id}", response_model=schemas.user_response)
def read_user_by_id(user_id:int, db:Session = Depends(get_db)):
    user = crud.read_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user

@app.put("/users/{user_id}", response_model=schemas.user_response)
def update_user(user_id:int, user:schemas.user_update, db:Session = Depends(get_db)):
    user = crud.update_user(db, user_id, user)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user

@app.delete("/users/{user_id}", response_model=schemas.user_response)
def delete_user(user_id:int, db:Session = Depends(get_db)):
    user = crud.delete_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user
