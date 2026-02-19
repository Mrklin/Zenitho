<template>
    <div v-if="props.value" class="fixed inset-0 z-90 flex items-center justify-center bg-dark/50 backdrop-blur-sm p-4">
        <div class="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl flex relative" >
            <button @click="closeModal" class="absolute top-4 right-4  z-10 p-2 hover:bg-gray-100 rounded-full">
                <Icon icon="ic:round-close" width="20" />
            </button>
            <slot></slot>

        </div>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    value: {
        type:Boolean,
        default: false,
    }
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close', false);
};

</script>

<style scoped>
</style>