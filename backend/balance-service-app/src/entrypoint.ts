import { createServer } from "http";
import { Server } from "socket.io";
import { UserBalances } from "./userBalance";
import { BalanceWsApiFields, BalanceWsApiServerToClient, BalanceWsApiServerToClientEvents, BalanceWsApiSnapshotRow } from "@suka-back/balance-service-interface/src/wsApi";


const userBalances = new UserBalances()

await userBalances.init()

// добавить депо
// вывести депо
// заморозить ставку
// начислить выигрыш
// забрать проигранное


const httpServer = createServer();
const io = new Server<
    any,
    BalanceWsApiServerToClient
>(httpServer, {
  path: '/ggg/user-state'
})

const getUser = async (token: string) => {
    return {
        id: BigInt(token)
    }
}

const toHex = (v: bigint) => `0x${v.toString(16)}`


io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    socket.data.user = await getUser(token)
    socket.join(socket.data.user.id.toString())

    next()
}).on("connection", async (socket) => {
    const userId = socket.data.user.id
    const balancesMap = await userBalances.getBalances(userId)

    const balances: BalanceWsApiSnapshotRow = []
    balancesMap.forEach((balance, balanceId) => {
        balances.push({
            [BalanceWsApiFields.balanceId]: toHex(balanceId),
            [BalanceWsApiFields.amount]: toHex(balance.amount),
            [BalanceWsApiFields.freezeAmount]: toHex(balance.freezeAmount),
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
            [BalanceWsApiFields.balanceId]: toHex(balanceId),
            [BalanceWsApiFields.amount]: toHex(balance.amount),
            [BalanceWsApiFields.freezeAmount]: toHex(balance.freezeAmount),
            [BalanceWsApiFields.currencyAddress]: balance.currencyAddress,
            [BalanceWsApiFields.currencyNetwork]: balance.currencyNetwork,
        })
})

httpServer.listen(3001, '127.0.0.1', () => {
    console.log('STARTED')
});
