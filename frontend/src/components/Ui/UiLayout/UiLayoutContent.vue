<template>
    <main :class="$style.main">
        <RouterView v-slot="{ Component, route }">
            <transition
                mode="out-in"
                :enterActiveClass="$style['content-enter-active']"
                :leaveActiveClass="$style['content-leave-active']"
                :enterFromClass="$style['content-enter-from']"
                :leaveToClass="$style['content-leave-to']"
            >
                <component :is="Component" :key="route.path"/>
            </transition>
        </RouterView>
    </main>
</template>

<style module>
.main {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
}

.content-enter-active,
.content-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.content-enter-from,
.content-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
