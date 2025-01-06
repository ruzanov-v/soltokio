<template>
    <UiContentWrapper :class="$style.root">
        <div :class="$style.gameList">
            <UiGameCard
                to="/games/slots"
                :item="{
                    overflowDecorImg: '/slots-decor.svg',
                    gameNameImg: '/slots-name.png',
                }"
            />
            <UiGameCard
                to="/games/lotto"
                :item="{
                    overflowDecorImg: './lotto-decor.svg',
                    gameNameImg: '/slots-name.png',
                }"
            />
            <UiGameCard
                to="/games/solorocket"
                :item="{
                    overflowDecorImg: '/slots-decor.svg',
                    gameNameImg: '/slots-name.png',
                }"
            />
        </div>
    </UiContentWrapper>
</template>

<script setup lang="ts">
    import UiContentWrapper from '@/components/Ui/UiContentWrapper.vue'
    import UiGameCard from '@/components/Ui/UiGameCard/UiGameCard.vue'
</script>

<style module>
.root {
    flex-grow: 1;
    width: 100%;
}
.gameList {
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  flex-grow: 1;
}
</style>
