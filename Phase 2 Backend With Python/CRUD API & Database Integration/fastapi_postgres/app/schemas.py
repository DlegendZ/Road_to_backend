from pydantic import BaseModel

class user_create(BaseModel):
    name:str
    email:str

class user_update(BaseModel):
    name:str|None = None
    email:str|None = None

class user_response(user_create):
    id:int

    class config:
        from_attributes = True
