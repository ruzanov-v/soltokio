<template>
    <UiOutlineText color="blue">
        {{ wallet.addressSevenSymbols }}
    </UiOutlineText>
</template>

<script lang="ts" setup>
import { useWallet } from '@/composable/useWallet';
import {UiOutlineText} from '@sukacripta/uikit-soltokio/src/index';
const {wallet} = useWallet()
</script>