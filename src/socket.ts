import { stat } from 'fs'
import { Socket } from 'socket.io'
import { db } from './status'

// TODO: swap this const with Object.keys(socket.rooms)[0]
const ROOM = 'room'

interface SyncRequest {
  timetamp: number
}

interface Action {
  timestamp: number
  videoPosition: number
}

function sync(socket: Socket, req: SyncRequest) {
  const now = new Date().getTime()
  const timestamps = { clientTimestamp: req.timetamp, serverTimestamp: now }
  socket.emit('sync', timestamps)
}

function status(socket: Socket, broadcast: boolean) {
  const { isPlaying, timestamp, videoPosition } = db[ROOM]
  const now = new Date().getTime()
  const actualPos = isPlaying ? videoPosition + (now - timestamp) : videoPosition
  // TODO: emit to rest of room iff broadcast
  socket.emit('status', { isPlaying, timestamp: now, videoPosition: actualPos })
}

function setPlaying(socket: Socket, action: Action, isPlaying: boolean) {
  const { timestamp, videoPosition } = action
  db[ROOM] = { isPlaying, timestamp, videoPosition }
  status(socket, true)
}

function seek(socket: Socket, action: Action) {
  const { timestamp, videoPosition } = action
  const { isPlaying } = db[ROOM]
  db[ROOM] = { isPlaying, timestamp, videoPosition }
  status(socket, true)
}

function reset(socket: Socket) {
  const now = new Date().getTime()
  db[ROOM] = { isPlaying: false, timestamp: now, videoPosition: 0 }
  status(socket, true)
}

export default function initConnection(socket: Socket) {
  // TODO: room join handler
  socket.on('sync', req => sync(socket, req))
  socket.on('status', () => status(socket, false))
  socket.on('pause', action => setPlaying(socket, action, false))
  socket.on('play', action => setPlaying(socket, action, true))
  socket.on('seek', action => seek(socket, action))
  socket.on('reset', reset)
}
