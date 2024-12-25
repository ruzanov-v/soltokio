<template>
    <div
        :class="$style.root"
    >
        <div 
            :class="$style.scene"
            :style="styles.scene"
        >
            <img
                v-if="overflowDecorImg"
                :src="overflowDecorImg"
                :class="[$style.overflowDecor, $style.none]"
                :style="styles.layer2"
                draggable="false"
            />
            <div :class="$style.wrap" :style="styles.layer0">
                <div :class="$style.imgWrap">
                    <img
                        draggable="false"
                        :class="$style.img"
                        src="/slots-img.svg"
                        :style="styles.layer1"
                    />
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="165"
                    height="138"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 165 138"
                    :class="$style.bg"
                    
                >
                    <path fill="#FFDC58" d="M26.6 13.7A18 18 0 0 1 44.1 0H149a16 16 0 0 1 16 16v106a16 16 0 0 1-16 16H19a18 18 0 0 1-17.5-22.3l25.1-102Z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{
    parallax: {
        roll: number,
        tilt: number,
    },
    overflowDecorImg?: string,
}>()

const styles = computed(() => ({
    scene: {
        transform: `rotateX(${props.parallax.roll * 20}deg) rotateY(${props.parallax.tilt * 20}deg)`,
        transition: 'transform 0.15s linear',
    },
    layer0: {
        transform: `translateX(${props.parallax.tilt * 10}px) translateY(${props.parallax.roll * 10}px)`,
        transition: 'transform 0.15s linear',
    },
    layer1: {
        transform: `translateX(${props.parallax.tilt * 20}px) translateY(${props.parallax.roll * 20}px)`,
        transition: 'transform 0.15s linear',
    },
    layer2: {
        transform: `translateX(${props.parallax.tilt * 5}px) translateY(${
            props.parallax.roll * 5
  }px)`,
  transition: 'transform 0.15s linear',
    }
}))
</script>

<style module>
.root {
    user-select: none;
    width: 35.7%;
    margin-inline-start: 12px;
    margin-bottom: 22px;
    max-width: 165px;
    max-height: 115px;
    flex-shrink: 0;
    perspective: 300px;
}

.scene {
    position: relative;
    width: 100%;
    height: 100%;
}

.overflowDecor {
    position: absolute;
    inset-inline-start: -16px;
    inset-block-start: 24px;
    z-index: 3;
    width: 85%;
    pointer-events: none;
}

.bg {
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
}

.wrap {
    z-index: 1;
    aspect-ratio: 1;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
}

.imgWrap {
    z-index: 1;
    aspect-ratio: 1;
    overflow: hidden;
    width: 120%;
    position: absolute;
    bottom: 0;
    left: -10%;
    pointer-events: none;
}

.img {
    position: absolute;
    z-index: 1;
    aspect-ratio: 1;
    width: 120%;
    top: 10%;
    left: -10%;
}
</style>
