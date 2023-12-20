import socketio
import eventlet
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Criando um servidor SocketIO
sio = socketio.Server(cors_allowed_origins='*')

# Evento de conexão
@sio.event
def connect(sid, environ):
    logger.info('Cliente conectado: %s', sid)
    print('Cliente conectado:', sid)

# Evento para lidar com mensagens recebidas
@sio.on('enqueue')
def message(sid, data):
    logger.info('Mensagem recebida de %s: %s', sid, data)
    print(f'Mensagem recebida de {sid}: {data}')
    sio.emit("/enqueue", data)  

# Evento de desconexão
@sio.event
def disconnect(sid):
    logger.info('Cliente desconectado: %s', sid)
    print('Cliente desconectado:', sid)

# Embrulhando com WSGI middleware
app = socketio.WSGIApp(sio)

# Rodar o servidor
if __name__ == '__main__':
    logger.info('Iniciando o servidor SocketIO...')
    print('Iniciando o servidor SocketIO...')
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)