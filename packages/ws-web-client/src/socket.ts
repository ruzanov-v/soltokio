import { io, type Socket } from "socket.io-client";

export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export interface EventsMap {
  [event: string]: any;
}

export const createSocket = <
  ServerToClientEvents extends EventsMap = DefaultEventsMap,
  ClientToServerEvents extends EventsMap = DefaultEventsMap,
>(
  payload: {
    path: string,
    auth?: {token: string}, 
  }
) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
    path: payload.path,
    addTrailingSlash: true,
    closeOnBeforeunload: true,
    rememberUpgrade: false,
    timestampParam: 't',
    timestampRequests: true,
    upgrade: true,
    auth: payload.auth,
    transports: ['websocket']
  })

  return socket
}

