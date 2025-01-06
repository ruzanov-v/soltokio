<template>
    <div :class="$style.root">
        <UiButton
            color="secondary"
            size="m"
            @click="isAutoplay = !isAutoplay"
        >
            Autospin {{ btnText }}
        </UiButton>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {UiButton} from '@sukacripta/uikit-soltokio/src'
import {useAutoplay} from '../composabe/useAutoplay';

const {isAutoplay} = useAutoplay();
const btnText = computed(() => isAutoplay.value ? 'On' : 'Off')
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
