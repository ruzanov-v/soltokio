<template>
    <button
        :class="[$style.btn, ...classList]"
        draggable="false"
    >
        <div :class="[$style.shape, $style.back]">
            <div :class="[$style.content, $style.shape]">
                <slot></slot>
            </div>
        </div>
    </button>
</template>

<script lang="ts" setup>
import { computed, useCssModule } from 'vue';

const props = withDefaults(
    defineProps<{
        forceHover?: boolean,
        color?: 'primary' | 'secondary',
        shape?: 'square' | 'min-content'
        size?: 'l' | 'm',
    }>(),
    {
        forceHover: undefined,
        color: 'primary',
        size: 'l',
        shape: 'min-content'
    },
)

const $style = useCssModule()

const classList = computed(() => {
    const list: string[] = [
        $style[`color-${props.color}`],
        $style[`shape-${props.shape}`],
        $style[`size-${props.size}`],
    ]

    if (props.forceHover === true) {
        list.push($style['force-hover-true'])
    } else if (props.forceHover === false){
        list.push($style['force-hover-false'])
    }

    return list
})
</script>

<style module>
.btn {
    --inner-space-x: 24px;
    --inner-space-y: 2px;
    --shadow-size: 9px;
    --offset-y: calc(-1 * var(--shadow-size));
    --scale: 1;
    --font-size: 25px;
}

.btn, .btn:active, .btn:focus, .btn:hover {
    padding: var(--shadow-size) 0 0 0;
    display: inline-block;
    appearance: none;
    background: transparent;
    border: transparent;
    outline: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.btn:active {
    --scale: 0.95;
    --offset-y: 0;
}

@media (hover: hover) {
    .btn:hover:not(.force-hover-false) {
        --offset-y: 0;
    }
}

.force-hover-true {
    --offset-y: 0;
}

.color-primary {
    --shadow-color: #515895;
    --bg-color: #FEFEFF;
    --text-color: hsl(7, 33%, 15%);
    --text-shadow-color: hsla(7, 33%, 15%, .25);
}

.color-secondary {
    --shadow-color: #515895;
    --bg-color: #7A85F4;
    --text-color: #FEFEFF;
    --text-shadow-color: hsla(7, 33%, 15%, .25);
}

.back {
    background-color: var(--shadow-color);
    transition: transform 0.15s ease-in-out;
    transform: scale(var(--scale));
}

.shape {
    border-radius: 16px;
    box-sizing: border-box;
    height: var(--shape-height);
}

.shape-square .shape {
    aspect-ratio: 1;
    width: var(--size);
    --inner-space-x: 0;
    --inner-space-y: 0;
    --shape-height: var(--size)
}

.shape-min-content .shape {
    aspect-ratio: 1;
    width: min-content;
    --shape-height: var(--size)
}

.size-l {
    --size: 60px;
}

.size-m {
    --size: 42px;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    color: var(--text-color);
    background-color: var(--bg-color);
    border: solid #341D1A 2px;
    padding: var(--inner-space-y) var(--inner-space-x);
    transform: translateY(var(--offset-y));
    transition: transform 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    text-shadow: 0 4px 0 var(--text-shadow-color);
    font-size: var(--font-size);
    line-height: 1;

    white-space: nowrap;

    font-family: "Rubik Mono One", serif;
    font-weight: 400;
    font-style: normal;
}
</style>
