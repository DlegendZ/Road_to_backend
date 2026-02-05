from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root() :
    return {"Status": "FastAPI is running"}

@app.get("/users")
def get_users():
    return {"displayed users"}

@app.get("/users/{user_id}")
def get_user_by_id(user_id: int):
    return { "user_id": user_id}

@app.get("/users-query")
def get_user_query(active: bool, age: int):
    return { "active": active, "age": age}

@app.post("/users")
def create_user(user:dict) :
    return {"created": user}

@app.put("/users/{user_id}")
def update_user(user_id: int, user: dict):
    return {
        "id": user_id,
        "updated": user
    }

@app.delete("/users/{user_id}")
def delete_user(user_id: int) :
    return {"deleted_id": user_id}

