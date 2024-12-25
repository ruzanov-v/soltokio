import EventEmitter from 'node:events';
import {Consumer} from '@sukacripta/server-bridge/src/Consumer'
import {Publisher} from '@sukacripta/server-bridge/src/entrypoint'
import {AmqpConnection} from '@sukacripta/server-bridge/src/AmqpConnection'
import { prisma } from './prisma';
import assert from 'node:assert';
import {BalanceChangeType, BalanceEventFieldsNames, BalanceEventParser} from '@suka-back/balance-service-interface/src/entrypoint'

type UserBalance = {
    amount: bigint
    freezeAmount: bigint
    freezeCause: string
    currencyAddress: string
    currencyNetwork: string
}

export class UserBalances {
    #balances = new Map<bigint, Map<bigint, UserBalance>>()

    async getBalances(userId: bigint) {
        let balances = this.#balances.get(userId)

        if (!balances) {
            const rawBalances = await prisma.balance.findMany({
                where: {userId},
                select: {
                    id: true,
                    amount: true,
                    freezeAmount: true,
                    freezeCause: true,
                    currencyAddress: true,
                    currencyNetwork: true,
                }
            })

            balances = new Map(
                rawBalances.map((balance) => [
                    balance.id,
                    {
                        amount: balance.amount,
                        freezeAmount: balance.freezeAmount,
                        freezeCause: balance.freezeCause,
                        currencyAddress: balance.currencyAddress,
                        currencyNetwork: balance.currencyNetwork,
                    }
                ] as const)
            )

            this.#balances.set(userId, balances)
        }

        return balances
    }

    async getBalance(userId: bigint, balanceId: bigint) {
        let balances = this.#balances.get(userId)

        if (!balances) {
            balances = await this.getBalances(userId)
        }

        console.log(balances, userId, balanceId)

        const balance = balances.get(balanceId)

        assert(balance)

        return balance
    }

    async updateBalance(userId: bigint, balanceId: bigint, balance: UserBalance) {
        const currentBalance = await this.getBalance(userId, balanceId)

        assert(
            currentBalance.currencyAddress === balance.currencyAddress
            && currentBalance.currencyNetwork === balance.currencyNetwork
        )

        await prisma.$transaction(async (client) => {
            currentBalance.amount = balance.amount
            currentBalance.freezeAmount = balance.freezeAmount
            currentBalance.freezeCause = balance.freezeCause
            currentBalance.currencyAddress = balance.currencyAddress
            currentBalance.currencyNetwork = balance.currencyNetwork

            await client.balance.update({
                where: {userId, id: balanceId},
                data: {
                    amount: balance.amount,
                    freezeAmount: balance.freezeAmount,
                    freezeCause: balance.freezeCause,
                    currencyAddress: balance.currencyAddress,
                    currencyNetwork: balance.currencyNetwork,
                }
            })
        })

        return currentBalance
    }


    #ee = new EventEmitter()

    on = this.#ee.on.bind(this.#ee)
    off = this.#ee.off.bind(this.#ee)

    async init() {
        const amqp = new AmqpConnection()
        await amqp.connect('')
        const channel = await amqp.createChannel()
        channel.prefetch(1)
        const consumer = new Consumer({
            channel: await amqp.createChannel(),
            queueName: 'game-balance',
        })

        await consumer.consume(async (msg) => {
            if (!msg) {
                return
            }

            try {
                const data = BalanceEventParser.parse(JSON.parse(msg.content.toString()))
    
                const balance = await this.getBalance(data.userId, data[BalanceEventFieldsNames.balanceId])
    
                assert(
                    data[BalanceEventFieldsNames.currencyAddress] === balance.currencyAddress
                    && data[BalanceEventFieldsNames.currencyNetwork] === balance.currencyNetwork
                )
    
                switch (data.changeType) {
                    case BalanceChangeType.freeze: {
                        // нельзя фризить если уже есть фриз
                        // объем замороженных средств должен быть меньше чем общий объем
                        assert(balance.freezeAmount === 0n)
                        assert(balance.amount > data[BalanceEventFieldsNames.freezeAmount])
    
                        balance.freezeAmount = data[BalanceEventFieldsNames.freezeAmount]
                        balance.freezeCause = data[BalanceEventFieldsNames.freezeCause]
    
                        break;
                    }
    
                    // case BalanceChangeType.unfreeze: {
                    //     break;
                    // }
                    
                    // case BalanceChangeType.deposit: {
                    //     break;
                    // } 
    
                    // case BalanceChangeType.withdrawal: {
                    //     break;
                    // }
    
                    case BalanceChangeType.win: {
                        balance.freezeAmount = 0n
                        balance.freezeCause = ''
                        balance.amount += data[BalanceEventFieldsNames.winAmount]

                        break;
                    }
    
                    case BalanceChangeType.loose: {
                        // Проиграть можно ровно столько сколько заморожено
                        assert(balance.freezeAmount === data[BalanceEventFieldsNames.looseAmount])
                        assert(balance.amount >= data[BalanceEventFieldsNames.looseAmount])
    
                        balance.amount = balance.amount - data[BalanceEventFieldsNames.looseAmount]
                        balance.freezeAmount = 0n
                        balance.freezeCause = ''
    
                        break;
                    }
                
                    default: {
                        throw new Error('UserBalance хз событие')
                    }
                }
    
                const currentBalance = await this.updateBalance(data.userId, data[BalanceEventFieldsNames.balanceId], balance)

                console.log(currentBalance)

                this.#ee.emit('update', data.userId, data[BalanceEventFieldsNames.balanceId], currentBalance)

                consumer.replay(msg, 'ok')
            } catch(error) {
                console.error(error)
                consumer.replay(msg, 'error')
            }
        })
        
    }
}

