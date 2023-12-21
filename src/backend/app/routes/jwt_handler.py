import time
import jwt

from decouple import config 

JWT_SECRET = config('secret')
JWT_ALGORITHM = config('algoritmo')

# Função que gera um JWT
def token_response(token:str):
    return {
        "acess token" : token
    }

# Função que assina um JWT
def signJWT():
    payload = {
        "expires" : time.time() + 300 # tempo atual + 5 minutos
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm = JWT_ALGORITHM)
    return token_response(token)

# Função que decodifica um JWT
def decodeJWT(token : str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, algorithm = JWT_ALGORITHM)
        return decode_token if decode_token["expires"] >= time.time() else None
    except:
        return {}