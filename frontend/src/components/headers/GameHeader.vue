<template>
    <GenericHeader>
        <template #start>
            <UiCoinBg 
                :tag="RouterLink"
                :angle="-5"
                to="/"
                style="width: 50px;"
            >
                <
            </UiCoinBg>
        </template>

        <UserBalance/>

        <template #end>
            <UiCoinBg 
                :tag="RouterLink"
                :angle="7"
                to="/"
                style="width: 50px;"
            >
                ?
            </UiCoinBg>
        </template>
    </GenericHeader>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import UiCoinBg from '../Ui/UiCoinBg.vue';
import GenericHeader from './GenericHeader.vue'
import UserBalance from '@/components/molecule/UserBalance.vue'
</script>
