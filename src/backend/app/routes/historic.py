from fastapi import APIRouter, Depends, Body
from model import HistoricSchema
from db import database, Historic
from .jwt_bearer import jwtBearer

app = APIRouter()


@app.get("/historic",dependencies=[Depends(jwtBearer())])
async def read_Historic():
    if not database.is_connected:
        await database.connect()

    return await Historic.objects.all()


@app.post("/historic",dependencies=[Depends(jwtBearer())])
async def create_Historic(hist: HistoricSchema = Body(default=None)):
    if not database.is_connected:
        await database.connect()
    await Historic.objects.create(Id_P=hist.Id_P,
                                  Name=hist.Name,
                                  Name_P=hist.Name_P,
                                  amount=hist.amount,
                                  data = hist.data)
    return {"success": "Successfully created"}


@app.put("/historic",dependencies=[Depends(jwtBearer())])
async def update_Historic(new_Hist: HistoricSchema):
    if not database.is_connected:
        await database.connect()
    return await Historic.objects.update_or_create(id=new_Hist.id,
                                               Id_P=new_Hist.Id_P,
                                               Name=new_Hist.Name,
                                               Name_P=new_Hist.Name_P,
                                               amount=new_Hist.amount,
                                               data=new_Hist.data)


@app.delete("/historic/{Id}",dependencies=[Depends(jwtBearer())])
async def delete_Historic(Id: int):
    if not database.is_connected:
        await database.connect()
    return await Historic.objects.delete(id=Id)