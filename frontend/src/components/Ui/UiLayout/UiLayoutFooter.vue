<template>
    <div :class="$style.root">
        <RouterView
            name="footer"
            v-slot="{ Component, route }"
        >
            <footer
                :class="{
                    [$style.footer]: true,
                    [$style.max]: Boolean(Component),
                }"
            >
                <FooterBg :class="$style.bg"/>
    
                <div :class="$style.content">
                    <transition
                        mode="out-in"
                        :enterActiveClass="$style['fade-enter-active']"
                        :leaveActiveClass="$style['fade-leave-active']"
                        :enterFromClass="$style['fade-enter-from']"
                        :leaveToClass="$style['fade-leave-to']"
                    >
                        <component
                            :is="Component"
                            :key="route.path"
                        />
                    </transition>
                </div>
            </footer>
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import FooterBg from './FooterBg.vue';
</script>

<style module>
.root {

}
.footer {
    --height: 100px;

    height: var(--height);
    transform: translateY(var(--height));
    transition: transform .3s ease-in-out;
}

.bg {
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    width: 100%;
    height: calc(100% + 50px);
}

.max {
    transform: translateY(0);
}

.content {
    position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
