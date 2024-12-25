<template>
    <UiOutlineText :class="[$style.number]" color="red">{{ number.int }}</UiOutlineText>
    <UiOutlineText :class="[$style.number]" color="white">.</UiOutlineText>
    <UiOutlineText :class="[$style.number]" color="gray">{{ number.frac }}</UiOutlineText>
</template>

<script lang="ts" setup>
import {UiOutlineText} from '@sukacripta/uikit-soltokio/src/index';
import { computed } from 'vue';

const props = defineProps<{value: number}>();
const number = computed(() => {
    let [int, frac] = props.value.toString().split('.')

    if (!frac) {
        frac = '00'
    }

    return {
        int,
        frac,
    }
})
</script>

<style module>
.number {
    line-height: 1;
    font-size: 30px;
}
</style>
