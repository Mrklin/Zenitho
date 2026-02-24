<template>
    <div>
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        <section class="bg-sec p-4 md:p-8 w-full">
      <div class="max-w-7xl mx-auto text-sm">
        <div class="flex items-start">
          <span>Home / <span class="text-text">Wishlist</span> </span>
        </div>
      </div>
    </section>

        <section class="px-4 md:px-10 lg:px-20 my-10 md:my-20">
            <div v-if="wishlist.count === 0"
            class="text-2xl md:text-4xl w-full">
                Wishlist is Empty!
                <div>
                    <p>Add Items</p> <span><router-link class="font-light text-dark hover:text-red-700 pb-0.5 border-b border-b-dark" :to="{name:'dashboard'}">GO TO SHOP</router-link></span>
                </div>
            </div>

            <div v-else  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-3">
            
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