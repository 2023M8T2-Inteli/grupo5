from fastapi import FastAPI
from db import database

from routes.user import app as user_router
from routes.historic import app as historic_router
from routes.warehouse import app as warehouse_router
from fastapi import FastAPI, Request, Body, HTTPException
from pydantic import BaseModel
import socketio
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from fastapi.responses import FileResponse
from gtts import gTTS
from dotenv import load_dotenv
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import uuid
import os
import re

load_dotenv()

#SERVER_URL = "http://localhost:5000"
SERVER_URL = "http://websocket:5000"

sio = socketio.Client()
sio.connect(SERVER_URL)


app = FastAPI()

class DataModel(BaseModel):
    dados: str

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(historic_router)
app.include_router(warehouse_router)

@app.get('/')
def home():
    return 'Bem-vindo ao FastAPI!'

@app.on_event("startup")
async def startup():
    if not database.is_connected:
        await database.connect()
    # create a dummy entry


@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()

def connect_gpt(data: str):

    reader = PdfReader('./data/inventario_simulado.pdf')
    
    if reader is not None:
        raw_text = ''
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                raw_text += text
        
        text_splitter = CharacterTextSplitter(        
            separator = "\n",
            chunk_size = 1000,
            chunk_overlap  = 200,
            length_function = len,
        )
        chunks = text_splitter.split_text(raw_text)
      
        embeddings = OpenAIEmbeddings()
        knowledge_base = FAISS.from_texts(chunks, embeddings)
        
        chain = load_qa_chain(OpenAI(), chain_type="stuff")
        query = f"Você deve funcionar como um assistente de almoxarifado. Toda vez for feita uma pergunta a respeito a disponibilidade, descrição ou quantidade de uma peça, deve ser respondido sem a localização. Me diga a localização da peça SOMENTE quando solicitarmos essa informação, e diga que está indo, no formato [x, y] obrigatoriamente. Perguntas que não são a respeito do almoxarifado não devem ser respondidas. Pergunta: {data}"
        docs = knowledge_base.similarity_search(query)
        response = chain.run(input_documents=docs, question=query)
    
    pattern = re.compile(r'\[x\s*:\s*(?P<x>-?\d*(?:\.\d+)?),\s*y\s*:\s*(?P<y>-?\d*(?:\.\d+)?)\]')
    match = pattern.search(response)
    if match:
        x = match.group("x")
        y = match.group("y")
        coordinates = [x, y]
        sio.emit('enqueue', str(coordinates))

    return response

@app.post('/enviar_dados')
def receber_dados(data: DataModel):
    resposta = connect_gpt(data.dados)
    return resposta

@app.post("/tts/")
async def text_to_speech(text: str = Body(...), lang: str = Body(default="pt-br")):
    try:
        tts = gTTS(text=text, lang=lang)
        unique_file_name = f"speech_{uuid.uuid4()}.mp3"  # Gerar um nome de arquivo único
        file_path = f"../frontend/public/{unique_file_name}"
        tts.save(file_path)
        return {"audioUrl": f"/{unique_file_name}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.delete("/delete_audios")
async def delete_audios():
    try:
        directory = '../frontend/public/'
        files = os.listdir(directory)
        for file in files:
            if file.startswith("speech_") and file.endswith(".mp3"):
                os.remove(os.path.join(directory, file))
        return {"message": "Áudios excluídos com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)