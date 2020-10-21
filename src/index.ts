import * as SocketIO from 'socket.io'
import initConnection from './socket'

SocketIO(9595).on('connection', initConnection)