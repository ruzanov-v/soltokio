import assert from 'node:assert'
import amqplib from 'amqplib'

export class AmqpConnection {
    #connection?: amqplib.Connection

    async connect(url: string) {
        this.#connection = await amqplib.connect(url)
    }

    createChannel(): Promise<amqplib.Channel> {
        assert(this.#connection)

        const channel = this.#connection.createChannel()

        return channel
    }
}