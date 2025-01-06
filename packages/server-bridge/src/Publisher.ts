import amqplib from 'amqplib'
import {nanoid} from 'nanoid'
import assert from 'node:assert'

export type PublisherOptions = {
    channel: amqplib.Channel
    queueName: string
}

type CorrelationId = string

export class Publisher<OutMessage = any, ResponseMessage = any> {
    #channel: amqplib.Channel
    #queueName: string
    #assertQueue?: amqplib.Replies.AssertQueue
    #callbacks = new Map<CorrelationId, {resolve: () => void, reject: () => void}>()

    constructor(options: PublisherOptions) {
        this.#channel = options.channel
        this.#queueName = options.queueName
    }

    async init() {
        this.#assertQueue = await this.#channel.assertQueue(
            '',
            {
                exclusive: true
            }
        )

        await this.#channel.consume(
            this.#assertQueue.queue,
            (msg) => {
                if (!msg) {
                    return
                }

                const callbacks = this.#callbacks.get(msg.properties.correlationId)

                this.#callbacks.delete(msg.properties.correlationId)

                if (!callbacks) {
                    throw new Error()
                }

                console.log(callbacks)
                console.log(`Publisher ${this.#queueName} [.] Got %s`, msg.content.toString())
                const parsedContent = JSON.parse(msg.content.toString())

                if (parsedContent.success) {
                    // @ts-ignore
                    callbacks.resolve(parsedContent.data)
                } else {
                    // @ts-ignore
                    callbacks.reject(parsedContent.data)
                }
            },
            {
                noAck: true,
            },
        );
    }

    send(msg: OutMessage) {
        return new Promise<ResponseMessage>((resolve, reject) => {
            const correlationId: CorrelationId = nanoid(21)
            assert(this.#assertQueue)

            // @ts-ignore
            this.#callbacks.set(correlationId, {resolve, reject})

            console.log(this.#assertQueue.queue)
            this.#channel.sendToQueue(
                this.#queueName,
                Buffer.from(JSON.stringify(msg)),
                {
                    correlationId: correlationId,
                    replyTo: this.#assertQueue.queue
                }
            )
    
            console.log(" [x] Sent %s", msg)
        })
    }
}
