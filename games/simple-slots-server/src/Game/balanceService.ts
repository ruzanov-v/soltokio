import { QUEUE_NAME, BalanceRawEvent } from "@suka-back/balance-service-interface/src/entrypoint"
import { AmqpConnection, Publisher } from "@sukacripta/server-bridge"

const amqp = new AmqpConnection()
await amqp.connect('')

export const publisher = new Publisher<BalanceRawEvent>({
    channel: await amqp.createChannel(),
    queueName: QUEUE_NAME,
})

await publisher.init()
