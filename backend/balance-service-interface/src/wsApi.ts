import { FixedNumber } from '@sukacripta/math-bigint'
import z from 'zod'

export enum BalanceWsApiServerToClientEvents {
    snapshot = '0',
    updateBalance = '1',
}

export enum BalanceWsApiFields {
    balanceId = '0',
    amount = '1',
    currencyAddress = '2',
    currencyNetwork = '3',
    freezeAmount = '4',
}

const BalanceWsApiParser = z.object({
    [BalanceWsApiFields.balanceId]: z.string().transform(v => BigInt(v)),
    [BalanceWsApiFields.amount]: z.string().transform((v) => FixedNumber.fromSafeString(v)),
    [BalanceWsApiFields.freezeAmount]: z.string().transform(v => FixedNumber.fromSafeString(v)),
    [BalanceWsApiFields.currencyAddress]: z.string(),
    [BalanceWsApiFields.currencyNetwork]: z.string(),
})

export const BalanceWsApiSnapshotParser = z.array(BalanceWsApiParser)
export type BalanceWsApiSnapshot = z.infer<typeof BalanceWsApiSnapshotParser>
export type BalanceWsApiSnapshotRow = z.input<typeof BalanceWsApiSnapshotParser>

export const BalanceWsApiUpdateBalanceParser = BalanceWsApiParser
export type BalanceWsApiUpdateBalance = z.infer<typeof BalanceWsApiUpdateBalanceParser>
export type BalanceWsApiUpdateBalanceRow = z.input<typeof BalanceWsApiUpdateBalanceParser>

export type BalanceWsApiServerToClient = {
    [BalanceWsApiServerToClientEvents.snapshot]: (payload: BalanceWsApiSnapshotRow) => void
    [BalanceWsApiServerToClientEvents.updateBalance]: (payload: BalanceWsApiUpdateBalanceRow) => void
}