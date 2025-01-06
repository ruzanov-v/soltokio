<template>
  <div :class="$style.game">
    <WinModal/>
    <SlotMachine :class="$style.slots"/>
    <div :class="$style.bid">
      <UiOutlineText color="blue">
        Place a bid 
      </UiOutlineText>
      <PlaceBid/>
      <AutoplayWidget/>
    </div>
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
import AutoplayWidget from './components/AutoplayWidget.vue';

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
  flex-grow: 1;
  padding-inline: 8px;
}

.slots {
  flex-grow: 3;
  flex-shrink: 1;
}

.bid {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>