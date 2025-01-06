<template>
    <UiBaseDialog v-model:open="isOpen">
        <div :class="$style.wrap">
            <div :class="$style.content">
                <div :class="$style.scroll">
                    <slot/>
                </div>
            </div>
        </div>
    </UiBaseDialog>
</template>

<script setup lang="ts">
import {UiBaseDialog} from '../UiBaseDialog';

defineProps<{
    headerText?: string
}>()
const isOpen = defineModel('open', {type: Boolean})
</script>

<style module>
.wrap {
    perspective: 800px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 20px 60px 60px 60px;
}
.content {
    --bg-hsl: var(--ui-color-blue-hsl);
    --inner-spacing-x: 10px;
    --inner-spacing-y: 10px;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    height: 100%;
    max-width: 900px;
    max-height: 900px;
    padding-left: var(--inner-spacing-x);
    padding-right: var(--inner-spacing-x);
    padding-top: var(--inner-spacing-y);
    padding-bottom: var(--inner-spacing-y);
    background-color: hsl(var(--bg-hsl));
    border-width: 4px;
    border-style: solid;
    border-color: #341D1A;
    border-radius: 18px;
    transform: rotate3d(1, 0, 0, 7deg);
    font-size: 32px;
}

.scroll {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
}

/* total width */
.scroll::-webkit-scrollbar {
    background-color: hsl(var(--bg-hsl));
    width: 16px;
}

/* background of the scrollbar except button or resizer */
.scroll::-webkit-scrollbar-track {
    background-color: hsl(var(--bg-hsl));
}

/* scrollbar itself */
.scroll::-webkit-scrollbar-thumb {
    background-color: #fefefe;
    border-radius: 16px;
}

/* set button(top and bottom of the scrollbar) */
.scroll::-webkit-scrollbar-button {
    display:none;
}
</style>
