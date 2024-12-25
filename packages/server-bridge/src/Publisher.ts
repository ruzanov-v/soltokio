import amqplib from 'amqplib'
import {nanoid} from 'nanoid'
import assert from 'node:assert'

export type PublisherOptions = {
    channel: amqplib.Channel
    queueName: string
}

type CorrelationId = string

export class Publisher {
    #channel: amqplib.Channel
    #queueName: string
    #assertQueue?: amqplib.Replies.AssertQueue
    #callbacks = new Map<CorrelationId, (p: Buffer) => any>()

    constructor(options: PublisherOptions) {
        this.#channel = options.channel
        this.#queueName = options.queueName
    }

    async init() {
        this.#assertQueue = await this.#channel.assertQueue(this.#queueName, {
            durable: false,
        })

        this.#channel.consume(
            this.#assertQueue.queue,
            (msg) => {
                if (!msg) {
                    return
                }

                const callback = this.#callbacks.get(msg.properties.correlationId)

                if (!callback) {
                    throw new Error()
                }

                console.log(' [.] Got %s', msg.content.toString());
                callback(msg.content)
            },
            {
                noAck: true,
            },
        );
    }

    send(msg: any) {
        return new Promise((resolve, reject) => {
            const correlationId: CorrelationId = nanoid(21)
            assert(this.#assertQueue)

            this.#callbacks.set(correlationId, (v) => resolve(v))

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
