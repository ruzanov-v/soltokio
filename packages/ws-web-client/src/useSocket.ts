import { onScopeDispose, ref, shallowRef, watch, type Ref } from "vue";
import { createSocket, type EventsMap } from "./socket"
import { Socket } from "socket.io-client";
import mitt from 'mitt'

export const useSocket = <ServerToClientEvents extends EventsMap, ClientToServerEvents extends EventsMap = {}>(
    payload: {
        token: Ref<string|undefined|null>,
        path: string,
    }
) => {
    const isConnected = ref(false)
    const socket = shallowRef<Socket<ServerToClientEvents, ClientToServerEvents>>()
    const ee = mitt<{[K in keyof ServerToClientEvents]: Parameters<ServerToClientEvents[K]>[0]}>()

    const handleEvent = (...payload: {[K in keyof ServerToClientEvents]: [K, Parameters<ServerToClientEvents[K]>[0]]}[keyof ServerToClientEvents]) => {
        ee.emit(payload[0], payload[1])
    }

    watch(socket, (socketValue, prevSocketValue) => {
        if (socketValue) {
            socketValue.onAny(handleEvent)
        }

        if (prevSocketValue) {
            prevSocketValue.offAny(handleEvent)
        }
    })

    watch(payload.token, (token) => {
        socket.value?.disconnect()

        if (typeof token === 'string') {
            const newSocket = createSocket<
                ServerToClientEvents,
                ClientToServerEvents
            >({
                path: payload.path,
                auth: {
                    token: token,
                }
            })
        
            newSocket.on("connect", () => {
                isConnected.value = true
            })
        
            newSocket.on('disconnect', () => {
                isConnected.value = false
            })
        
            newSocket.on('connect_error', (error) => {
                console.error(error)
            })
        
            newSocket.io.on("error", (error) => {
                console.error(error)
            })
        
            newSocket.io.on("ping", () => {
                // ...
            })
        
            newSocket.io.on("reconnect", (attempt) => {
                console.error('reconnect', attempt)
            })
        
            newSocket.io.on("reconnect_attempt", (attempt) => {
                console.error('reconnect_attempt', attempt)
            })
        
            newSocket.io.on("reconnect_error", (error) => {
                console.error(error)
            })
        
            newSocket.io.on("reconnect_failed", () => {
                // ...
            })

            socket.value = newSocket
        }
    }, {immediate: true});

    onScopeDispose(() => socket.value?.disconnect());

    return {
        socket,
        isConnected,
        on: ee.on,
        off: ee.off,
    }
}  
     