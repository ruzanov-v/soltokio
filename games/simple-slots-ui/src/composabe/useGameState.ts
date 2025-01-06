import { createSharedComposable } from "@vueuse/core";
import { useBackend } from "./useServer";
import { ServerEventName, type GameWsApiStateResult, GameStatus, GameWsApiStateParser, GameWsApiFieldsNames, GameWsApiOptionsConstraint } from "@suka-game/simple-slots-shared/src/entrypoint";
import { readonly, ref, shallowRef } from "vue";
import { ZERO, FixedNumber } from "@sukacripta/math-bigint";

export const useGameState = createSharedComposable(() => {
    const {on} = useBackend()
    const gameOptions = ref<{
        variantsCount: number,
        reelsCount: number,
    }>()
    const result = shallowRef<GameWsApiStateResult>([0 ,0 ,0 ,0])
    const status = ref<GameStatus>(GameStatus.none)
    const win = shallowRef<{
        readonly amount: FixedNumber,
        readonly coefficient: FixedNumber,
    }>({
        amount: ZERO,
        coefficient: ZERO,
    })
    const bidAmount = shallowRef<FixedNumber>(ZERO)
    const balanceId = ref(0n)

    on(ServerEventName.options, (data) => {
        const options = GameWsApiOptionsConstraint.parse(data)

        gameOptions.value = {
            variantsCount: options[GameWsApiFieldsNames.variantsCount],
            reelsCount: options[GameWsApiFieldsNames.reelsCount],
        }
    })

    on(ServerEventName.state, (data) => {
        const state = GameWsApiStateParser.parse(data)

        if (state[GameWsApiFieldsNames.result].every(i => i !== 0)) {
            result.value = state[GameWsApiFieldsNames.result]
        }

        state[GameWsApiFieldsNames.result]
        status.value = state[GameWsApiFieldsNames.status]
        bidAmount.value = state[GameWsApiFieldsNames.bid][GameWsApiFieldsNames.bidAmount]
        balanceId.value = state[GameWsApiFieldsNames.bid][GameWsApiFieldsNames.balanceId]

        win.value = {
            amount: state[GameWsApiFieldsNames.winAmount],
            coefficient: state[GameWsApiFieldsNames.coefficient],
        }
    })

    return {
        result: readonly(result),
        status,
        gameOptions,
        bidAmount,
        balanceId,
        win,
    }
})
