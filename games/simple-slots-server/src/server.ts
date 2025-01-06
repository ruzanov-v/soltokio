import { ClientToServerEvents, ServerToClientEvents } from "@suka-game/simple-slots-shared/src/types";
import { createServer } from "http";
import { Server } from "socket.io";
import { publisher } from "./Game/userAuthService";
import { getSocketIoUserAuthMiddleware } from "@suka-back/user-auth-service-middleware";

export type IoServer = Server<
    ClientToServerEvents,
    ServerToClientEvents
>

export const httpServer = createServer();

export const io: IoServer = new Server(httpServer, {
  path: '/ggg/simple-slots'
})
    .use(getSocketIoUserAuthMiddleware(publisher))
    .use((socket, next) => {
        console.log('socket.data',socket.data)
        socket.join(socket.data.user.id)

        next()
    })
