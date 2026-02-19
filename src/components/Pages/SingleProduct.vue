<template >
    <div>
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        <section class="bg-sec px-10 py-8 w-full">
            <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
                
                <div class="flex items-start">
                    <span class="cursor-pointer"><router-link :to="{name: 'dashboard'}">Home</router-link> / 
                         <span class="text-text">{{ product?.name }}</span> </span>
                </div>
            </div>
        </section>

        <section class="mt-7 px-20">

            <div v-if="store.loading">
                Loading...
            </div>

            <div v-else-if="product"
             class="flex gap-4 w-full">

                <div class="flex flex-col">
                    <span>
                        <img :src="product?.image" :alt="product?.name"
                        class="inset-0 w-120 aspect-12/15">
                    </span>
                    <span v-if="product.subImg" class="flex gap-2 justify-between">
                        <span v-for="(subs, sindex) in product.subImg" :key="sindex" 
                         class="group/swatch relative p-1">
                          <img :src="subs.img" class=" w-20 h-20 cursor-pointer bg-dark hover:border" alt="">
                          <div class="absolute bottom-full mb-2 left-1/2 transition-all ease-in-out duration-300 -translate-x-1/2 px-2 py-1 bg-dark text-white 
                           text-[9px] rounded opacity-0 pointer-events-none group-hover/swatch:opacity-100 ">
                                {{ subs.tooltip }}
                            <div class="absolute -bottom-1 left-1/2 duration-300 transition-all ease-in-out -translate-x-1/2 w-2 h-2 bg-dark rotate-45"></div>
                          </div>
                        </span>
                    </span>
                </div>

                <div class="flex flex-col gap-4">
                    <h1 class="text-text text-2xl">{{ product.name }}</h1>
                    <span class="flex gap-2">
                        <p>${{ Number(product.price).toFixed(2) }}</p> 
                        <!-- <p v-if="product.price.old" class="line-through text-text">{{ product.price.old }}</p> -->
                    </span>

                    <span class="flex gap-5">
                        <span>Shipping</span>
                        <span>Ask About This Product</span>
                    </span>
                    
                    <span v-if ="product.color && product.color.length" class="flex h-12 w-full mt-4 pb-3 justify-start items-center gap-3">
                            <h2 class="text-text text-base">Colour :</h2>
                            <span v-for="(colObj, cIndex) in product.color" :key="cIndex" class="group/swatch relative rounded-full p-0.5 hover:border border-0 border-text">
                                <span :class="['rounded-full w-8 h-8 block border-dark cursor-pointer', colObj.col]"></span>
                                <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark
                                text-white text-[9px] rounded opacity-0 pointer-events-none group-hover/swatch:opacity-100 transition-opacity">
                                    {{ colObj.tooltip }}
                                    <div class="absolute -bottom-1 left-1/2 transition-all duration-300 ease-in-out -translate-x-1/2 w-2 h-2 bg-dark rotate-45"></div>
                                </div>
                            </span>
                    </span>

                    <span class="flex items-center gap-2.5">
                        <h2>Quantity :</h2>
                        <span>
                            <span class="flex justify-center border-b border-b-text text-dark [&_button]:cursor-pointer
                             [&_button]:p-4 [&_button]:hover:text-text">
                                <button @click="decrementLocalQty">-</button>
                                <input class="text-center w-7" v-model="product.quantity" readonly />
                                <button @click="incrementLocalQty">+</button>
                            </span>
                        </span>
                    </span>

                    <span class="flex gap-2 items-center justify-start mt-3">
                        <ButtonComp @click="handleAddToCart" :disabled="cart.isInCart(product.id)" >
                            {{ cart.isInCart(product.id) ? 'Already in Cart' : 'Add To Cart' }}
                        </ButtonComp>

                        <span 
                            v-for="action in actionButtons" 
                            :key="action.id"
                            class="group/icon relative bg-white p-2 cursor-pointer shadow-sm"
                            @click.stop="handleAction(action.id, product)"
                            >
                            <Icon 
                                :icon="getIcon(action, product)" 
                                width="18" 
                                class="transition-all duration-300 group-hover/icon:text-gray-500 active:scale-75" 
                            />
                    
                            <div class="absolute left-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 
                                        bg-dark text-white text-[10px] rounded whitespace-nowrap
                                        opacity-0 -translate-x-2 pointer-events-none transition-all duration-300 
                                        group-hover/icon:opacity-100 group-hover/icon:translate-x-0 z-50">
                                {{ getTooltip(action, product) }}
                                <div class="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-dark rotate-45"></div>
                            </div>
                        </span>

                    </span>

                    <span class="flex gap-3 items-center">
                        <input v-model="isAgreed" type="checkbox" name="terms" id="terms">
                        <p class="text-text">I agree with the terms and conditions</p>
                    </span>

                    <button @click="checkOut" :disabled="!isAgreed" :class="[!isAgreed ? 'opacity-50 cursor-not-allowed': 'cursor-pointer' ,'w-full p-3 cursor-hover text-center text-dark hover:text-text bg-[#f4e4a3]']">
                        BUY IT NOW
                    </button>

                    <span class="flex gap-3 flex-col items-start mb-3 border-b-text border-b pb-3">
                        <p class="text-dark">Guaranteed Safe Checkout</p>
                        <span class="flex gap-3 items-center">
                            <Icon icon="logos:visa" width="40" />
                            <Icon icon="logos:mastercard" width="40" />
                            <Icon icon="logos:maestro" width="40" />
                            <Icon icon="logos:amex" width="40" />
                        </span>
                    </span>

                    <span class="flex flex-col items-start gap-3 [&_span]:text-text [&_p]:text-dark">
                        <p>SKU: <span>1510</span></p>
                        <p>Vendor: <span>1510</span></p>
                        <p>Type: <span>1510</span></p>
                        <p class="flex items-center gap-4">Share: 
                            <span class="flex gap-2">
                                <Icon icon="entypo-social:facebook-with-circle" class="text-[#1877F2]" width="32" />
                                <Icon icon="entypo-social:twitter-with-circle" class="text-[#1DA1F2]" width="32" />
                                <Icon icon="entypo-social:pinterest-with-circle" class="text-[#BD081C]" width="32" />
                            </span>
                        </p>
                    </span>

                </div>

            </div>
            <div v-else>
                Product not found.
            </div>

        </section>

        <section class="px-20 my-20">
            <div>
                <div class="flex justify-center h-15 gap-6 border-b border-b-text mb-6">
                    <span 
                     v-for="(info, index) in productInfo" 
                     :key="index"
                     @click="activeInfo=index"
                     :class="[activeInfo===index ? 'text-dark border-b-2 border-b-dark':'text-text','text-4xl  cursor-pointer pb-2 transition-all ease-in-out duration-300']"
                    >
                        {{ info }}
                    </span>
                </div>

                <div class="text-text leading-7">
                    {{ displayedInfo }}
                </div>
            </div>
<!-- 
            <div v-else>
                Loading Product Info...
            </div> -->

        </section>

        <!-- <section class="px-20 my-20">
            <h1 class="text-3xl w-full text-center text-dark mb-6">Related Products</h1>
            <div class="grid grid-cols-4 w-full gap-3 justify-between">
                <productCard v-for=" item in store.getAllProducts?.slice(0, 4)||[]"
                :key="item.id"
                :product="item" />
            </div>
        </section> -->

        <section class="px-6 md:px-20 my-20">
            <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <h2 class="text-2xl font-semibold text-dark">Related Products</h2>
                <router-link to="/shop" class="text-sm text-text hover:text-dark underline">View All</router-link>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <productCard 
                    v-for="item in store.getAllProducts?.slice(0, 4) || []"
                    :key="item.id"
                    :product="item" 
                    class="hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
                />
            </div>
        </section>

        <Transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
        >
        <div v-if="showSuccessModal" class="fixed top-20 right-5 z-[100] bg-white shadow-2xl border border-gray-200 p-4 w-80 rounded-lg">
            <div class="flex items-start gap-4">
            <div class="bg-green-100 p-2 rounded-full">
                <Icon icon="circle-flags:check" class="text-green-600" width="20" />
            </div>
            <div class="flex-1">
                <h3 class="font-bold text-dark text-sm">Added to Cart!</h3>
                <p class="text-text text-xs mt-1">{{ product.name }} is now in your cart.</p>
                
                <div class="flex gap-2 mt-4">
                <button @click="router.push({name: 'cart'})" class="flex-1 bg-dark text-white py-2 text-[10px] rounded hover:bg-opacity-80 transition">
                    VIEW CART
                </button>
                <button @click="checkOut" class="flex-1 bg-[#f4e4a3] text-dark py-2 text-[10px] rounded hover:bg-opacity-80 transition">
                    CHECKOUT
                </button>
                </div>
            </div>
            <button @click="showSuccessModal = false" class="text-gray-400 hover:text-dark">
                <Icon icon="ri:close-line" width="20" />
            </button>
            </div>
        </div>
        </Transition>
        
    </div>
</template>
<script setup>
// import router from '@/router';
import { onMounted, computed } from 'vue';
import { Icon } from '@iconify/vue';
import {ref, watch} from 'vue';
import { Toaster } from 'vue3-hot-toast';
import { useProductStore } from '@/stores/productStore';
import {useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import router from '@/router';
import productCard from '../Universal/productCard.vue';
import ButtonComp from '../Universal/ButtonComp.vue';

const props = defineProps({
    id:{
        type: [String,Number],
        default: null,
    }
});


const wishlist = useWishlistStore();

const cart = useCartStore();


const productInfo = ['Description', 'Reviews', 'Custom Tab'];

const activeInfo = ref(0);

const showSuccessModal = ref(false);

const incrementLocalQty = () => {
    product.value.quantity++;
};

const decrementLocalQty = () => {
    if (product.value.quantity > 1) {
        product.value.quantity--;
    }
};

const handleAddToCart = async () =>{

    await cart.addToCart(product.value);

    showSuccessModal.value = true;
    
    // 3. Optional: Automatically hide it after 4 seconds
    setTimeout(() => {
        showSuccessModal.value = false;
    }, 9000);
}

const displayedInfo = computed(() => {
     if(!product.value) return 'Loading Information....'
    const current =  productInfo[activeInfo.value];
    const p = product.value;
    switch (current) {
        case 'Description': return p.description || 'No description available.';
        case 'Reviews':     return p.reviews || 'No reviews yet.';
        case 'Custom Tab':  return p.customTab || 'No additional information.';
        default: return '';
    }
});

const isAgreed = ref(false);

const store = useProductStore() 

const product = computed(() =>{
    return store.singleProduct
});

const actionButtons = [
    {
        id: 'wishlist',
        baseIcon: 'ri:heart-line', 
        activeIcon: 'ri:close-line', 
        baseTooltip: 'Remove from Wishlist', 
        activeTooltip: 'Add to Wishlist'
    }
];

const getIcon = (action, product) => {
  if (action.id === 'wishlist') { 
   return wishlist.isInWishlist(product.id) ? action.activeIcon : action.baseIcon;
  }
  return action.baseIcon;
};

const getTooltip = (action, product) => {
  if (action.id === 'wishlist'){
    return wishlist.isInWishlist(product.id) ? action.baseTooltip : action.activeTooltip;
  } 
  return action.baseTooltip;
};

const handleAction = (id, product) => {
  if (id === 'wishlist') {
    wishlist.toggleWishlist(product);
    // console.log(product.isWishlisted ? 'Added to wishlist' : 'Removed from wishlist');
    } 
};

const checkOut = () =>{
    router.push({name:'checkout'})
};

watch(() => props.id, (newId) => {
    if (newId) {
        store.getSingleProduct(newId);
    }
}, { immediate: true });

watch(() => props.id, () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}, { immediate: true });

onMounted(async () => {
    if(props.id){
        await store.getSingleProduct(props.id)
    } else{
        console.error('No ID found in props');   
    }
       
});

</script>
<style >
    
</style>