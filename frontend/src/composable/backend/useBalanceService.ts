import {useSocket} from '@suka-client/ws-web-client/src/entrypint'
import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'
import { type BalanceWsApiServerToClient } from "@suka-back/balance-service-interface/src/entrypoint";


export const useBalanceService = createSharedComposable(() => {
    const token = ref<string>()
    const setToken = (value: string) => {token.value = value;}

    const {socket, on, off} = useSocket<BalanceWsApiServerToClient>({token, path: '/ggg/user-state'})

    return {
        on,
        off,
        setToken,
        socket,
    }
})