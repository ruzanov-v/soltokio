<script setup lang="ts">
import { ref, watch } from 'vue';
import { GameStatus } from '@suka-game/simple-slots-shared/src/types';
import {UiNumber, UiOutlineText, UiAlert} from '@sukacripta/uikit-soltokio/src/index';
import { useGameState } from '../composabe/useGameState';
import { useAlert } from '../composabe/useAlert';
import { ZERO } from '@sukacripta/math-bigint';

const {win, bidAmount, status} = useGameState()
const {isOpen} = useAlert()

const result = ref<'win'|'loose'>()
const headerText = ref<string>()

watch(status, (statusValue) => {
    if (statusValue === GameStatus.finish) {
        isOpen.value = true
        if (win.value.coefficient.gt(ZERO)) {
            result.value = 'win'
            headerText.value = 'You win!!!'
        } else {
            result.value = 'loose'
            headerText.value = 'You loose'
        }
    }
}, {immediate: true})
</script>

<template>
    <UiAlert
        v-model:open="isOpen"
        :headerText="headerText"
    >
        <div v-if="result === 'win'">
            <div :class="$style.amount">
                <UiOutlineText color="white">+</UiOutlineText>
                <UiNumber :value="Number(win.amount.toString())"/>
            </div>
    
            <UiOutlineText color="white">{{win.coefficient.toString()}}X</UiOutlineText>
        </div>

        <div v-else>
            <div :class="$style.amount">
                <UiOutlineText color="red">-</UiOutlineText>
                <UiNumber :value="Number(bidAmount.toString())"/>
            </div>
        </div>
    </UiAlert>
</template>

<style module>
.amount {
    font-size: 30px;
    line-height: 1;
}
</style>
