<template>
    <RouterLink
        :to="to"
        draggable="false"
        :class="[$style.root, $style.none]"
        ref="container"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseleave"
    >
        <div :class="$style.main">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 467 121"
                preserveAspectRatio="xMidYMid meet"
                :class="[$style.mainBg, $style.none]"
            >
                <path fill="#341D1A" fill-opacity=".1" d="M17 24C20 14 29 6 40 6h415c7 0 12 5 12 12v91c0 7-5 12-12 12H24C9 121-3 107 1 91l16-67Z"/>
                <path fill="#341D1A" d="M17 18C20 8 29 0 40 0h415c7 0 12 5 12 12v91c0 7-5 12-12 12H24C9 115-3 101 1 85l16-67Z"/>
            </svg>

            <div :class="$style.content">
                <UiGameCardImage
                    :parallax="parallax"
                    :overflowDecorImg="item.overflowDecorImg"
                />
                <div :class="[$style.description]">
                    <UiButton
                        :class="$style.btnGo"
                        :forceHover="isMouseover"
                        color="secondary"
                    >
                        GO
                    </UiButton>
                    <img
                        v-if="item.gameNameImg"
                        :src="item.gameNameImg"
                        :class="[$style.none, $style.gameName]"
                    />

                    <div>
                        Jackpot: 30387.08 SOL
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import { useParallax } from '@vueuse/core'
import UiGameCardImage from './UiGameCardImage.vue'
import {UiButton} from '@sukacripta/uikit-soltokio/src'
import { RouterLink, type RouteLocationRaw } from 'vue-router';

defineProps<{
    to: RouteLocationRaw
    item: {
        overflowDecorImg?: string
        gameNameImg?: string
    }
}>()


const isMouseover = ref(false)
const container = ref(null)
const {roll, tilt} = useParallax(container)

const parallax = computed(() => {
    if (isMouseover.value) {
        return {
            roll: roll.value,
            tilt: tilt.value,
        }
    }

    return {
        roll: 0,
        tilt: 0,
    }
})

const handleMouseover = () => {
    isMouseover.value = true
}

const handleMouseleave = () => {
    isMouseover.value = false
}
</script>

<style module>
.description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
}

.none {
    pointer-events: none;
    user-select: none;
}
.root {
    display: block;
    width: 100%;
    max-width: 467px;
    padding-top: 40px;
    padding-inline: 16px;
    box-sizing: content-box;
    color: var(--ui-color-white);
    font-size: 20px;
}
.root:hover, .root:active {
    color: var(--ui-color-white);
}

.main {
    position: relative;
    pointer-events: all;
}

.mainBg {
    z-index: 0;    
}

.content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 20px;
    top:0;
    left: 0;
}

.description {
    flex-grow: 1;
}

.gameName {
    height: 30px;
}

.btnGo {
    position: absolute;
    inset-inline-end: -20px;
    inset-block-start: 50%;
    transform: translateY(-50%);
}

</style>