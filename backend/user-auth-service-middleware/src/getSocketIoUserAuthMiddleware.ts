import { MessagesTypes, UserAuthRawEvents } from "@suka-back/user-auth-service-interfaces/src/entrypoint"
import { Publisher } from "@sukacripta/server-bridge"
import { ExtendedError, Socket } from "socket.io"

export const getSocketIoUserAuthMiddleware = (publisher: Publisher<UserAuthRawEvents>) => (
    async (socket: Socket, next: (err?: ExtendedError) => void) => {
        const token = socket.handshake.auth.token
        const user = await publisher.send({
            type: MessagesTypes.getUserByToken,
            token,
        })

        if (!user || !user.id) {
            const err: ExtendedError = new Error("not authorized")
            err.data = { content: "Please retry later" }

            return next(err)
        }

        socket.data.user = user

        next()
    }
)
