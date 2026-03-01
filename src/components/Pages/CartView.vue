<template>
  <div>
    <div><Toaster position="top-center" :reverseOrder="false" /></div>
    <section class="bg-sec p-4 md:p-8 w-full">
      <div class="max-w-7xl mx-auto text-sm">
        <div class="flex items-start">
          <span>Home / <span class="text-text">Cart</span> </span>
        </div>
      </div>
    </section>

    <section v-if="store.count === 0" class="px-4 md:px-20 my-10 md:my-20">
      <div
        class="w-full flex flex-col justify-center items-center py-12 shadow-sm border border-gray-100 rounded-lg text-fancy font-medium text-2xl md:text-3xl gap-6"
      >
        <div>Your cart is Empty</div>
        <router-link :to="{name:'store'}">
          <ButtonComp>Start Shopping</ButtonComp>
        </router-link>
      </div>
    </section>

    <section v-else class="px-4 md:px-10 lg:px-20 my-10 md:my-20">
      <div class="flex flex-col gap-10 w-full">
        <div class="w-full">
          <div
            class="hidden md:grid grid-cols-8 text-center border-b border-black/10 font-semibold text-dark pb-4"
          >
            <div class="col-span-3 text-left pl-10">Product</div>
            <div class="col-span-1">Price</div>
            <div class="col-span-2">Quantity</div>
            <div class="col-span-1">Total</div>
            <div class="col-span-1"></div>
          </div>

          <div class="divide-y divide-gray-100">
            <div
              v-for="product in store.items"
              :key="product.id"
              class="grid grid-cols-1 md:grid-cols-8 py-6 items-center gap-4 md:gap-0 text-center md:text-center"
            >
              <div class="col-span-1 md:col-span-3 flex items-center gap-4 text-left">
                <img :src="product?.image" alt="product" class="w-20 h-20 md:w-24 md:h-24 object-contain bg-gray-50 rounded" />
                <div class="flex flex-col">
                  <span class="font-medium text-dark md:text-lg">{{ product?.name }}</span>
                  <span class="md:hidden text-text text-sm">${{ product?.price }}</span>
                </div>
              </div>

              <div class="hidden md:block col-span-1 text-text">${{ product?.price }}</div>

              <div class="col-span-1 md:col-span-2 flex justify-start md:justify-center items-center gap-4">
                <span class="md:hidden text-sm font-medium mr-auto">Quantity:</span>
                <div class="flex items-center border border-dark rounded overflow-hidden">
                   <button @click="store.updateCartQuantity(product.id, 'decrement')"
                    class="px-3 py-1 hover:bg-gray-100 transition-colors border-r border-dark">-</button>
                  <input type="number" v-model="product.quantity" min="1"
                    class="w-10 text-center outline-none bg-transparent" />
                  <button @click="store.updateCartQuantity(product.id, 'increment')"
                    class="px-3 py-1 hover:bg-gray-100 transition-colors border-l border-dark">+</button>
                </div>
              </div>

              <div class="col-span-1 flex md:block justify-between items-center border-t md:border-none pt-4 md:pt-0">
                <span class="md:hidden font-medium">Subtotal:</span>
                <span class="font-semibold text-dark">${{ (product?.price * product.quantity).toFixed(2) }}</span>
              </div>

              <div class="col-span-1 text-right md:text-center">
                <Icon icon="mdi:delete-outline"
                  class="text-2xl cursor-pointer text-red-400 hover:text-red-600 inline-block"
                  @click="store.removeFromCart(product)" />
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-between items-center py-10 border-t border-black/10">
            <router-link :to="{ name: 'store' }"
              class="w-full sm:w-auto text-center border border-dark px-8 py-3 rounded hover:bg-dark hover:text-white transition-all">
              Continue Shopping
            </router-link>
            <button @click="store.clearCart"
              class="w-full sm:w-auto text-center text-red-500 hover:text-red-700 font-medium">
              Clear Shopping Cart
            </button>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-12 items-start">
          
          <div class="w-full lg:w-1/2 flex flex-col gap-5">
            <div class="space-y-4">
               <h3 class="font-fancy font-semibold text-2xl">Delivery Details</h3>
               <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-xs uppercase tracking-wider text-text">Date</label>
                    <input type="date" class="border border-gray-300 rounded px-4 py-2 w-full outline-dark" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-xs uppercase tracking-wider text-text">Time</label>
                    <input type="time" class="border border-gray-300 rounded px-4 py-2 w-full outline-dark" />
                  </div>
               </div>
               <p class="text-text text-sm italic">
                Mon-Fri: 12PM - 4PM | Sat: 8AM - 11AM
              </p>
            </div>

            <div class="space-y-4 pt-4">
              <h2 class="font-fancy font-semibold text-2xl">Shipping estimates</h2>
              <select class="border border-gray-300 rounded px-4 py-3 w-full outline-dark">
                <option value="" disabled selected>Select Country</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
              </select>
              <div class="flex gap-4">
                <input type="text" placeholder="ZIP Code" class="border border-gray-300 rounded px-4 py-3 w-full outline-dark" />
                <button class="bg-dark text-white px-6 py-3 whitespace-nowrap hover:bg-black/80 transition-colors">
                  CALCULATE
                </button>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/2 bg-[#f7f7f7] p-6 md:p-10 rounded-lg flex flex-col gap-6">
            <h2 class="text-2xl font-semibold border-b pb-4">Cart Totals</h2>

            <div class="space-y-4">
               <div class="flex justify-between items-center text-lg">
                  <span>Subtotal</span>
                  <span class="font-semibold">${{ store.cartTotal.toFixed(2) }}</span>
               </div>
               <div class="flex justify-between items-center text-xl font-bold text-dark border-t pt-4">
                  <span>Total</span>
                  <span>${{ store.cartTotal.toFixed(2) }}</span>
               </div>
            </div>

            <div class="flex items-start gap-3 mt-4">
              <input v-model="isAgreed" type="checkbox" id="terms" class="mt-1 w-4 h-4 rounded border-gray-300 text-dark focus:ring-dark" />
              <label for="terms" class="text-sm text-text cursor-pointer">
                I agree with the terms and conditions
              </label>
            </div>

            <button
              :disabled="!isAgreed"
              :class="[
                !isAgreed ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-dark hover:text-white',
                'w-full py-4 text-center font-bold text-dark bg-[#f4e4a3] transition-all duration-300',
              ]"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { useCartStore } from '@/stores/cartStore'
import { Icon } from '@iconify/vue'
import ButtonComp from '../Universal/ButtonComp.vue'
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'npm run dev
import { Toaster } from 'vue3-hot-toast'
// import capIcon from '../Icons/capIcon.vue'
// import bagIcon from '../Icons/bagIcon.vue'
// import glassIcon from '../Icons/glassIcon.vue'
// import shoeIcon from '../Icons/shoeIcon.vue'
// import watchIcon from '../Icons/watchIcon.vue'
// import lampIcon from '../Icons/lampIcon.vue'
import { onMounted, ref } from 'vue'

const store = useCartStore()

const isAgreed = ref(false)



onMounted ( async() => {
  await store.fetchCart()
})

// const categories = [
//   { name: 'Bags', icon: 'ri:shopping-bag-line' },
//   { name: 'Shoe', icon: 'ri:footprint-line' },
//   { name: 'Glasses', icon: 'ri:glasses-line' },
//   { name: 'Cap', icon: 'ri:hat-line' },
//   { name: 'Watch', icon: 'ri:watch-line' },
//   { name: 'Lamp', icon: 'ri:lightbulb-line' },
// ]

// const settings = {
//   itemsToShow: 1,
//   snapAlign: 'center',
// }

// const breakpoints = {
//   // 700px and up
//   700: {
//     itemsToShow: 4,
//     snapAlign: 'start',
//   },
// }
</script>

<style>

</style>
