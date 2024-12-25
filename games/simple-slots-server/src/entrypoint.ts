import { createServer } from "http";
import { Server } from "socket.io";
import {ServerEventName , ClientEventName, GameWsApiSpinParser, GameBidFieldsNames, GameWsApiFieldsNames } from "@suka-game/simple-slots-shared/src/entrypoint";
import { Game, IoServer } from "./Game/Game";

// при запуске надо разфризить все замороженные ранее балансы


const httpServer = createServer();
const io: IoServer = new Server(httpServer, {
  path: '/ggg/simple-slots'
})

const game = new Game(io)

const getUser = async (token: string) => {
    return {
        id: Number(token).toString()
    }
}

const toHex = (v: bigint) => `0x${v.toString(16)}`

io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    socket.data.user = await getUser(token)
    socket.join(socket.data.user.id)

    next()
}).on("connection", async (socket) => {
    const userId = socket.data.user.id

    const state = game.getState(userId)

    if (state) {
        socket.emit(ServerEventName.state, 
            {
                [GameWsApiFieldsNames.bid]: {
                    [GameBidFieldsNames.amount]: toHex(state[GameWsApiFieldsNames.bid][GameBidFieldsNames.amount]),
                    [GameBidFieldsNames.balanceId]: toHex(state[GameWsApiFieldsNames.bid][GameBidFieldsNames.balanceId]),
                    [GameBidFieldsNames.currencyAddress]: state[GameWsApiFieldsNames.bid][GameBidFieldsNames.currencyAddress],
                    [GameBidFieldsNames.currencyNetwork]: state[GameWsApiFieldsNames.bid][GameBidFieldsNames.currencyNetwork],
                },
                [GameWsApiFieldsNames.result]: state[GameWsApiFieldsNames.result],
                [GameWsApiFieldsNames.status]: state[GameWsApiFieldsNames.status],
                [GameWsApiFieldsNames.winAmount]: toHex(state[GameWsApiFieldsNames.winAmount]),
                [GameWsApiFieldsNames.coefficient]: state[GameWsApiFieldsNames.coefficient],
            }
        )
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

httpServer.listen(3000, '127.0.0.1', () => {
    console.log('STARTED')
})
