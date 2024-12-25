<template>
    <UiContentWrapper>
        <div :class="$style.root">
            <div :class="$style.widget">
                <div :class="$style.content">
                    <UiNumber :value="123"/>
                </div>
            </div>
        </div>
    </UiContentWrapper>
</template>

<script setup lang="ts">
import UiContentWrapper from '../Ui/UiContentWrapper.vue';
import {UiNumber} from '@sukacripta/uikit-soltokio/src/index'

</script>

<style module>
.root {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.widget {
    --bg-color: #341D1A;
    height: 100px;
    width: 200px;
    position: relative;
}
.widget::after , .widget::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 0;
    aspect-ratio: 1;
    background-color: var(--bg-color);
    top: 0;
    height: 100%;
    border-radius: 24px 24px 16px 16px;
}

.widget::after {
    left: 100%;
    transform: skew(15deg) translateX(-50%);
}

.widget::before {
    right: 100%;
    transform: skew(-15deg) translateX(50%);
}

.content {
    background-color: var(--bg-color);
    height: 100%;
    position: relative;
    z-index: 1;
}
</style>