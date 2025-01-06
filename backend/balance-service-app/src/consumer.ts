import {QUEUE_NAME} from '@suka-back/balance-service-interface/src/entrypoint'
import {AmqpConnection, Consumer} from '@sukacripta/server-bridge'

const amqp = new AmqpConnection()

await amqp.connect('')

const channel = await amqp.createChannel()

channel.prefetch(1)

const consumer = new Consumer({
    channel: await amqp.createChannel(),
    queueName: QUEUE_NAME,
})

await consumer.init()

export {
    consumer
}