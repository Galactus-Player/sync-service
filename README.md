# Galactus Sync Service
## Introduction
This microservice exposes a WebSocket server on port 9595 which allows multiple clients to synchronize the position of their video players.
It does this using the `sync`, `status`, `pause`, `play`, `seek`, and `reset` events. When sending a "sync" or "status" request to the server, it will
respond with an event of the same name. It will also periodically send `status` events to clients to synchonize them with changes performed by other clients.


### Join
The `join` event joins a room with the specified room code.
This event should be called before `status` and `update` events.

Example Request:
```JS
{ code: 1234 }
```


### Sync
The `sync` event responds with a client and server timestamp. This is used to perform an NTP-like timestamp synchronization between the server and clients.

Example Request:
```JS
{ timestamp: 1603253848 }
```

Example Response:
```JS
{ clientTimestamp: 1603253848350, serverTimestamp: 1603253848702 }
```


### Status
The `status` event responds with a server timestamp and associated video position at that timestamp.
If the video is currently playing, clients can get a more accurate video position estimation
by subtracting the server timestamp from the client timestamp and summing this value with the video position.

Example Response:
```JS
{ playing: true, timestamp: 1603253848350, videoPosition: 60120 }
```


### Update
The `update` event takes a play/pause boolean, a video position, and a server timestamp associated with that video position.
Upon calling it, the server will store these values and broadcast them to all other clients in the room.

Example Request:
```JS
{ playing: true, timestamp: 1603253848350, videoPosition: 60120 }
```


## Installation

 1. Install nodejs and npm at https://nodejs.org if you don't already have it
 2. Clone the repository with `git clone https://github.com/galactus-player/sync-service`
 3. Run `npm start` in the root of the cloned repo
