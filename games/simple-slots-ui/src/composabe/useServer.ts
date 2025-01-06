import {useSocket} from '@suka-client/ws-web-client/src/entrypint'
import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'
import type {ClientToServerEvents, ServerToClientEvents} from '@suka-game/simple-slots-shared/src/types'

export const useBackend = createSharedComposable(() => {
    const token = ref<string>()
    const setToken = (value: string) => token.value = value

    const {socket, on, off} = useSocket<ServerToClientEvents, ClientToServerEvents>({token, path: '/ggg/simple-slots'})

    return {
        on,
        off,
        setToken,
        socket,
    }
})