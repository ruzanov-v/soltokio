// import amqplib from 'amqplib'
// import {nanoid} from 'nanoid'
// import mitt from 'mitt'
// import assert from 'node:assert'

// export type ConsumerOptions = {
//     channel: amqplib.Channel
//     queueName: string
// }

// type DefaultEventMap = {[K in string]: (...args: any[]) => any}

// type EventPayload<EventsMap extends DefaultEventMap, E extends keyof EventsMap> = Parameters<EventsMap[E]>
// type EventReturn<EventsMap extends DefaultEventMap, E extends keyof EventsMap> = ReturnType<EventsMap[E]>
// type EventHandler<EventsMap extends DefaultEventMap, E extends keyof EventsMap> = (...p: EventPayload<EventsMap, E>) => Promise<EventReturn<EventsMap, E>> | EventReturn<EventsMap, E>

// type CorrelationId = string

// export class ServiceBridge<EventsMap extends DefaultEventMap> {
//     #ee = mitt()
//     #channel: amqplib.Channel
//     #queueName: string
//     #assertQueue?: amqplib.Replies.AssertQueue
//     #callbacks = new Map<CorrelationId, {resolve: () => void, reject: () => void}>()

//     constructor(options: ConsumerOptions) {
//         this.#channel = options.channel
//         this.#queueName = options.queueName
//     }

//     async init() {
//         this.#assertQueue = await this.#channel.assertQueue(
//             this.#queueName,
//             {
//                 durable: false,
//             },
//         )

//         await this.#channel.consume(
//             this.#queueName,
//             (msg) => {
//                 if (!msg) {
//                     return
//                 }
    
//                 const msgStr = msg?.content.toString()

//                 console.log(" [x] Received %s", msgStr)

//                 const msgData = JSON.parse(msgStr) a

//                 if (typeof msgData.eventName !== 'string' || ) 

//                 this.#ee.emit(msgData.eventName, msgData.payload)
//             },
//             {
//                 noAck: false,
//             },
//         )

//         this.#channel.consume(
//             this.#assertQueue.queue,
//             (msg) => {
//                 if (!msg) {
//                     return
//                 }

//                 const callbacks = this.#callbacks.get(msg.properties.correlationId)

//                 this.#callbacks.delete(msg.properties.correlationId)

//                 if (!callbacks) {
//                     throw new Error()
//                 }

//                 console.log(' [.] Got %s', msg.content.toString())
//                 const parsedContent = JSON.parse(msg.content.toString())

//                 if (parsedContent.success) {
//                     callbacks.resolve(parsedContent.data)
//                 } else {
//                     callbacks.reject(parsedContent.data)
//                 }
//             },
//             {
//                 noAck: true,
//             },
//         );
//     }

//     on<E extends keyof EventsMap>(eventName: E, handler: EventHandler<EventsMap, E>) {
//         try {
//             await handler()
//         } catch (error) {
            
//         }

//         const handlers: Map<EventHandler<EventsMap, E>, EventHandler<EventsMap, E>> | undefined = this.#handlers.get(eventName);
    
//         if (handlers) {
//             handlers.set(handler, () => {
//                 try {
//                     handler()
//                 } catch (handler) {
                    
//                 }
//             });
//         } else {
//             all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
//         }
//     }

//     emit<E extends keyof EventsMap>(eventName: E, ...payload: EventPayload<EventsMap, E>): Promise<EventReturn<EventsMap, E>> {
//         return new Promise<EventReturn<EventsMap, E>>((resolve, reject) => {
//             const correlationId: CorrelationId = nanoid(21)
//             assert(this.#assertQueue)

//             this.#callbacks.set(correlationId, {resolve, reject})

//             const jsonPayload = JSON.stringify({eventName, payload})

//             this.#channel.sendToQueue(
//                 this.#queueName,
//                 Buffer.from(jsonPayload),
//                 {
//                     correlationId: correlationId,
//                     replyTo: this.#assertQueue.queue
//                 }
//             )

//             console.log(" [x] Sent %s", jsonPayload)
//         })
//     }
// }


// const d = new ServiceBridge<{
//     test: (p: {id: number}) => {data: 1}
// }>({})

// d.on('test', (p) => {
//     return {data: 1}
// })

// d.emit()