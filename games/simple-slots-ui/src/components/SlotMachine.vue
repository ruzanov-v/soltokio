<template>
    <div
        :class="$style.root"
        v-if="gameOptions"
    >
        <div :class="$style.wrap">
            <div :class="$style.slots">
                <SlotReels
                    v-for="i in result"
                    :variantsCount="gameOptions?.variantsCount"
                    :value="i"
                    :spin="status === GameStatus.spin || status === GameStatus.requestSpin"
                />
                <svg
                    :class="[$style.hand, $style.handLeft]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 40"
                    fill="none"
                    draggable="false"
                >
                    <path stroke="#341D1A" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 2C4 8-2 22 5 30c9 10 23-1 31-1 6-1 10 1 11 2"/>
                </svg>

                <svg
                    :class="[$style.hand, $style.handRight]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 40"
                    fill="none"
                    draggable="false"
                >
                    <path stroke="#341D1A" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M42 6c4 7 9 22 1 29-9 9-23-3-30-4-6-1-10 1-11 1"/>
                </svg>

            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 242 22" draggable="false">
                <ellipse cx="120.8" cy="14.5" fill="#B18800" fill-opacity=".3" rx="120.8" ry="7"/>
                <path fill="#341D1A" d="M55.7 16.4V0H45v8.3c-2.8-1.5-9.2-3.7-12 0-3 3.8.3 7 2.3 8.1h20.3Zm118.7 0V0H185v8.3c2.8-1.5 9.2-3.7 12 0 3 3.8-.3 7-2.3 8.1h-20.3Z"/>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { GameStatus } from '@suka-game/simple-slots-shared/src/types';
    import { useGameState } from '../composabe/useGameState';
    import SlotReels from './SlotReels.vue';

    const {result, status, gameOptions} = useGameState()
</script>

<style module>
.root {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding-inline: 16px;
}
.wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    width: 100%;
}
.slots {
    user-select: none;
    pointer-events: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #A5DFF7;
    position: relative;
    gap: 3.5%;
    padding-inline: 6%;
    aspect-ratio: 15 / 8;
    width: 100%;
    border-radius: 10% / 20%;
    border: 4px solid #341d1a;
    box-sizing: border-box;
    box-shadow: inset 0 10px 0 0 #1EA8DD, inset 0 -10px 0 0 #1EA8DD;
}
.hand {
    position: absolute;
    bottom: 0;
    pointer-events: all;
    user-select: none;
}
.hand path {
    transition: d 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.handRight {
    width: 20%;
    right: -3.6%;
}
.handRight:hover path {
  d: path("M42 5c4 7 16 27-7 27-2 0-12-4-14-14C18 9 9 7 8 8");
}
.handLeft {
    left: -3.6%;
    width: 20%;
}
.handLeft:hover path {
  d: path("M8 2C4 8-8 18 15 25c13 3 14-5 18-10 3-5 11-10 12-9");
}
.tmp-n {
    font-size: 64px;
    line-height: 1;
    color: #9c1d28;
}
</style>