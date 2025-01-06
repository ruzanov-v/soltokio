<template>
    <UiBaseDialog v-model:open="isOpen">
        <div
            :class="$style.wrap"
            @mousemove="handleMouseenter"
            @mouseleave="handleMouseleave"
        >
            <UiAlertCloseBtn
                v-model:open="isOpen"
                :class="$style.clsBtn"
                :pause="isPausedAutoClose"
            />

            <div :class="$style.content">
                <div :class="$style.header">
                    <UiOutlineText
                        color="blue"
                        :class="$style.headerText"
                    >
                        {{ headerText }}
                    </UiOutlineText>
                </div>

                <div :class="$style.main">
                    <slot/>
                </div>

            </div>

            <svg
                :class="$style.bg"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 303 154"
                draggable="false"
            >
                <path
                    fill="#000"
                    fill-opacity=".1"
                    d="M260 136c-2.3 6.2-5.3 10.6-9.2 12.7-2.4 1.3-5.1 1.3-7.8 1.4L49 153c-4.5 0-8.4-1.7-11-5-1.7-2.4-2.7-5.3-4.2-8L4.1 84.7c-2.7-5-5.6-11.3-2.2-16 .6-.9 1.4-1.6 2.2-2.2 2.9-2 6.6-1.8 10-2.5L292 9c1.4-.2 2.7-.2 4 0 8.7 2 6.4 14.4 3.2 22.7L260 136Z"
                />
                <path
                    fill="#FFC434"
                    stroke="#515795"
                    stroke-width="3"
                    d="M286.8 2.5h-.1l-273 55c-3.1.6-6 2-8.1 4.3-2.5 2.6-2.8 5.9-2.2 9 .6 3 2.1 6.2 3.6 8.8l25.2 46.3a57.3 57.3 0 0 1 3 7l2.6 5.8c2 4.3 4.8 8.3 9.8 9.6 1.5.3 3 .4 4.4.3h2.1l1.9-.2 188-2.9c3.7 0 6.6-2.2 8.8-5 2.3-3 4-7 5.6-11l38.3-105.7c1-3 2.2-6.4 2.3-9.6.2-3.3-.6-6.6-3.4-9a11 11 0 0 0-8.8-2.7Z"
                />
            </svg>
        </div>
    </UiBaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {UiBaseDialog} from '../UiBaseDialog';
import UiAlertCloseBtn from './UiAlertCloseBtn.vue';
import UiOutlineText from '../UiOutlineText/UiOutlineText.vue';

defineProps<{
    headerText?: string
}>()
const isOpen = defineModel('open', {type: Boolean})
const isPausedAutoClose = ref(false)

const handleMouseenter = () => {
    isPausedAutoClose.value = true
}

const handleMouseleave = () => {
    isPausedAutoClose.value = false
}

</script>

<style module>
.wrap {
    --out-spacing-x: 10px;
    --bg-height: 154px;
    --bg-width: 303px;
    position: relative;
    overflow: hidden;
    user-select: none;
    padding-left: var(--out-spacing-x);
    padding-right: var(--out-spacing-x);
}

.bg {
    width: var(--bg-width);
    height: var(--bg-height);
    pointer-events: none;
    user-select: none;
}

.clsBtn {
    position: absolute;
    z-index: 2;
    inset-inline-end: calc(-1 * var(--out-spacing-x));
    inset-block-start: 12px;
    width: 50px;
}

.header {
    font-size: 20px;
    pointer-events: none;
    user-select: none;
    height: calc(var(--bg-height)* 0.45);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.headerText {
    transform-origin: center;
    transform: rotate(-12deg);
}

.main {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 0;
    padding-left: calc(var(--bg-width)* 0.15);
    padding-right: calc(var(--bg-width)* 0.18);
    padding-bottom: calc(var(--bg-height)* 0.13);
}
</style>
