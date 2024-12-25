<template>
    {{ data }}
    <div :class="$style.root">
        <UiButton
            shape="square"
            @mousedown="handleMouseDown('plus')"
            @mouseup="handleMouseup"
            @mouseleave="handleMouseup"
        >
            +
        </UiButton>

        <UiInput
            type="number"
            v-model="bid[GameBidFieldsNames.amount]"
        />

        <UiButton
            shape="square"
            @mousedown="handleMouseDown('minus')"
            @mouseup="handleMouseup"
            @mouseleave="handleMouseup"
        >
            -
        </UiButton>
    </div>
</template>

<script lang="ts" setup>
import {UiButton, UiInput} from '@sukacripta/uikit-soltokio/src'
import { useIntervalFn } from '@vueuse/core';
import { computed } from 'vue';
import { useGameState } from '../composabe/useGameState';
import { GameBidFieldsNames } from '@suka-game/simple-slots-shared/src/types';

const props = withDefaults(
    defineProps<{
        min?: number,
        max?: number,
        step?: number,
    }>(),
    {
        min: 0,
        max: Number.MAX_VALUE,
        step: 1,
    },
)

const {bid} = useGameState()

const data = computed(() => {
    const amountValue = bid.value[GameBidFieldsNames.amount]

    return {
        canSubtract: Number(amountValue) > props.min,
        canAdd: Number(amountValue) < props.max,
    }
})

let activeBtn = ''

const { pause, resume } = useIntervalFn(
    () => {
        if (activeBtn === 'plus') {
            handlePlus()
        } else if (activeBtn === 'minus') {
            handleMinus()
        }
    },
    200,
    {immediateCallback: true, immediate: false},
)

const handleMouseDown = (btn: 'plus' | 'minus') => {
    activeBtn = btn
    resume()
}

const handleMouseup = () => {
    activeBtn = ''
    pause()
}

const handlePlus = () => {
    bid.value[GameBidFieldsNames.amount] = BigInt(Math.min(props.max, Number(bid.value[GameBidFieldsNames.amount] + BigInt(props.step))))
}

const handleMinus = () => {
    bid.value[GameBidFieldsNames.amount] = BigInt(Math.max(props.min, Number(bid.value[GameBidFieldsNames.amount] - BigInt(props.step))))
}
</script>

<style module>
.root {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
}
</style>