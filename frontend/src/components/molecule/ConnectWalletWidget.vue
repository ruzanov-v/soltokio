<template>
    <div>
        <UiButton
            @click="connect"
            size="m"
        >
            Connect Wallet
        </UiButton>
    </div>
</template>

<script lang="ts" setup>
    import {UiButton} from '@sukacripta/uikit-soltokio/src/index';
    import {useWallet} from '@/composable/useWallet';

    const {connect} = useWallet()
</script>