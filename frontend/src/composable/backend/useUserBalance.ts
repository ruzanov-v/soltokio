import { createSharedComposable } from "@vueuse/core";
import { shallowRef, watch } from "vue";
import { useBalanceService } from "./useBalanceService";
import { useWalletAuth } from "../useWalletAuth";
import { BalanceWsApiFields, BalanceWsApiServerToClientEvents, BalanceWsApiSnapshotParser, BalanceWsApiUpdateBalanceParser } from "@suka-back/balance-service-interface/src/wsApi";
import { ZERO } from "@sukacripta/math-bigint";

export const useUserBalance = createSharedComposable(() => {
    const {token} = useWalletAuth()
    const balance = shallowRef({
        amount: ZERO
    })
    const balanceService = useBalanceService()

    balanceService.on(BalanceWsApiServerToClientEvents.snapshot, (data) => {
        const snapshot = BalanceWsApiSnapshotParser.parse(data)

        balance.value = {
            amount: snapshot[0][BalanceWsApiFields.amount]
        }
    })

    watch(token, (v) => {
        if (typeof v === 'string') {
            balanceService.setToken(v)
        }
    }, {immediate: true})


    balanceService.on(BalanceWsApiServerToClientEvents.updateBalance, (data) => {
        const updatedBalance = BalanceWsApiUpdateBalanceParser.parse(data)
        balance.value = {
            amount: updatedBalance[BalanceWsApiFields.amount]
        }
    })

    return {
        balance,
    }
})