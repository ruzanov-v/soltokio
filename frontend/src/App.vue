<script setup lang="ts">
import UiBaseDialog from '@sukacripta/uikit-soltokio/src/components/UiBaseDialog/UiBaseDialog.vue';
import UiLayout from './components/Ui/UiLayout/UiLayout.vue'
import { useUserBalance } from './composable/backend/useUserBalance';

useUserBalance()
</script>

<template>
  <UiBaseDialog></UiBaseDialog>
  <UiLayout></UiLayout>
</template>
