import { Socket } from 'socket.io'
import * as SocketIO from 'socket.io'

interface Status {
  playing: boolean
  timestamp: number
  videoPosition: number
}

interface JoinRequest {
  room: number
}

interface SyncRequest {
  timestamp: number
}

interface UpdateRequest {
  playing: boolean
  timestamp: number
  videoPosition: number
}

const defaultStatus: Status = {
  playing: false,
  timestamp: 0,
  videoPosition: 0,
}

let db: Record<string, Status> = {}

function sync(socket: Socket, req: SyncRequest) {
  const now = new Date().getTime()
  const timestamps = { clientTimestamp: req.timestamp, serverTimestamp: now }
  socket.emit('sync', timestamps)
}

function status(socket: Socket, broadcast: boolean) {
  const statusObj = { ...defaultStatus, ...db[getRoom(socket)] }
  const { playing, timestamp, videoPosition } = statusObj
  const now = new Date().getTime()
  const actualPos = playing ? videoPosition + (now - timestamp) : videoPosition
  const destination = broadcast ? socket.broadcast.to(getRoom(socket)) : socket
  destination.emit('status', {
    playing,
    timestamp: now,
    videoPosition: actualPos,
  })
}

function update(socket: Socket, request: UpdateRequest) {
  db[getRoom(socket)] = { ...defaultStatus, ...request }
  status(socket, true)
}

function getRoom(socket: Socket) {
  return Object.keys(socket.rooms)[0]
}

function init(socket: Socket, { room }: JoinRequest) {
  if (room && Object.keys(socket.rooms).length <= 1) {
    socket.join(room.toString())
    socket.on('status', () => status(socket, false))
    socket.on('update', (req) => update(socket, req))
  }
}

SocketIO(9595).on('connection', (socket) => {
  socket.on('join', (req) => init(socket, req))
  socket.on('sync', (req) => sync(socket, req))
})
