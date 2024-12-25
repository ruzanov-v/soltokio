<template>
  <div :class="$style.game">
    <WinModal/>
    <SlotMachine/>
    <UiOutlineText color="blue">
        Place a bid 
    </UiOutlineText>
    <PlaceBid/>
    <SpinBtn/>
  </div>
</template>

<script setup lang="ts">
import {UiOutlineText} from '@sukacripta/uikit-soltokio/src';
import PlaceBid from './components/PlaceBid.vue'
import SpinBtn from './components/SpinBtn.vue'
import SlotMachine from './components/SlotMachine.vue'
import {useBackend} from './composabe/useServer';
import WinModal from './components/WinModal.vue';

const {setToken} = useBackend()

setToken('0x000000000000000000000000000000')
</script>

<style module>
.game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
</style>