from app import models, schemas
from sqlalchemy.orm import Session

def user_create(db:Session, user:schemas.user_create) :
    new_user = models.User(
        name = user.name,
        email = user.email
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def read_user(db:Session) :
    return db.query(models.User).all()

def read_user_by_id(db:Session, user_id:int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def update_user(db:Session, user_id:int, user:schemas.user_update):
    selected_user = db.query(models.User).filter(models.User.id == user_id).first()
    selected_user.name = user.name
    selected_user.email = user.email

    db.commit()
    db.refresh(selected_user)
    return selected_user

def delete_user(db:Session, user_id:int):
    selected_user = db.query(models.User).first()

    deleted_user = {
        "id": selected_user.id,
        "name": selected_user.name,
        "email": selected_user.email
    }

    db.delete(selected_user)
    db.commit()
    return deleted_user