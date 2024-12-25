import { type GameWsApiState, GameStatus, GameBidFieldsNames, GameWsApiFieldsNames, GameWsApiStateResultRaw } from "@suka-game/simple-slots-shared/src/entrypoint"
import { Server } from "socket.io"
import { ClientToServerEvents, GameWsApiSpin, ServerEventName, ServerToClientEvents } from "@suka-game/simple-slots-shared/src/entrypoint"
import {Publisher} from '@sukacripta/server-bridge/src/Publisher'
import {AmqpConnection} from '@sukacripta/server-bridge/src/AmqpConnection'
import {BalanceChangeType, BalanceEventFieldsNames} from '@suka-back/balance-service-interface/src/entrypoint'
import { GameResult } from "./GameResult"

const amqp = new AmqpConnection()
await amqp.connect('')

const publisher = new Publisher({
    channel: await amqp.createChannel(),
    queueName: 'game-balance'
})

await publisher.init()

type UserId = string
export type IoServer = Server<
    ClientToServerEvents,
    ServerToClientEvents
>

class BigintMath {
    static abs(v: bigint): bigint {
        return v > 0n ? v : -v
    }

    static toHex(v: bigint): string {
        return `${v < 0n ? '-' : ''}0x${BigintMath.abs(v).toString(16)}`
    }
}

export class Game {
    #io: IoServer
    #gameStates = new Map<UserId, GameWsApiState>()

    constructor(io: IoServer) {
        this.#io = io
    }

    getState(userId: UserId): Readonly<GameWsApiState | undefined> {
        const state = this.#gameStates.get(userId)

        return state;
    }

    #setState(userId: UserId, newState: GameWsApiState) {
        this.#gameStates.set(userId, newState)

        this.#io.to(userId).emit(ServerEventName.state, {
            [GameWsApiFieldsNames.bid]: {
                [GameBidFieldsNames.amount]: BigintMath.toHex(newState[GameWsApiFieldsNames.bid][GameBidFieldsNames.amount]),
                [GameBidFieldsNames.balanceId]: BigintMath.toHex(newState[GameWsApiFieldsNames.bid][GameBidFieldsNames.balanceId]),
                [GameBidFieldsNames.currencyAddress]: newState[GameWsApiFieldsNames.bid][GameBidFieldsNames.currencyAddress],
                [GameBidFieldsNames.currencyNetwork]: newState[GameWsApiFieldsNames.bid][GameBidFieldsNames.currencyNetwork],
            },
            [GameWsApiFieldsNames.result]: newState[GameWsApiFieldsNames.result],
            [GameWsApiFieldsNames.status]: newState[GameWsApiFieldsNames.status],
            [GameWsApiFieldsNames.winAmount]: BigintMath.toHex(newState[GameWsApiFieldsNames.winAmount]),
            [GameWsApiFieldsNames.coefficient]: newState[GameWsApiFieldsNames.coefficient],
        })
    }

    async spin(userId: UserId, payload: GameWsApiSpin) {
        console.log('spin')
        
        const currentState = this.getState(userId)

        if (currentState && currentState[GameWsApiFieldsNames.status] !== GameStatus.wait && currentState[GameWsApiFieldsNames.status] !== GameStatus.finish) {
            return
        }

        await publisher.send(
            {
                userId,
                [BalanceEventFieldsNames.changeType]: BalanceChangeType.freeze,
                [BalanceEventFieldsNames.balanceId]: BigintMath.toHex(payload[GameBidFieldsNames.balanceId]),
                [BalanceEventFieldsNames.freezeAmount]: BigintMath.toHex(payload[GameBidFieldsNames.amount]),
                [BalanceEventFieldsNames.freezeCause]: 'simple-slots',
                [BalanceEventFieldsNames.currencyAddress]: payload[GameBidFieldsNames.currencyAddress],
                [BalanceEventFieldsNames.currencyNetwork]: payload[GameBidFieldsNames.currencyNetwork],
            },
        )

        this.#setState(userId, {
            [GameWsApiFieldsNames.bid]: payload,
            [GameWsApiFieldsNames.winAmount]: 0n,
            [GameWsApiFieldsNames.status]: GameStatus.spin,
            [GameWsApiFieldsNames.result]: [0, 0, 0, 0],
            [GameWsApiFieldsNames.coefficient]: 0,
        })

        const gameResult = new GameResult()
        
        setTimeout(async () => {
            const win = BigInt(gameResult.coefficient) * payload[GameBidFieldsNames.amount]

            console.log(gameResult)
            if (gameResult.coefficient === 0) {
                await publisher.send(
                    {
                        userId,
                        [BalanceEventFieldsNames.changeType]: BalanceChangeType.loose,
                        [BalanceEventFieldsNames.balanceId]: BigintMath.toHex(payload[GameBidFieldsNames.balanceId]),
                        [BalanceEventFieldsNames.looseAmount]: BigintMath.toHex(payload[GameBidFieldsNames.amount]),
                        [BalanceEventFieldsNames.currencyAddress]: payload[GameBidFieldsNames.currencyAddress],
                        [BalanceEventFieldsNames.currencyNetwork]: payload[GameBidFieldsNames.currencyNetwork],
                    },
                )
            } else {
                await publisher.send(
                    {
                        userId,
                        [BalanceEventFieldsNames.changeType]: BalanceChangeType.win,
                        [BalanceEventFieldsNames.balanceId]: BigintMath.toHex(payload[GameBidFieldsNames.balanceId]),
                        [BalanceEventFieldsNames.winAmount]: BigintMath.toHex(win),
                        [BalanceEventFieldsNames.currencyAddress]: payload[GameBidFieldsNames.currencyAddress],
                        [BalanceEventFieldsNames.currencyNetwork]: payload[GameBidFieldsNames.currencyNetwork],
                    },
                )
            }

            this.#setState(userId, {
                [GameWsApiFieldsNames.bid]: payload,
                [GameWsApiFieldsNames.winAmount]: win,
                [GameWsApiFieldsNames.status]: GameStatus.finish,
                [GameWsApiFieldsNames.result]: gameResult.result,
                [GameWsApiFieldsNames.coefficient]: gameResult.coefficient,
            })
        }, 1000)
    }
}