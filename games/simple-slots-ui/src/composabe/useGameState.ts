import { createSharedComposable } from "@vueuse/core";
import { useBackend } from "./useServer";
import { ServerEventName, type GameWsApiStateResult, GameStatus, type GameBid, GameWsApiStateParser, GameBidFieldsNames, GameWsApiFieldsNames } from "@suka-game/simple-slots-shared/src/entrypoint";
import { readonly, ref, shallowRef } from "vue";

export const useGameState = createSharedComposable(() => {
    const {on} = useBackend()
    const result = shallowRef<GameWsApiStateResult>([0 ,0 ,0 ,0])
    const status = ref<GameStatus>(GameStatus.none)
    const win = ref({
        amount: 0n,
        coefficient: 0,
    })
    const bid = ref<GameBid>({
        [GameBidFieldsNames.amount]: 0n,
        [GameBidFieldsNames.balanceId]: 0n,
        [GameBidFieldsNames.currencyAddress]: '2323123',
        [GameBidFieldsNames.currencyNetwork]: 'dsf',
    })

    on(ServerEventName.state, (data) => {
        const state = GameWsApiStateParser.parse(data)

        result.value = state[GameWsApiFieldsNames.result]
        status.value = state[GameWsApiFieldsNames.status]
        bid.value = state[GameWsApiFieldsNames.bid]
        win.value = {
            amount: state[GameWsApiFieldsNames.winAmount],
            coefficient: state[GameWsApiFieldsNames.coefficient],
        }
    })

    return {
        result: readonly(result),
        status: readonly(status),
        bid,
        win,
    }
})
