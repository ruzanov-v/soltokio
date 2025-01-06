<template>
    <div :class="$style.root">
        <UiButton
            shape="square"
            @mousedown="handleMouseDown('plus')"
            @mouseup="handleMouseup"
            @mouseleave="handleMouseup"
            :disabled="!data.canAdd"
        >
            +
        </UiButton>

        <UiInput
            type="number"
            v-model="inputValue"
        />

        <UiButton
            shape="square"
            @mousedown="handleMouseDown('minus')"
            @mouseup="handleMouseup"
            @mouseleave="handleMouseup"
            :disabled="!data.canSubtract"
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
import { FixedNumber } from '@sukacripta/math-bigint';

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

const {bidAmount} = useGameState()
const inputValue = computed({
    get() {
        return Number(bidAmount.value.toString())
    },
    set(value) {
        bidAmount.value = FixedNumber.fromNumber(Number(value), 18, 128)
    }
})

const data = computed(() => {
    const amountValue = inputValue.value

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
    inputValue.value = Math.min(props.max, inputValue.value + props.step)
}

const handleMinus = () => {
    inputValue.value = Math.max(props.min, inputValue.value - props.step)
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