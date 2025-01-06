<template>
    <UiCoinButton @click="handleClose">
        <div :class="$style.root">
            <div :class="$style.progress">
                x
            </div>
            <div
                ref="overEl"
                :class="$style.over"
            >
                x
            </div>
        </div>
    </UiCoinButton>
</template>

<script setup lang="ts">
import { useAnimate } from '@vueuse/core'
import { UiCoinButton } from '../UiCoinButton'
import { ref, watch } from 'vue'

const props = defineProps<{pause: boolean}>()
const overEl = ref<HTMLElement>()
const isOpen = defineModel('open', {type: Boolean})

const {
    play,
    pause,
    finish,
    playState,
    pending,
} = useAnimate(
    overEl,
    {height: 0},
    {
        duration: 1500,
        fill: 'both',
    },
)

watch([() => props.pause, isOpen, pending], ([isPauseValue, isOpenValue]) => {
    if (!isOpenValue) {
        finish()
    } else if (isPauseValue) {
        pause()
    } else {
        play()
    }
}, {immediate: true})

watch(playState, (state) => {
    if (state === 'finished') {
        handleClose()
    }
}, {immediate: true})

const handleClose = () => {
    isOpen.value = false
}
</script>

<style module>
.root {
    --height: 30px;
    position: absolute;
    overflow: hidden;
    contain: paint;
    height: var(--height);

    text-transform: uppercase;
}

.progress {
    color: #AB5C52;
}

.over {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    height: var(--height);
    will-change: height;
}
</style>
