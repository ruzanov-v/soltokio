import { QUEUE_NAME, UserAuthRawEvents } from "@suka-back/user-auth-service-interfaces/src/entrypoint"
import { AmqpConnection, Publisher } from "@sukacripta/server-bridge"

const amqp = new AmqpConnection()
await amqp.connect('')

export const publisher = new Publisher<UserAuthRawEvents>({
    channel: await amqp.createChannel(),
    queueName: QUEUE_NAME,
})

await publisher.init()
