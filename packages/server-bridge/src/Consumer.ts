import EventEmitter from 'node:events'
import amqplib, { ConsumeMessage } from 'amqplib'

export type ConsumerOptions = {
    channel: amqplib.Channel
    queueName: string
}

export class Consumer {
    ee = new EventEmitter<{
        'd': ['d']
    }>()
    #channel: amqplib.Channel
    #queueName: string

    constructor(options: ConsumerOptions) {
        this.#channel = options.channel
        this.#queueName = options.queueName
    }

    async init() {
        this.#channel.assertQueue(this.#queueName, {
            durable: false,
        })
    }

    async consume(onMessage: (msg: ConsumeMessage | null) => void,) {
        await this.#channel.consume(
            this.#queueName,
            (msg) => {
                onMessage(msg)
                console.log(" [x] Received %s", msg?.content.toString());
            },
            {
                noAck: false,
            },
        )
    }

    async replay(msg: ConsumeMessage, data: {toString(): string}) {
        console.log('reply', msg.properties, data)
        this.#channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(data.toString()),
            {
                correlationId: msg.properties.correlationId
            }
        )

        this.#channel.ack(msg);
    }
}
