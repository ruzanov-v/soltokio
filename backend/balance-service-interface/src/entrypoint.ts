import z from 'zod'

export * from './wsApi'

export enum BalanceEventFieldsNames {
    balanceId = 'balanceId',
    changeType = 'changeType',
    currencyAddress = 'currencyAddress',
    currencyNetwork = 'currencyNetwork',
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


const BalanceEventFreezeParser = z.object({
    [BalanceEventFieldsNames.changeType]: z.literal(BalanceChangeType.freeze),
    [BalanceEventFieldsNames.freezeCause]: z.string(),
    [BalanceEventFieldsNames.freezeAmount]: z.string().transform((v) => BigInt(v)),
})

const BalanceEventLooseParser = z.object({
    [BalanceEventFieldsNames.changeType]: z.literal(BalanceChangeType.loose),
    [BalanceEventFieldsNames.looseAmount]: z.string().transform((v) => BigInt(v)),
})

const BalanceEventWinParser = z.object({
    [BalanceEventFieldsNames.changeType]: z.literal(BalanceChangeType.win),
    [BalanceEventFieldsNames.winAmount]: z.string().transform((v) => BigInt(v)),
})

export const BalanceEventParser = z.discriminatedUnion(
    BalanceEventFieldsNames.changeType,
    [
        BalanceEventFreezeParser,
        BalanceEventLooseParser,
        BalanceEventWinParser,
    ]
).and(
    z.object({
        [BalanceEventFieldsNames.currencyAddress]: z.string(),
        [BalanceEventFieldsNames.currencyNetwork]: z.string(),
        [BalanceEventFieldsNames.balanceId]: z.string().transform((v) => BigInt(v)),
        userId: z.string().transform((v) => BigInt(v)),
    })
)
