import z from 'zod'
import { GameBidParser } from './ClientToServerEvents'

export enum ServerEventName {
    state = '0'
}

export enum GameStatus {
    /** Пустое значение, означает что клиент еще не получил данные с бэка */
    none = 0,
    /** Начальный статус, только запустились */
    wait = 1,
    /** Ставка сделана, ожидается результат */
    spin = 2,
    /** Результат игры готов */
    finish = 3
}

export enum GameWsApiFieldsNames {
    bid = '0',
    result = '1',
    status = '2',
    winAmount = '3',
    coefficient = '4',
}

export const GameWsApiStateResultParser = z.tuple([z.number(), z.number(), z.number(), z.number()]);
export type GameWsApiStateResult = z.infer<typeof GameWsApiStateResultParser>
export type GameWsApiStateResultRaw = z.input<typeof GameWsApiStateResultParser>

export const GameWsApiStateParser = z.object({
    [GameWsApiFieldsNames.bid]: GameBidParser,
    [GameWsApiFieldsNames.result]: GameWsApiStateResultParser,
    [GameWsApiFieldsNames.status]: z.nativeEnum(GameStatus),
    [GameWsApiFieldsNames.winAmount]: z.string().transform((v) => BigInt(v)),
    [GameWsApiFieldsNames.coefficient]: z.number(),
})

export type GameWsApiState = z.infer<typeof GameWsApiStateParser>
export type GameWsApiStateRow = z.input<typeof GameWsApiStateParser>

export type ServerToClientEvents = {
    [ServerEventName.state]: (p: GameWsApiStateRow) => void
}
