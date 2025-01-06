import { GameStatus, GameWsApiFieldsNames, GameWsApiOptionsRaw, GameWsApiStateRow } from "@suka-game/simple-slots-shared/src/entrypoint"
import delay from 'delay'
import { GameWsApiSpin, ServerEventName } from "@suka-game/simple-slots-shared/src/entrypoint"
import {BalanceChangeType, BalanceEventFieldsNames} from '@suka-back/balance-service-interface/src/entrypoint'
import {BMath, FixedNumber, ZERO} from '@sukacripta/math-bigint'
import { GameResult } from "./GameResult"
import { publisher } from "./balanceService"
import { IoServer } from "../server"

type UserId = string

type GameState = {
    rId: string,
    bid: {
        amount: FixedNumber,
        balanceId: bigint,
    },
    result: number[],
    status: GameStatus,
    winAmount: FixedNumber,
    coefficient: FixedNumber,
}

export class Game {
    #io: IoServer
    #gameStates = new Map<UserId, GameState>()
    #gameOptions = {
        variantsCount: 4,
        reelsCount: 4,
    }

    readonly gameOptionsForWs: GameWsApiOptionsRaw

    constructor(io: IoServer) {
        this.#io = io
        this.gameOptionsForWs = Object.freeze({
            [GameWsApiFieldsNames.variantsCount]: this.#gameOptions.variantsCount,
            [GameWsApiFieldsNames.reelsCount]: this.#gameOptions.reelsCount,
        })
    }

    getState(userId: UserId): Readonly<GameState | undefined> {
        const state = this.#gameStates.get(userId)

        return state;
    }

    getStateForWs(newState: GameState): GameWsApiStateRow {
        return {
            [GameWsApiFieldsNames.rId]: newState.rId,
            [GameWsApiFieldsNames.bid]: {
                [GameWsApiFieldsNames.rId]: newState.rId,
                [GameWsApiFieldsNames.bidAmount]: newState.bid.amount.toSafeString(),
                [GameWsApiFieldsNames.balanceId]: BMath.toHex(newState.bid.balanceId),
            },
            [GameWsApiFieldsNames.result]: newState.result,
            [GameWsApiFieldsNames.status]: newState.status,
            [GameWsApiFieldsNames.winAmount]: newState.winAmount.toSafeString(),
            [GameWsApiFieldsNames.coefficient]: newState.coefficient.toSafeString(),
        }
    }

    #setState(userId: UserId, newState: GameState) {
        this.#gameStates.set(userId, newState)

        this.#io.to(userId).emit(ServerEventName.state, this.getStateForWs(newState))
    }

    async #freezeBid(userId: UserId, payload: GameWsApiSpin) {
        await publisher.send(
            {
                userId,
                [BalanceEventFieldsNames.type]: BalanceChangeType.freeze,
                [BalanceEventFieldsNames.balanceId]: BMath.toHex(payload[GameWsApiFieldsNames.balanceId]),
                [BalanceEventFieldsNames.freezeAmount]: payload[GameWsApiFieldsNames.bidAmount].toSafeString(),
                [BalanceEventFieldsNames.freezeCause]: 'simple-slots'
            },
        )
    }

    async spin(userId: UserId, payload: GameWsApiSpin) {
        try {
            console.log('spin')
            
            const currentState = this.getState(userId)
            const bidAmount = payload[GameWsApiFieldsNames.bidAmount]
    
            if (currentState && currentState.status !== GameStatus.wait && currentState.status !== GameStatus.finish) {
                return
            }
    
            await this.#freezeBid(userId, payload)
    
            this.#setState(userId, {
                rId: payload[GameWsApiFieldsNames.rId],
                bid: {
                    amount: bidAmount,
                    balanceId: payload[GameWsApiFieldsNames.balanceId]
                },
                winAmount: ZERO,
                status: GameStatus.spin,
                result: [0, 0, 0, 0],
                coefficient: ZERO,
            })

            await delay(1)
            
            const gameResult = new GameResult({
                reelsCount: this.#gameOptions.reelsCount,
                variantsCount: this.#gameOptions.variantsCount,
            })

            const win = bidAmount.mul(gameResult.coefficient)

            console.log(gameResult)
            if (gameResult.coefficient.eq(ZERO)) {
                await publisher.send(
                    {
                        userId,
                        [BalanceEventFieldsNames.type]: BalanceChangeType.loose,
                        [BalanceEventFieldsNames.balanceId]: BMath.toHex(payload[GameWsApiFieldsNames.balanceId]),
                        [BalanceEventFieldsNames.looseAmount]: bidAmount.toSafeString(),
                    },
                )
            } else {
                await publisher.send(
                    {
                        userId,
                        [BalanceEventFieldsNames.type]: BalanceChangeType.win,
                        [BalanceEventFieldsNames.balanceId]: BMath.toHex(payload[GameWsApiFieldsNames.balanceId]),
                        [BalanceEventFieldsNames.winAmount]: win.toSafeString(),
                    },
                )
            }

            this.#setState(userId, {
                rId: payload[GameWsApiFieldsNames.rId],
                bid: {
                    amount: bidAmount,
                    balanceId: payload[GameWsApiFieldsNames.balanceId],
                },
                winAmount: win,
                status: GameStatus.finish,
                result: gameResult.result,
                coefficient: gameResult.coefficient,
            })
        } catch (error) {
            console.error(error)
        }
    }
}