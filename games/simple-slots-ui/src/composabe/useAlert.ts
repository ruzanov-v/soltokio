import { ref } from 'vue';
import { createSharedComposable } from "@vueuse/core";

export const useAlert = createSharedComposable(() => {
    const isOpen = ref(false)

    return {
        isOpen
    }
})
