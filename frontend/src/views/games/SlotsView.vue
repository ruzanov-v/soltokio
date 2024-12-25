<template>
    <UiContentWrapper :class="$style.root">
        <SimpleSlotsComponent/>
    </UiContentWrapper>
</template>

<script setup lang="ts">
    import UiContentWrapper from '@/components/Ui/UiContentWrapper.vue'
    import {SimpleSlotsComponent} from '@suka-game/simple-slots-ui/src/entrypoint'
</script>

<style module>
.root {
    flex-grow: 1;
    width: 100%;
}
</style>
