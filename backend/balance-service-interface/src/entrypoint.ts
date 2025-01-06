import z from 'zod'

import {QUEUE_NAME} from './queueMessages'
import { FixedNumber } from '@sukacripta/math-bigint'

export {
    QUEUE_NAME
}
export * from './wsApi'

export enum BalanceEventFieldsNames {
    balanceId = 'balanceId',
    type = 'type',
    freezeCause = 'freezeCause',
    freezeAmount = 'freezeAmount',
    looseAmount = 'looseAmount',
    winAmount = 'winAmount',
}

export enum BalanceChangeType {
    freeze = 'freeze',
    unfreeze = 'unfreeze',
    deposit = 'deposit',
    withdrawal = 'withdrawal',
    win = 'win',
    loose = 'loose',
}


const BalanceEventFreezeConstraint = z.object({
    [BalanceEventFieldsNames.type]: z.literal(BalanceChangeType.freeze),
    [BalanceEventFieldsNames.freezeCause]: z.string(),
    [BalanceEventFieldsNames.freezeAmount]: z.string().transform((v) => FixedNumber.fromSafeString(v)),
})

const BalanceEventLooseConstraint = z.object({
    [BalanceEventFieldsNames.type]: z.literal(BalanceChangeType.loose),
    [BalanceEventFieldsNames.looseAmount]: z.string().transform((v) => FixedNumber.fromSafeString(v)),
})

const BalanceEventWinConstraint = z.object({
    [BalanceEventFieldsNames.type]: z.literal(BalanceChangeType.win),
    [BalanceEventFieldsNames.winAmount]: z.string().transform((v) => FixedNumber.fromSafeString(v)),
})

export const BalanceEventConstraint = z.discriminatedUnion(
    BalanceEventFieldsNames.type,
    [
        BalanceEventFreezeConstraint,
        BalanceEventLooseConstraint,
        BalanceEventWinConstraint,
    ]
).and(
    z.object({
        [BalanceEventFieldsNames.balanceId]: z.string().transform((v) => BigInt(v)),
        userId: z.string().transform((v) => BigInt(v)),
    })
)

export type BalanceEvent = z.infer<typeof BalanceEventConstraint>
export type BalanceRawEvent = z.input<typeof BalanceEventConstraint>
