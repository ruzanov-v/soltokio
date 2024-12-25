<script setup lang="ts">

import { useGameState } from '../composabe/useGameState';
import { ref, watch } from 'vue';
import { GameStatus } from '@suka-game/simple-slots-shared/src/types';
import {UiNumber, UiOutlineText, UiBaseDialog} from '@sukacripta/uikit-soltokio/src/index';

const {win, status} = useGameState()
const isOpen = ref(false)

watch(status, (statusValue) => {
    if (statusValue === GameStatus.finish && win.value.coefficient > 0) {
        isOpen.value = true
    }
}, {immediate: true})
</script>

<template>
    <UiBaseDialog v-model:open="isOpen">

        <svg xmlns="http://www.w3.org/2000/svg" width="303" height="157" fill="none">
            <path fill="#000" fill-opacity=".1" d="M260.5 138.7c-3.2 8.3-6.9 14.3-13 15l-198.3 2.5c-2.4.2-4.8-.3-6.8-1.5-6-3.5-7.2-11.7-10.5-17.8L5 87.4c-3.3-6.1-6.6-14-1.4-18.7 1.7-1.6 4-2.6 6.4-2.9L291.8 8.9c1.9-.2 3.7 0 5.3.7 7.5 3 5.6 13.3 2.9 20.8l-39.5 108.3Z"/>
            <path fill="#FFC434" stroke="#515795" stroke-width="3" d="M259.3 130.7 298 25c1.4-3.9 2.6-8.6 2.5-12.7-.2-4.2-1.8-8.3-6.3-10-1.8-.6-3.7-.9-5.7-.6l-276 55.7c-2.5.2-4.9 1.3-6.8 3-3.1 2.7-3.6 6.5-3 10.1.6 3.6 2.4 7.3 4 10.4l26.1 48a45.4 45.4 0 0 1 2.6 5.8c.5 1.4 1 2.7 1.7 4 1.5 3.4 3.5 6.7 7 8.6 2 1.2 4.6 1.8 7.2 1.5l194-2.5h.1c3.6-.4 6.3-2.3 8.5-5a39 39 0 0 0 5.5-10.6Z"/>
        </svg>

        <UiOutlineText color="white">+</UiOutlineText>
        <UiNumber :value="Number(win.amount)"/>
        Win: {{ win.amount }};
        coefficient: {{ win.coefficient }};
    </UiBaseDialog>
</template>
