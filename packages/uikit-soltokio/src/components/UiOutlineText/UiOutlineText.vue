<template>
    <span :class="classList">
        <slot/>
    </span>
</template>

<script lang="ts" setup>
import { computed, useCssModule } from 'vue';

const props = withDefaults(
    defineProps<{color?: 'white' | 'blue' | 'red' | 'gray'}>(),
    {color: 'white'}
)

const $style = useCssModule()
const classList = computed(() => {
    return [
        $style.outline,
        $style[`color-${props.color}`]
    ]
})
</script>

<style module>
.color-white {
    --text-color: hsl(var(--ui-color-white-hsl));
}

.color-blue {
    --text-color: hsl(var(--ui-color-blue-hsl));
}

.color-red {
    --text-color: hsl(var(--ui-color-red-hsl));
}

.color-gray {
    --text-color: hsl(var(--ui-color-gray-hsl));
}

.outline {
    --shadow-hsl: 7, 33%, 15%;
    --text-shadow: 4px 4px 4px hsla(var(--shadow-hsl), .25);
    --stroke-width: 2px;

    font-family: "Rubik Mono One", serif;
    font-weight: 400;
    font-style: normal;

    color: var(--text-color);
    text-shadow:
        var(--text-shadow),
        0 var(--stroke-width) 0 hsl(--shadow-hsl),
        var(--stroke-width) var(--stroke-width) 0 hsl(--shadow-hsl),
        var(--stroke-width) 0 0 hsl(--shadow-hsl),
        0 calc(-1 * var(--stroke-width)) 0 hsl(--shadow-hsl),
        calc(-1 * var(--stroke-width)) calc(-1 * var(--stroke-width)) 0 hsl(--shadow-hsl),
        calc(-1 * var(--stroke-width)) 0 0 hsl(--shadow-hsl),
        calc(-1 * var(--stroke-width)) var(--stroke-width) 0 hsl(--shadow-hsl),
        var(--stroke-width) calc(-1 * var(--stroke-width)) 0 hsl(--shadow-hsl);
}

@supports (-webkit-text-stroke: var(--stroke-width) hsl(var(--shadow-hsl))) {
    .outline {
        -webkit-text-fill-color: var(--text-color);
        -webkit-text-stroke: var(--stroke-width) hsl(var(--shadow-hsl));
        text-shadow: var(--text-shadow);
    }
}
</style>