<template>
    <component
        :is="tag"
        :class="$style.root"
        :style="styleList"
        draggable="false"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 60 60"
            :class="$style.svg"
        >
            <path fill="#FFA013" stroke="#530D11" d="M50.9 46.4c3.5-2.7 5.7-5.4 6.9-8l-.5 1.5c-3 7.4-7.7 12.9-14.7 15.4l-.6.2-.6.2-5.2 1.2-2.7.2c-1.6 0-3.5 0-5.2-.2-7.7-1-15.2-4.4-20.6-10.7-2.5-3-4.3-6.2-5.4-9.5-1-3-1-5.1-1-6.8l.2-2a137.8 137.8 0 0 0 .6-3.3c0-.5.2-1 .3-1.3l.6-1.5c-.6 2.8-.4 5.4 0 7.6 1.2 5.7 5 12 10.5 16.2a36.4 36.4 0 0 0 19.8 7.6c5.8.4 12.2-2.9 17.6-6.8Z"/>
            <path fill="#FFA013" stroke="#530D11" d="M33.9 52.6c-7.4.7-15.6-2.6-21.7-7.9C6 39.4 2 32.1 2.8 24.7c1.1-12.3 13.6-20 26-18.4 19.6 2.6 29 16.8 30 27.6.4 5-2 9.4-6.5 12.6A36.9 36.9 0 0 1 34 52.6Z"/>
            <path fill="#FFBD5C" fill-rule="evenodd" d="M56.2 25.3a25 25 0 0 0-5.4-8.6L3.6 24.2a18.4 18.4 0 0 0 .7 9.5l51.9-8.4ZM6.9 16.5c12.3-2 27.2-4.2 36-5.7a31.8 31.8 0 0 0-10.4-3.4l-18.4 3-1.2.7a21 21 0 0 0-6 5.4Z" clip-rule="evenodd"/>
        </svg>
        <div :class="$style.content">
            <slot></slot>
        </div>
    </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';

const props = withDefaults(
    defineProps<{
        tag?: string | Component,
        angle?: number
    }>(),
    {
        tag: 'div',
        angle: 0,
    }
)

const styleList = computed(() => ({
    '--additional-angle': `${props.angle}deg`
}))
</script>

<style module>
.root {
    --angle: 0;
}

.root, .root:active, .root:focus, .root:hover {
    padding: 0;
    display: inline-block;
    appearance: none;
    background: transparent;
    border: transparent;
    outline: none;
    user-select: none;
    position: relative;
    aspect-ratio: 1;
    color: #341D1A;

    font-family: "Rubik Mono One", serif;
    font-weight: 400;
    font-style: normal;
    transform: rotate(calc(var(--additional-angle, 0deg) + var(--angle)));
    transition: transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.root:hover {
    --angle: 15deg;
}

.svg {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.content {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    line-height: 1;
    font-size: 30px;
}
</style>
