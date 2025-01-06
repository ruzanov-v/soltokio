<template>
    <div :class="classList">
        <input
            :type="type"
            v-model="value"
            :class="$style.input"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';

const props = withDefaults(
    defineProps<{
        type?: 'number' | 'text',
        size?: 'l'
    }>(),
    {
        type: 'text',
        size: 'l',
    },
)
const value = defineModel<string | number | bigint>()
const $style = useCssModule()

const classList = computed(() => {
    return [
        $style.root,
        $style[`type-${props.type}`],
        $style[`size-${props.size}`]
    ]
})
</script>

<style module>
.root {
    display: inline-flex;
    background-color: #887C7B;
    border-radius: 16px;
    border: 2px solid #341D1A;
    height: var(--size);

    box-shadow: inset 0 7px 0 0 rgba(0,0,0,0.25);

    min-width: 200px;
    width: min-content;
}

.size-l {
    --size: 64px;
    --inner-spacing-x: 12px;
} 

.type-number {
    --text-align: right
}

.input, .input[type="number"], .input[type="number"]:focus, .input:hover .input[type="number"]:hover {
    width: 100%;
    appearance: none;
    display: block;
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    box-shadow: none;
    outline: none;

    text-align: var(--text-align, left);

    font-family: "Rubik Mono One", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;

    text-shadow: 0 4px 0 rgba(0,0,0,0.8);
    padding-inline: var(--inner-spacing-x);
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  appearance: none;
  display: none;
  margin: 0;
}
</style>
