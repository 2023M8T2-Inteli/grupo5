from .jwt_handler import signJWT
from fastapi import APIRouter, Body
from model import UserSchema, LoginSchema
from db import database, User

app = APIRouter()


@app.get("/users")
async def read_users():
    if not database.is_connected:
        await database.connect()

    return await User.objects.all()


@app.post("/users")
async def create_User(user: UserSchema = Body(default=None)):
    if not database.is_connected:
        await database.connect()

    await User.objects.create(Name=user.Name,
                              Last_Name=user.Last_Name,
                              Password=user.Password,
                              Document=user.Document)
    return {"success": "Successfully created"}


async def check_user(data: LoginSchema):
    if not database.is_connected:
        await database.connect()

    users = await User.objects.all()
    print(users)
    for user in users:
        if (user.Name == data.Name) and (user.Password == data.Password):
            print("entrou")
            return True
    return False


@app.post("/login")
async def user_login(user: LoginSchema = Body(default=None)):
    if await check_user(user):
        return signJWT()
    return {"error": "Dados invalidos"}


@app.put("/users")
async def update_User(new_User: UserSchema):
    if not database.is_connected:
        await database.connect()
    return await User.objects.update_or_create(Id=new_User.id,
                                               Name=new_User.Name,
                                               Last_Name=new_User.Last_Name,
                                               Password=new_User.Password,
                                               Document=new_User.Document)


@app.delete("/users/{Id}")
async def delete_User(Id: int):
    if not database.is_connected:
        await database.connect()
    return await User.objects.delete(Id=Id)
