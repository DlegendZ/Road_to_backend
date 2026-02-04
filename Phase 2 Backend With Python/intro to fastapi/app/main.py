from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root() :
    return {"Status": "FastAPI is running"}