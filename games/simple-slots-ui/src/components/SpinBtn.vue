<template>
    <button
        :class="[$style.root, classList]"
        type="button"
        @click="spin"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="214"
            height="137"
            fill="none"
            :class="$style.svg"
        >
            <path fill="#B8D2E4" stroke="#341D1A" d="M6.6 77.3v.1c0 2.6 1.1 5 3 7 2 2.2 4.9 4.2 8.3 6 6.9 3.7 16.3 6.7 26.8 9.1 21 4.9 46 7.3 62.7 7.3 9.4 0 33-1.3 55-5.5 11-2.1 21.6-5 30-8.7 8.2-3.8 14.3-8.5 16-14.5v-.2c-1.8-8.4-5.4-21.1-10.4-32.6a88.2 88.2 0 0 0-8.6-15.7c-3.2-4.5-6.8-8.1-10.7-10-3.5-1.7-8.5-3-14.3-4-5.7-1.2-12.4-2-19.2-2.6a456.3 456.3 0 0 0-39.2-1.4c-10.5 0-24.7.3-38 1.4a193 193 0 0 0-18.8 2.5c-5.6 1-10.4 2.4-13.8 4.1A29.6 29.6 0 0 0 25 29.5c-3.1 4.4-6 9.9-8.4 15.5-4.8 11.4-8.3 24-10 32.3Z"/>
            
            <g :class="$style.btn">
                <path fill="#F7405E" stroke="#341D1A" d="m188.9 52.1.2-.2-.1-.2a129 129 0 0 0-8.5-24.1c-2.1-4.3-4.5-8.5-7.1-11.8-2.6-3.4-5.6-6-8.7-7.4-5.7-2.5-16.1-4-27.2-4.8-11-.9-23-1.1-31.7-1-8.5-.1-20.2.1-31 1-10.9.8-21 2.3-26.6 4.8a23 23 0 0 0-8.4 7.2 64.2 64.2 0 0 0-6.9 11.5 130.7 130.7 0 0 0-9 26.1 6 6 0 0 0 1.9 4c1.1 1.3 2.8 2.5 4.9 3.6a74.1 74.1 0 0 0 17.7 5.9C63.3 70 83.8 72 106.5 72c22.7 0 43.2-2 58.1-5.3a74.1 74.1 0 0 0 17.7-6c2.1-1 3.8-2.2 5-3.5a6 6 0 0 0 1.7-4l-.1-1Z"/>
                <path fill="#AB1C34" fill-rule="evenodd" d="m24.5 53.4-4.3 21.2h.3l-.3 1.5c0 11.3 38.5 20.5 86 20.5 47.3 0 85.8-9.2 85.8-20.5 0-.5 0-1-.2-1.5h.2L188.6 53v.2c0 10.1-36.8 18.3-82.1 18.3-45 0-81.5-8-82-18Z" clip-rule="evenodd"/>
                <path fill="#341D1A" d="m20.2 74.6-1-.2-.1.9.9.2.2-1Zm4.3-21.2h1l-2-.2 1 .2Zm-4 21.2 1 .3.2-1-1-.2-.2 1Zm171.3 0-.3-1-1 .3.3 1 1-.3Zm.2 0 .3 1 .8-.3-.1-.9-1 .2ZM188.6 53l1-.2-.4-2.6-1.4 2.2.8.6Zm0 .2-1-.5v.5h1ZM21.1 74.8l4.3-21.2-2-.4-4.2 21.2 2 .4Zm-.5-1.1-.2-.1-.5 2h.2l.5-2Zm.5 2.4c0-.4 0-.8.2-1.2l-2-.6-.2 1.8h2Zm85 19.5c-23.7 0-45.1-2.3-60.6-6-7.7-1.8-13.9-4-18.1-6.4-4.3-2.4-6.3-4.9-6.3-7.1h-2c0 3.4 3 6.4 7.3 8.8a74.7 74.7 0 0 0 18.7 6.6c15.6 3.8 37.1 6 61 6v-2ZM191 76c0 2.2-2 4.7-6.3 7a72.8 72.8 0 0 1-18.1 6.5c-15.4 3.7-36.8 6-60.5 6v2c23.8 0 45.3-2.3 61-6a74.7 74.7 0 0 0 18.6-6.7c4.4-2.4 7.3-5.4 7.3-8.8h-2Zm-.2-1.2.2 1.2h2l-.3-1.8-1.9.6Zm.9-1.3h-.2l.6 2h.2l-.6-2Zm-4-20.5 3.3 21.6 2-.3-3.4-21.6-2 .3Zm.1-.7-.1.3 1.7 1v-.2l-1.6-1Zm-.3.8c0 1-.4 2-1.4 3-1 1.1-2.5 2.2-4.5 3.3-4 2-10 4-17.3 5.7a278.3 278.3 0 0 1-57.8 5.3v2c22.7 0 43.3-2 58.2-5.4a74.6 74.6 0 0 0 17.8-5.9c2.2-1.1 3.9-2.3 5-3.6 1.3-1.3 2-2.8 2-4.4h-2Zm-81 17.3c-22.4 0-42.7-2-57.5-5.2a74.7 74.7 0 0 1-17.3-5.7c-2-1-3.6-2.1-4.7-3.2-1-1-1.5-2-1.5-3h-2c0 1.6.9 3 2.1 4.4 1.2 1.3 3 2.5 5.1 3.6a76.6 76.6 0 0 0 18 5.8c14.8 3.3 35.3 5.3 57.8 5.3v-2Z"/>
                <path fill="#E43552" fill-rule="evenodd" d="M30.1 34.9a586.8 586.8 0 0 1 152.8-.3c-4.4-11-10.8-22.4-18.6-25.8C153.1 4 123 3 105.5 3c-17 0-46.3 1-57.2 5.8-7.6 3.4-13.9 15-18.2 26Z" clip-rule="evenodd"/>
                <g filter="url(#game-simple-slots-spin-btn-txt-filter)">
                    <path fill="#FEFEFF" fill-rule="evenodd" d="m125.4 21 2.6 27.8h13l-2.1-9 18.5 7.7-7-27.7h-10.7l1.3 10.7-15.6-9.5Zm-46.2 6.1 4-6.5c-3-.8-10.2-1.7-15.6 1.7C61 26.5 59.4 32 63.5 34s8.4 4.3 4.9 5c-2.8.6-6.4-.8-7.8-1.6l-5 8.7c4.4 1.6 14.7 3.7 20.4-.7 7.1-5.5 7.5-12.9.7-15-6.7-2.1-8.2-3.9-4.5-4.5 3-.5 6 .6 7 1.2Zm4 21 3-26.3c1.2-.5 5-1.4 10.4-1.5 6.8-.2 14.3 1.5 11.9 10.3-2 7.1-11 10.4-15.4 11.2L91.5 48H83Zm10.3-15.7.7-4.8c1.8 0 5 .5 4.2 2.5-1 2-3.7 2.4-5 2.3ZM111 48.1l-.6-27.3h11v26.7l-10.4.6Z" clip-rule="evenodd"/>
                </g>
            </g>

            <path fill="#5E6D84" stroke="#341D1A" d="m7.5 77.5-1-.1c-1.8 7.3-3.2 13.2-4 17.7-1 4.5-1.5 7.7-1.5 9.7 0 4.4 3.1 8.4 8.5 12a82.6 82.6 0 0 0 22.7 9.5c19.2 5.4 45.6 8.8 74.8 8.8 29.2 0 55.6-3.4 74.7-8.8 9.6-2.7 17.4-5.9 22.8-9.5 5.4-3.6 8.5-7.6 8.5-12 0-2.4-.5-6.3-1.3-11-.9-4.6-2-10-3.3-15.6l-.2-1-.6.8c-8 9.2-18.6 15-34.5 19-16 4-37 6.2-66.1 8.5a329.1 329.1 0 0 1-69.6-10.6c-9-2.6-16.5-5.5-21.7-8.5-2.5-1.5-4.6-3-6-4.5a7.6 7.6 0 0 1-2.2-4.4Z"/>
            <path fill="#B8D2E4" d="M192.5 75c-1.9 11.6-40 20.5-86.5 20.5-46.6 0-84.6-8.9-86.5-20.5L7 77c.1 19 67.1 29.3 100.4 29.3 18.7 0 97.6-7.3 100.1-28.8l-15-2.5Z"/>
            <path stroke="#341D1A" stroke-linejoin="bevel" d="M7 76.5c.1 19 67.1 29.8 100.4 29.8 18.7 0 94.5-5.7 101-28.8"/>
            <path stroke="#341D1A" stroke-linejoin="bevel" d="M192.5 75c-1.9 11.6-40 20.5-86.5 20.5-46.6 0-84.6-8.9-86.5-20.5"/>

            <defs><filter id="game-simple-slots-spin-btn-txt-filter" width="101.8" height="29" x="55.6" y="19.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="-1"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="shape" result="effect1_innerShadow_222_779"/></filter></defs>
        </svg>
    </button>
</template>

<script lang="ts" setup>
import { GameStatus } from '@suka-game/simple-slots-shared/src/types';
import { useGameState } from '../composabe/useGameState';
import { useSpin } from '../composabe/useSpin';
import { computed, useCssModule } from 'vue';

const $style = useCssModule()
const {status} = useGameState()
const {spin} = useSpin()
const classList = computed(() => ({[$style.force]: status.value === GameStatus.requestSpin}))
</script>

<style module>
.root, .root:active, .root:focus, .root:hover {
    padding: 0;
    display: inline-block;
    appearance: none;
    background: transparent;
    border: transparent;
    outline: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.root {
    --push: 0;
}

@media (hover: hover) {
    .root:hover {
        --push: 0.5;
    }
}

.root:active, .force {
    --push: 2;
}

.svg {
    pointer-events: none;
}

.btn {
    transition: transform 0.1s ease-in-out, filter 0.1s ease-in-out;
    transform: translate(0, calc(3px * var(--push)));
    filter: saturate(calc(1 + 0.2 * var(--push)));
}
</style>
