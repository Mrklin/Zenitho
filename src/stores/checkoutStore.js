import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCheckOutStore = defineStore('checkoutStore', () => {

    const checkoutItems = ref([]);

    const getCheckoutItems = computed(() => checkoutItems.value);

    const getCheckoutTotal = computed(() => { 
        return checkoutItems.value.reduce((total, item) => {
            const price = parseFloat(item.price?.new || 0);
            return isNaN(price) ? total : total + (price * item.quantity);
        }, 0);
    });

    return {
        checkoutItems,
        getCheckoutItems,
        getCheckoutTotal,
    };
},{
    persist: true,
})
    