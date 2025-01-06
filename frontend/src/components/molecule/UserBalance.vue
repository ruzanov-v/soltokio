
<template>
    <div>
        <UiNumber :value="Number(balance.amount.toString())"/>
    </div>
</template>

<script setup lang="ts">
import { useUserBalance } from '@/composable/backend/useUserBalance';
import {UiNumber} from '@sukacripta/uikit-soltokio/src/index';

const {balance} = useUserBalance()
</script>
