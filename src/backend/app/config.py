import os
from dotenv import load_dotenv
from pydantic import BaseSettings, Field

load_dotenv()
url_banco = os.environ.get("URL_BANCO")
class Settings(BaseSettings):
    
    db_url = Field(url_banco)


settings = Settings()