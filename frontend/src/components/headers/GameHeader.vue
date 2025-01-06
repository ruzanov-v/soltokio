<template>
    <GenericHeader>
        <template #start>
            <UiCoinButton
                :angle="-5"
                to="/"
                style="width: 50px;"
            >
                <
            </UiCoinButton>
        </template>

        <UserBalance/>

        <template #end>
            <UiCoinButton 
                @click="open = true"
                :angle="7"
                style="width: 50px;"
            >
                ?
            </UiCoinButton>

            <UiDialog v-model:open="open">
                <SimpleSlotsDocRu/>
            </UiDialog>
        </template>
    </GenericHeader>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {UiCoinButton, UiDialog} from '@sukacripta/uikit-soltokio/src/index'
import GenericHeader from './GenericHeader.vue'
import UserBalance from '@/components/molecule/UserBalance.vue'
import {SimpleSlotsDocRu} from '@suka-game/simple-slots-promo';

const open = ref(false)
</script>
