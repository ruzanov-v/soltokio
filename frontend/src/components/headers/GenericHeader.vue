<template>
    <UiContentWrapper>
        <div :class="$style.header">
            <div :class="[$style.s, $style.slot]">
                <slot name="start"></slot>
            </div>
            <div :class="[$style.c, $style.slot]">
                <slot></slot>
            </div>
            <div :class="[$style.e, $style.slot]">
                <slot name="end"></slot>
            </div>
        </div>
        <div>
            <slot name="bottom"></slot>
        </div>
    </UiContentWrapper>
</template>

<script lang="ts" setup>
import UiContentWrapper from '@/components/Ui/UiContentWrapper.vue'
</script>

<style module>
.header {
    display: grid;
    grid-template-areas: "s c e";
    grid-template-columns: 1fr max-content 1fr;
    height: 60px;
}
.slot {
    display: flex;
    align-items: center;
    flex-direction: row;
}
.s {
    grid-area: s;
    justify-content: flex-start;
}
.c {
    grid-area: c;
    justify-content: center;
}
.e {
    grid-area: e;
    justify-content: flex-end;
}
</style>
