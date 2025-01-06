import { UserBalances } from "./userBalance";
import { BalanceWsApiFields, BalanceWsApiServerToClientEvents, BalanceWsApiSnapshotRow } from "@suka-back/balance-service-interface/src/wsApi";
import {BMath} from '@sukacripta/math-bigint'
import { httpServer, io } from "./server";

const userBalances = new UserBalances()

await userBalances.init()

// добавить депо
// вывести депо
// заморозить ставку
// начислить выигрыш
// забрать проигранное

io.on("connection", async (socket) => {
    const userId = socket.data.user.id
    const balancesMap = await userBalances.getBalances(userId)

    const balances: BalanceWsApiSnapshotRow = []
    balancesMap.forEach((balance, balanceId) => {
        balances.push({
            [BalanceWsApiFields.balanceId]: BMath.toHex(balanceId),
            [BalanceWsApiFields.amount]: balance.amount.toSafeString(),
            [BalanceWsApiFields.freezeAmount]: balance.freezeAmount.toSafeString(),
            [BalanceWsApiFields.currencyAddress]: balance.currencyAddress,
            [BalanceWsApiFields.currencyNetwork]: balance.currencyNetwork,
        })
    })

    socket.emit(BalanceWsApiServerToClientEvents.snapshot, balances)
});

userBalances.on('update', (userId, balanceId, balance) => {
    io.to(userId.toString()).emit(
        BalanceWsApiServerToClientEvents.updateBalance,
        {
            [BalanceWsApiFields.balanceId]: BMath.toHex(balanceId),
            [BalanceWsApiFields.amount]: balance.amount.toSafeString(),
            [BalanceWsApiFields.freezeAmount]: balance.freezeAmount.toSafeString(),
            [BalanceWsApiFields.currencyAddress]: balance.currencyAddress,
            [BalanceWsApiFields.currencyNetwork]: balance.currencyNetwork,
        })
})

const PORT = 3001
const HOSTNAME = '0.0.0.0'

httpServer.listen(PORT, HOSTNAME, () => {
    console.info(`STARTED ${HOSTNAME}:${PORT}`)
});
