import amqplib, { ConsumeMessage } from 'amqplib'

export type ConsumerOptions = {
    channel: amqplib.Channel
    queueName: string
}

export class Consumer {
    #channel: amqplib.Channel
    #queueName: string

    constructor(options: ConsumerOptions) {
        this.#channel = options.channel
        this.#queueName = options.queueName
    }

    async init() {
        await this.#channel.assertQueue(this.#queueName, {
            durable: false,
        })
    }

    async consume(onMessage: (msg: ConsumeMessage) => void,) {
        await this.#channel.consume(
            this.#queueName,
            (msg) => {
                console.log(" [x] Received %s", msg?.content.toString());

                if (msg) {
                    onMessage(msg)
                }
            },
            {
                noAck: false,
            },
        )
    }

    async replay(msg: ConsumeMessage, success: boolean = false, data: any) {
        console.log('reply', msg.properties, data)

        this.#channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify({
                success,
                data,
            })),
            {
                correlationId: msg.properties.correlationId
            }
        )

        this.#channel.ack(msg);
    }
}
