<template>
    <div>
        <UiButton
            @click="isOpen = true"
        >
            Deposit
        </UiButton>

        <UiBaseDialog v-model:open="isOpen">
            <UiButton
            @click="isOpen = false"
        >
            Deposit
        </UiButton>
        </UiBaseDialog>
    </div>
</template>

<script lang="ts" setup>
    import {UiButton, UiBaseDialog} from '@sukacripta/uikit-soltokio/src/index';
import { ref } from 'vue';

    const isOpen = ref(false)
</script>