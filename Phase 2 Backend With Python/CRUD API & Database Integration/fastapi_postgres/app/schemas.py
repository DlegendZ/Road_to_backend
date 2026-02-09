from pydantic import BaseModel, Field, EmailStr

class user_base(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    email: EmailStr

class user_create(user_base):
    password: str = Field(min_length=8)

class user_login(BaseModel):
    email: EmailStr
    password: str

class user_update(BaseModel):
    name: str|None = Field(default=None, min_length=3, max_length=50)
    email: EmailStr|None = None

class user_response(user_base):
    id: int

    class config:
        from_attributes = True

class token(BaseModel):
    access_token: str
    token_type: str = "bearer"