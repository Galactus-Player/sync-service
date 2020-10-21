// Swap this out with an authenticated, per-room, in-mem db
interface Status {
  isPlaying: boolean,
  timestamp: number,
  videoPosition: number
}

// Only defined room is "room" for now
export let db: Record<string, Status> = {
  room: {
    isPlaying: false,
    timestamp: 0,
    videoPosition: 0
  }
}