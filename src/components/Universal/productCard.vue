
<template>
  <div @mouseenter="isHovered = true" @mouseleave="isHovered=false" 
    class="relative flex flex-col gap-3 group w-full max-w-70 mx-auto transition-all duration-300">
    
    <div class="absolute z-20 top-2 right-2 flex flex-col gap-1 lg:opacity-0 lg:-translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
      <span 
        v-for="action in actionButtons" 
        :key="action.id"
        class="group/icon relative bg-white p-2.5 sm:p-3 cursor-pointer shadow-md rounded-sm"
        @click.stop="handleAction(action.id, product)"
      >
        <Icon 
          :icon="getIcon(action, product)" 
          width="18" 
          class="transition-all duration-300 group-hover/icon:text-gray-500 active:scale-75" 
        />
        <div class="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 
                    bg-dark text-white text-[10px] rounded whitespace-nowrap
                    opacity-0 -translate-x-2 pointer-events-none transition-all duration-300 
                    group-hover/icon:opacity-100 group-hover/icon:translate-x-0 z-50">
          {{ getTooltip(action, product) }}
          <div class="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-dark rotate-45"></div>
        </div>
      </span>
    </div>

    <router-link :to="{ name: 'product', params: { id: product.id } }" 
      class="relative p-3 flex justify-center bg-[#f5f5f5] overflow-hidden aspect-9/11"> 
      <img  
        :src="isHovered && product.hover_image ? product.hover_image : product.image" 
        class="w-full h-full object-cover transition-all duration-700 ease-in-out lg:group-hover:scale-105" 
        :alt="product.name" 
      > 

      <!-- <div class="hidden lg:flex absolute bottom-4 left-0 right-0 px-4 flex-col items-center 
                  opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
         <div class="bg-white/90 backdrop-blur-sm p-2 flex flex-col items-center w-full rounded-sm shadow-sm">
           <span v-if="product.size && product.size.length" class="flex gap-2 mb-1">
            <p v-for="(size, index) in product.size" :key="index" class="text-[10px] text-text hover:text-dark uppercase font-medium">{{ size }}</p>
          </span> 

           <span v-if="product.subImg" class="flex gap-1">
            <span v-for="(subs, sindex) in product.subImg" :key="sindex" class="p-0.5">
              <img :src="subs.img" class="rounded-full w-5 h-5 object-cover cursor-pointer hover:ring-1 ring-dark" alt="">
            </span>
          </span>
          
          <span v-else-if="product.color && product.color.length" class="flex gap-1.5">
            <span v-for="(colObj, cIndex) in product.color" :key="cIndex" 
              :class="['rounded-full w-3 h-3 block border border-gray-200', colObj.col]"></span>
          </span> 
        </div> 
      </div> -->
    </router-link>

    <div class="flex flex-col gap-1 min-h-20 relative">
      <div class="relative h-6 overflow-hidden">
        <p class="absolute inset-0 transition-all duration-500 lg:group-hover:opacity-0 lg:group-hover:-translate-y-full text-sm font-medium truncate">
          {{ product.name }}
        </p>
        <span @click.stop="adding(product)" 
              class="hidden lg:block absolute inset-0 opacity-0 translate-y-full lg:group-hover:translate-y-0 lg:group-hover:opacity-100 text-red-500 text-sm font-semibold cursor-pointer transition-all duration-500">
          + Add to Cart
        </span>
      </div>

      <div class="flex items-center gap-2">
        <p class="text-sm font-bold text-dark">${{ product.price }}</p>
      </div>

      <button @click.stop="adding(product)" 
              class="lg:hidden mt-2 w-full border border-dark text-dark py-2 text-xs font-bold uppercase tracking-wider active:bg-dark active:text-white transition-colors">
        Add to Cart
      </button>
    </div>

    <ModalPop v-if="compareProduct" :value="true" @close="compareProduct = null">
      <div class="flex flex-col md:flex-row w-full max-h-[90vh] overflow-y-auto">
        <div class="w-full md:w-1/2 bg-gray-100">
          <img :src="compareProduct.image" class="w-full h-full object-cover" />
        </div>
        <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h2 class="text-2xl font-bold mb-2">{{ compareProduct.name }}</h2>
          <p class="text-xl text-red-500 font-bold mb-4">${{ compareProduct.price }}</p>
          <p class="text-gray-600 text-sm mb-6">{{ compareProduct.description }}</p>
          <button @click="adding(compareProduct)" class="bg-dark text-white py-3 rounded hover:bg-gray-800 transition-colors">Add to Cart</button>
        </div>
      </div>
    </ModalPop>

    <ModalPop v-if="selectedProduct" :value="true" @close="selectedProduct = null">
      <div class="flex flex-col md:flex-row w-full max-h-[90vh] overflow-y-auto">
        <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r">
          <div class="text-green-500 flex items-center gap-2 mb-4">
            <Icon icon="mdi:check-circle-outline" width="30" />
            <p class="font-medium">Added to cart!</p>
          </div>
          <div class="w-32 h-40 md:w-full md:h-80 bg-gray-100 rounded-md overflow-hidden">
            <img :src="selectedProduct.image" class="w-full h-full object-cover" />
          </div>
          <p class="text-dark mt-2 font-medium">{{ selectedProduct.name }}</p>
        </div>
        <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center gap-3">
          <h2 class="text-xs text-text uppercase">There are {{ cart.count }} items in your cart.</h2>
          <p class="text-lg text-dark font-bold">Total: ${{ Number(cart.cartTotal).toFixed(2) }}</p>
          <button @click="selectedProduct = null" class="w-full border border-dark px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">CONTINUE SHOPPING</button>
          <router-link :to="{name:'cart'}" class="w-full border border-dark bg-dark text-white px-4 py-2.5 text-sm text-center">VIEW CART</router-link>
          
          <label class="flex items-center gap-2 mt-2 cursor-pointer">
            <input v-model="isAgree" type="checkbox" class="accent-dark">
            <span class="text-text text-xs">I agree to terms & conditions</span>
          </label>
          
          <button @click="checkOut" :disabled="!isAgree" class="bg-dark text-white py-3 rounded transition-all disabled:opacity-40">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </ModalPop>
  </div>
</template>

<script setup>
import router from '@/router';
import { Icon } from '@iconify/vue';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useCartStore } from '@/stores/cartStore';
// import { useProductStore } from '@/stores/productStore';
import { ref } from 'vue';
import ModalPop from './ModalPop.vue';


const props = defineProps({
  product: Object
});

const wishlist = useWishlistStore();

const cart = useCartStore();

// const store = useProductStore();

const isAgree = ref(false);

// const goToProductId = (product) =>{
//     router.push({name:'product', params:{id:product.id}})
// }

const checkOut = () =>{
    router.push({name:'checkout'})
}

const actionButtons = [
  { 
    id: 'wishlist',
    baseIcon: 'ri:heart-line', 
    activeIcon: 'ri:close-line', 
    baseTooltip: 'Add to Wishlist', 
    activeTooltip: 'Remove from Wishlist' 
  },
  { id: 'compare', baseIcon: 'ri:share-line', baseTooltip: 'Compare' },
  { id: 'search', baseIcon: 'ri:search-line', baseTooltip: 'Quick view' },
];

const selectedProduct =ref(null)

const compareProduct = ref(null)

// const showSuccess  = ref(false)

const adding = async (product) => {
  try {
        await cart.addToCart(product);
        selectedProduct.value = product;
        // showSuccess.value = true
  } catch (error) {
    console.error("Add to cart failed", error);
  }
};

const getIcon = (action, product) => {

    if (!product || !product.id) return action.baseIcon;

  if (action.id === 'wishlist') {
    return wishlist.isInWishlist(product.id) ? action.activeIcon : action.baseIcon;
  } 
  return action.baseIcon;
};

const getTooltip = (action, product) => {
    if (!product || !product.id) return action.baseTooltip;

  if (action.id === 'wishlist') {
    return wishlist.isInWishlist(product.id) ? action.activeTooltip : action.baseTooltip;
  }
  return action.baseTooltip;
};

const isProcessing = ref(false);

const handleAction =  async (id, product) => {
  if (id === 'wishlist') {
    isProcessing.value = true;
    await wishlist.toggleWishlist(product);
    isProcessing.value = false;
  } else if (id === 'search') {
    compareProduct.value = product;
  }
//   else if (id === 'compare') {
//     // Handle compare logic
//   } 
};

const isHovered = ref(false);

</script>
<style>
    
</style>