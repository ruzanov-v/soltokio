import { createServer } from "http";
import { Server } from "socket.io";
import { publisher } from "./userAuthService";
import { BalanceWsApiServerToClient } from "@suka-back/balance-service-interface/src/wsApi";
import { getSocketIoUserAuthMiddleware } from "@suka-back/user-auth-service-middleware";

export type IoServer = Server<
    never,
    BalanceWsApiServerToClient
>

export const httpServer = createServer();

export const io: IoServer = new Server(httpServer, {path: '/ggg/user-state'})    
    .use(getSocketIoUserAuthMiddleware(publisher))
    .use((socket, next) => {
        socket.join(socket.data.user.id)

        next()
    })
