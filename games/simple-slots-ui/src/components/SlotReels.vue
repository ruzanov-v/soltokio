<template>
    <div
        :style="data.styleList"
        :class="data.classList"
    ></div>
</template>

<script setup lang="ts">
    import { computed, useCssModule } from 'vue';
    import imageInline from './slot.svg?inline'

    const props = defineProps<{
        value: number,
        variantsCount: number,
        spin: boolean,
    }>()

    const $style = useCssModule()

    const data = computed(() => ({
        styleList: {
            backgroundImage: `url("${imageInline}")`,
            '--images-count': props.variantsCount,
            '--value': props.value - 1,
        },
        classList: {
            [$style.slot]: true,
            [$style.spin]: props.spin,
        },
    }))
</script>

<style module>
.slot {
    --current-position-y: calc(100% / (var(--images-count) - 1) * var(--value));
    flex-shrink: 0;
    flex-grow: 1;
    background-size: 100%;
    background-position-y: var(--current-position-y);
    background-position-x: center;
    background-color: #f7f7f7;
    background-blend-mode: normal;
    background-repeat: repeat-y;
    background-origin: border-box;
    background-clip: border-box;
    background-attachment: scroll;
    box-sizing: border-box;
    aspect-ratio: 54 / 96;
    border-inline: 2px solid #341d1a;
    border-bottom: 4px solid #341d1a;
    border-top: 4px solid #e5ba9a;
    border-radius: 10%;
    box-shadow: inset 0 16px 0 0 hsl(7deg 33% 15% / 9%), inset 0 -16px 0 0 hsl(7deg 33% 15% / 9%);
}

.spin {
    animation-name: game-simple-slots-rotate-slot;
    animation-duration: .3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

@keyframes game-simple-slots-rotate-slot {
  from { background-position-y: var(--current-position-y);}
  to { background-position-y: calc(var(--current-position-y) - 100%)}
}
</style>