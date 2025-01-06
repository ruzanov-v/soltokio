import { ref, watch } from "vue"
import { useWallet } from "./useWallet"
import { createSharedComposable } from "@vueuse/core"

export const useWalletAuth = createSharedComposable(() => {
    const {wallet} = useWallet()
    const token = ref<string>()
    const auth = () => {
        token.value = wallet.value.address
    }
    watch(wallet, ({isReady}) => {
        if (isReady) {
            auth()
        }
    }, {immediate: true})

    return {
        token,
        auth,
    }
})
