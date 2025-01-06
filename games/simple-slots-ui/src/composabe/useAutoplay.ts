import { createSharedComposable, useEventListener } from "@vueuse/core";
import { ref, watch } from "vue";
import { useSpin } from "./useSpin";
import { useGameState } from "./useGameState";
import { GameStatus } from "@suka-game/simple-slots-shared/src/types";
import { useAlert } from "./useAlert";

export const useAutoplay = createSharedComposable(() => {
    const isAutoplay = ref(false)
    const {spin} = useSpin()
    const {status} = useGameState()
    const {isOpen: isOpenAlert} = useAlert()

    useEventListener('click', () => {
        if (isAutoplay.value) {
            isAutoplay.value = false

        }
    }, {passive: true, capture: true})

    watch([isAutoplay, isOpenAlert, status], ([isAutoplayValue, isOpenAlertValue, statusValue]) => {
        if (isAutoplayValue && !isOpenAlertValue && statusValue === GameStatus.finish) {
            spin()
        }
    })

    return {
        isAutoplay
    }
})