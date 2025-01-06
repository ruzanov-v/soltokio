<template>
    <div
        :class="[$style.layout, $style.section]"
        :style="styleList"
    >
        <UiLayoutHeader/>
        <UiLayoutContent :class="$style.content"/>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1505" height="377"
            fill="none"
            :class="[$style.l, $style.l0]"
            preserveAspectRatio="xMidYMid meet" viewBox="0 0 1505 377">
            <path fill="#CDFDFD" fill-opacity=".5" d="M1505 126a63 63 0 1 0-66-49 63 63 0 0 0-76 74 63 63 0 0 0-11 111c-8-1-16-1-24 2-11 5-16 13-19 22a71 71 0 0 0-58-30c-22 0-29 13-39 30-7 12-15 27-32 41-21 17-106 32-141 38H356c-21-2-82-8-98-51-10-26-23-50-50-50h-2a63 63 0 0 0-99-22l-2-6c-3-10-18-16-25-18 0-2 0-6-2-11a66 66 0 0 0-4-122l1-10a63 63 0 1 0-89 58 66 66 0 0 0 8 49v255h1511V126Z"/>
            <path stroke="#8EA3CA" d="M42 262c5 0 15 1 18 5l3 6m80-6-15-2m59 47c2-1 11-1 14 1 4 3 9 13 9 18m1113-26c1-3 7-9 11-10s16 2 19 5m89-61c3 0 9-2 14 0h5"/>
        </svg>

        <UiLayoutFooter/>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UiLayoutFooter from './UiLayoutFooter.vue';
import UiLayoutContent from './UiLayoutContent.vue';
import UiLayoutHeader from './UiLayoutHeader.vue';

const route = useRoute()
const styleList = computed(() => {
    return {
        backgroundColor: route.meta?.layout?.bgColor ?? '#FFA013',
        transition: 'background-color 0.25s ease-in-out',
    }
});
</script>

<style module>
.layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
}



.content {
    flex-grow: 1;
}


.l {
    pointer-events: none;
}

.l0 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
}
</style>
