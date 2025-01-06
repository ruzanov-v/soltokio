import {createSharedComposable} from "@vueuse/core";
import { useGameState } from '../composabe/useGameState';
import { useBackend } from '../composabe/useServer';
import { ClientEventName, GameWsApiFieldsNames, GameStatus } from "@suka-game/simple-slots-shared/src/types";
import {BMath} from '@sukacripta/math-bigint'

export const useSpin = createSharedComposable(() => {
    const {socket} = useBackend()
    const {bidAmount, balanceId, status} = useGameState()

    const spin = () => {
        socket.value?.emit(ClientEventName.spin, {
            [GameWsApiFieldsNames.rId]: Math.round(Math.random() * (32**3 - 1)).toString(32).padStart(3, '0'),
            [GameWsApiFieldsNames.bidAmount]: bidAmount.value.toSafeString(),
            [GameWsApiFieldsNames.balanceId]: BMath.toHex(balanceId.value),
        })

        status.value = GameStatus.requestSpin
    }

    return {
        spin
    }
})
