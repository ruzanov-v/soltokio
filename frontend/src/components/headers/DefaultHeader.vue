<template>
    <GenericHeader>
        <template #start>
            <img src="/logo.svg"/>
        </template>
        <Transition
            :enterActiveClass="$style['ffffg-enter-active']"
            :leaveActiveClass="$style['ffffg-leave-active']"
            :enterFromClass="$style['ffffg-enter-from']"
            :leaveToClass="$style['ffffg-leave-to']"
        >
            <UserBalance v-if="wallet.isReady"/>
        </Transition>

        <template #end>
            <Transition
                mode="out-in"
                :enterActiveClass="$style['header-enter-active']"
                :leaveActiveClass="$style['header-leave-active']"
                :enterFromClass="$style['header-enter-from']"
                :leaveToClass="$style['header-leave-to']"
            >
                <UserProfileWidget v-if="wallet.isReady"/>
                <ConnectWalletWidget v-else/>
            </Transition>
        </template>

        <template #bottom>
            <Transition
                :enterActiveClass="$style['ffffg-enter-active']"
                :leaveActiveClass="$style['ffffg-leave-active']"
                :enterFromClass="$style['ffffg-enter-from']"
                :leaveToClass="$style['ffffg-leave-to']"
            >
                <div :class="$style.btns"  v-if="wallet.isReady">
                    <DepositButton/>

                    <UiButton>
                        Withdraw
                    </UiButton>
                </div>
            </Transition>
        </template>
    </GenericHeader>
</template>

<script lang="ts" setup>
import UserBalance from '@/components/molecule/UserBalance.vue'
import ConnectWalletWidget from '@/components/molecule/ConnectWalletWidget.vue'
import UserProfileWidget from '@/components/molecule/UserProfileWidget.vue';
import {UiButton} from '@sukacripta/uikit-soltokio/src'
import GenericHeader from './GenericHeader.vue'
import { useWallet } from '@/composable/useWallet';
import DepositButton from '../molecule/DepositButton.vue';

const {wallet} = useWallet()
</script>

<style module>
.btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
}


.header-enter-active,
.header-leave-active {
  transition: opacity 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045), transform 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.header-enter-from,
.header-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.ffffg-enter-active,
.ffffg-leave-active {
  transition: opacity 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045), transform 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.ffffg-enter-from,
.ffffg-leave-to {
  transform: translateY(-100%) scale(0);
  opacity: 0;
}
</style>
