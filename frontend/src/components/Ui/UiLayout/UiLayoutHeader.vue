<template>

    <header :class="$style.header">
        <div :class="$style.bg"></div>
        <div :class="$style.content">
            <RouterView
                name="header"
                v-slot="{Component}"
            >
                <transition
                    mode="out-in"
                    :enterActiveClass="$style['header-enter-active']"
                    :leaveActiveClass="$style['header-leave-active']"
                    :enterFromClass="$style['header-enter-from']"
                    :leaveToClass="$style['header-leave-to']"
                >
                    <component :is="Component"/>
                </transition>
            </RouterView>
        </div>
    </header>
</template>

<script setup lang="ts">
</script>

<style module>
.bg {
    --size: 20px;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    border: none;
    background: #FFF6DE;

    --mask:
    radial-gradient(21.87px at 50% calc(100% - 30.8px),#000 99%,#0000 101%) calc(50% - 28px) 0/56px 100%,
    radial-gradient(21.87px at 50% calc(100% + 16.8px),#0000 99%,#000 101%) 50% calc(100% - 14px)/56px 100% repeat-x;
        -webkit-mask: var(--mask);
            mask: var(--mask);
}

.content {
    position: relative;
    z-index: 1;
}

.header {
    position: relative;
    width: 100%;
    height: 120px;
}

.header-enter-active,
.header-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
