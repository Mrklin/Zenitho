<template>
    <div>
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        <section class="bg-sec px-10 py-8 w-full">
            <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
                
                <div class="flex items-start">
                    <span>Home  /  <span class="text-text">Wishlist</span> </span>
                </div>
            </div>
        </section>

        <section class="px-20 my-20">
            <div v-if="wishlist.count === 0"
            class="text-4xl w-full">
                Wishlist is Empty!
                <div>
                    <p>Add Items</p> <span><router-link class="font-light text-dark hover:text-red-700 pb-0.5 border-b border-b-dark" :to="{name:'dashboard'}">GO TO SHOP</router-link></span>
                </div>
            </div>

            <div v-else  class="grid grid-cols-4 justify-between gap-3">
            
                <productCard v-for="item in wishlist.items" :key="item.id" :product="item" />

            </div>
        </section>
        
    </div>
</template>
<script setup>
import { useWishlistStore } from '@/stores/wishlistStore';
import productCard from '../Universal/productCard.vue';
import { Toaster } from 'vue3-hot-toast'
import { onMounted } from 'vue';


const wishlist = useWishlistStore();

onMounted (async () => {
     await wishlist.fetchWishlist();
});

</script>
<style >
    
</style>