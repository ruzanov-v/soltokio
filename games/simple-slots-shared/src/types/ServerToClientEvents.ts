import z from 'zod'
import { GameBidParser } from './ClientToServerEvents'
import { GameWsApiFieldsNames } from './GameWsApiFieldsNames';
import { FixedNumber } from '@sukacripta/math-bigint';

export enum ServerEventName {
    state = '0',
    options = '1',
    error = '2',
}

export enum GameStatus {
    /** Пустое значение, означает что клиент еще не получил данные с бэка */
    none = 0,
    /** Начальный статус, только запустились */
    wait = 1,
    /** Отправили запрос на спин, но не еще пришел ответ */
    requestSpin = 2,
    /** Ставка сделана, ожидается результат */
    spin = 3,
    /** Результат игры готов */
    finish = 4
}



export const GameWsApiStateResultParser = z.number().array();
export type GameWsApiStateResult = z.infer<typeof GameWsApiStateResultParser>
export type GameWsApiStateResultRaw = z.input<typeof GameWsApiStateResultParser>

export const GameWsApiOptionsConstraint = z.object({
    [GameWsApiFieldsNames.variantsCount]: z.number().gt(1),
    [GameWsApiFieldsNames.reelsCount]: z.number().gt(1),
})

export type GameWsApiOptions = z.infer<typeof GameWsApiOptionsConstraint>
export type GameWsApiOptionsRaw = z.input<typeof GameWsApiOptionsConstraint>

export const GameWsApiStateParser = z.object({
    [GameWsApiFieldsNames.rId]: z.string(),
    [GameWsApiFieldsNames.bid]: GameBidParser,
    [GameWsApiFieldsNames.result]: GameWsApiStateResultParser,
    [GameWsApiFieldsNames.status]: z.nativeEnum(GameStatus),
    [GameWsApiFieldsNames.winAmount]: z.string().transform((v) => FixedNumber.fromSafeString(v)),
    [GameWsApiFieldsNames.coefficient]: z.string().transform((v) => FixedNumber.fromSafeString(v)),
})

export type GameWsApiState = z.infer<typeof GameWsApiStateParser>
export type GameWsApiStateRow = z.input<typeof GameWsApiStateParser>

export type ServerToClientEvents = {
    [ServerEventName.state]: (p: GameWsApiStateRow) => void
    [ServerEventName.options]: (p: GameWsApiOptionsRaw) => void
}
