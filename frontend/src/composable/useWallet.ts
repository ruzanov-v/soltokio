import { createSharedComposable } from "@vueuse/core";
import { shallowRef } from "vue";

export const useWallet = createSharedComposable(() => {
    const wallet = shallowRef({
        isReady: false,
        address: undefined as string | undefined,
        addressSevenSymbols: undefined as string | undefined
    })

    const connect = () => {
        wallet.value = {
            isReady: true,
            address: '0x000000000000000000000000000000',
            addressSevenSymbols: '0xFA4…341B'
        }
    }

    return {
        wallet,
        connect,
    }
})
