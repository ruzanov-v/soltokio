<template>
    <dialog
        @cancel="handelCancel"
        @close="handelClose"
        ref="dialog"
        :class="$style.dialog"
    >
        <slot></slot>
    </dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const isOpen = defineModel('open', {type: Boolean})
const dialog = ref<HTMLDialogElement>()
const handelCancel = (event: Event) => {
    isOpen.value = false;
    event.preventDefault()
}

const handelClose = (event: Event) => {
    isOpen.value = false;
    event.preventDefault()
}

watch(isOpen, (isOpenValue) => {
    const dialogEl = dialog.value

    if (!dialogEl) {
        return
    }

    if (isOpenValue && !dialogEl.open) {
        dialogEl.showModal()
    } else if (!isOpenValue && dialogEl.open) {
        dialogEl.close()
    }
}, {immediate: true})
</script>

<style module>

.dialog {
    --backdrop-bg-img: url('data:image/svg+xml,<svg class="app-splash-bg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" fill="none"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" fill="none"><g clip-path="url(%23a)"><path fill="url(%23c)" d="m246 261-303 92-16-72 316-23-324-150 46-86 278 229L13-40l75-30 162 319L143-77l76-7 36 329 16-329 60 7-69 322L384-63l46 12-163 300L484-26l50 35-263 245L579 65l30 113-334 82 334 42-67 183-270-222 178 324-84 18-97-339 25 353-53-7 21-343-95 343-34-12 124-331L88 550l-23-16 185-268L-5 459l-19-30 270-168Z"/></g><defs><radialGradient id="c" cx="0" cy="0" r="0.7" gradientTransform="matrix(-262.4985 252.50208 -247.83234 -257.64389 264 258)" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(255,255,255,.3)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient><clipPath id="a"><path fill="%23fff" d="M0 0h512v512H0z"/></clipPath></defs></svg></svg>');
    --backdrop-bg-hsl: var( --ui-color-blue-hsl);
    --transition-duration: .3s;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    appearance: none;
    background: none;
    box-shadow: none;
    outline: none;
    border: none;
    padding: 0;

    transition: display var(--transition-duration) allow-discrete, overlay var(--transition-duration) allow-discrete;
    animation: ui-base-dialog-close var(--transition-duration) forwards;
}

.dialog[open] {animation: ui-base-dialog-open var(--transition-duration) forwards;}

.dialog::backdrop {
    background-color: hsla(var(--backdrop-bg-hsl), .9);
    background-image: var(--backdrop-bg-img);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: display var(--transition-duration) allow-discrete, overlay var(--transition-duration) allow-discrete;
    animation: ui-base-dialog-backdrop-close var(--transition-duration) forwards;
}
.dialog[open]::backdrop {
  animation: ui-base-dialog-backdrop-open var(--transition-duration) forwards;
}

@keyframes ui-base-dialog-backdrop-open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes ui-base-dialog-backdrop-close {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes ui-base-dialog-open {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ui-base-dialog-close {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
}
</style>