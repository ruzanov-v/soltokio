import z from 'zod'

export enum ClientEventName {
    spin = '0'
}

export enum GameBidFieldsNames {
    balanceId = '0',
    currencyNetwork = '1',
    currencyAddress = '2',
    amount = '3',
}

export const GameBidParser = z.object({
    [GameBidFieldsNames.balanceId]: z.string().transform((v) => BigInt(v)),
    [GameBidFieldsNames.currencyAddress]: z.string(),
    [GameBidFieldsNames.currencyNetwork]: z.string(),
    [GameBidFieldsNames.amount]: z.string().transform((v) => BigInt(v)).refine(v => v > 0n),
})
export type GameBid = z.infer<typeof GameBidParser>

export const GameWsApiSpinParser = GameBidParser
export type GameWsApiSpin = z.infer<typeof GameWsApiSpinParser>
export type GameWsApiSpinRaw = z.input<typeof GameWsApiSpinParser>

export type ClientToServerEvents = {
    [ClientEventName.spin]: (p: GameWsApiSpinRaw) => void
}
