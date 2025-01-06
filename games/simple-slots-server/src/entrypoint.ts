
import {ServerEventName , ClientEventName, GameWsApiSpinParser } from "@suka-game/simple-slots-shared/src/entrypoint";
import { Game } from "./Game/Game";
import { httpServer, io } from "./server";

// при запуске надо разфризить все замороженные ранее балансы

const game = new Game(io)

io.on("connection", async (socket) => {
    const userId = socket.data.user.id

    socket.emit(ServerEventName.options, game.gameOptionsForWs)

    const state = game.getState(userId)

    if (state) {
        socket.emit(ServerEventName.state, game.getStateForWs(state))
    }

    console.log('socket.data.user.id', userId)

    socket.on(
        ClientEventName.spin,
        async (payload) => {
            try {
                console.log(payload)
                const data = GameWsApiSpinParser.parse(payload)

                await game.spin(userId, data)
            } catch (error) {
                console.log(error)
            }
        },
    )
});


const PORT = 3000
const HOSTNAME = '0.0.0.0'

httpServer.listen(PORT, HOSTNAME, () => {
    console.info(`STARTED ${HOSTNAME}:${PORT}`)
});
