import z from 'zod'
import { GameWsApiFieldsNames } from './GameWsApiFieldsNames'
import {FixedNumber} from '@sukacripta/math-bigint'

export enum ClientEventName {
    spin = '0'
}

export const GameBidParser = z.object({
    [GameWsApiFieldsNames.rId]: z.string(),
    [GameWsApiFieldsNames.balanceId]: z.string().transform((v) => BigInt(v)),
    [GameWsApiFieldsNames.bidAmount]: z.string().transform((v) => FixedNumber.fromSafeString(v)),
})
export type GameBid = z.infer<typeof GameBidParser>

export const GameWsApiSpinParser = GameBidParser
export type GameWsApiSpin = z.infer<typeof GameWsApiSpinParser>
export type GameWsApiSpinRaw = z.input<typeof GameWsApiSpinParser>

export type ClientToServerEvents = {
    [ClientEventName.spin]: (p: GameWsApiSpinRaw) => void
}
