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

    <section v-if="store.count === 0" class="px-20 my-20">
      <div
        class="w-full flex flex-col justify-center items-center py-6 shadow-lg text-fancy font-medium text-3xl"
      >
        <div>Your cart is Empty</div>
        <router-link :to="{name:'store'}">
          <ButtonComp>Start Shopping</ButtonComp>
        </router-link>
      </div>
    </section>
    <section v-else class="px-20 my-20">
      <div class="flex flex-col gap-10 w-full">
        <div class="w-full mb-10">
          <div
            class="grid grid-cols-8 text-center px-10 [&_div]:border [&_div]:border-black/10 [&_div]:py-2 [&_div]:px-4"
          >
            <div class="col-span-3">Product</div>
            <div class="col-span-1">Price</div>
            <div class="col-span-2">Quantity</div>
            <div class="col-span-1">Total</div>
            <div class="col-span-1"></div>
          </div>

          <div
            v-for="product in store.items"
            :key="product.id"
            class="grid grid-cols-8 text-center px-10 [&_div]:border [&_div]:flex [&_div]:items-center [&_div]:border-black/10 [&_div]:py-2 [&_div]:px-4"
          >
            <div class="col-span-1 flex items-center gap-4">
              <img :src="product?.image" alt="product image" class="w-20 h-20 object-contain" />
            </div>
            <div class="col-span-2">{{ product?.name }}</div>
            <div class="col-span-1">${{ product?.price }}</div>
            <div class="col-span-2 flex justify-center items-center gap-4">
              <button
                @click="store.updateCartQuantity(product.id, 'decrement')"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                -
              </button>
              <input
                type="number"
                v-model="product.quantity"
                min="1"
                class="w-12 text-center border border-dark rounded"
              />
              <button
                @click="store.updateCartQuantity(product.id, 'increment')"
                class="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                +
              </button>
            </div>
            <div class="col-span-1">${{ Number(product?.price * product.quantity).toFixed(2) }}</div>
            <div class="col-span-1">
              <Icon
                icon="mdi:delete"
                class="text-2xl cursor-pointer mx-auto"
                @click="store.removeFromCart(product)"
              />
            </div>
          </div>

          <div class="flex gap-4 justify-end pb-10 w-full mb-10 border-b border-b-black/10">
            <router-link
              :to="{ name: 'store' }"
              class="bg-dark text-white px-6 py-2 rounded mt-10 float-right hover:bg-black/70"
            >
              Continue Shopping
            </router-link>
            <button
              @click="store.clearCart"
              class="bg-dark text-white px-6 py-2 rounded mt-10 float-right cursor-pointer hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div class="flex justify-between w-full">
          <div class="flex w-1/2 flex-col gap-3 items-start">
            <h3 class="font-fancy font-semibold text-2xl">Pick a delivery date and Time</h3>
            <input type="date" class="border outline-0 border-dark px-4 py-2 w-60" />
            <input type="time" class="border outline-0 border-dark px-4 py-2 w-60" />
            <p class="text-text">
              Pick delivery date and time as you choose. Delivery Time takes place between 12PM -
              4PM MON-FRI AND 8AM-11AM SAT.
            </p>

            <h2 class="font-fancy font-semibold text-2xl mt-3">Get shipping estimates</h2>

            <select class="border border-dark px-4 py-2 w-60">
              <option value="" disabled selected>Select Country</option>
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>

            <input
              type="text"
              class="border border-dark outline-0 px-4 py-2 w-50"
              name="zipCode"
              id="zipCode"
              placeholder="Enter ZIP Code"
            />

            <button class="bg-dark text-white px-6 py-2 mt-3 float-right hover:bg-black/70">
              CALCULATE SHIPPING
            </button>
          </div>

          <div class="flex flex-col px-10 py-5 gap-3 w-full bg-[#f7f7f7]">
            <h2 class="text-center text-3xl">Cart Totals</h2>

            <div
              class="grid grid-cols-2 w-full justify-between text-center [&_div]:border items-center px-2 [&_div]:border-black/10"
            >
              <div>
                <p class="border-r border-r-black/10 text-lg">Subtotal:</p>
                <p class="border-r border-r-black/10 text-lg">Total:</p>
              </div>
              <div>
                <p class="text-xl">${{ store.cartTotal.toFixed(2) }}</p>
                <p class="text-xl">${{ store.cartTotal.toFixed(2) }}</p>
              </div>
            </div>

            <span class="flex gap-3 items-center">
              <input v-model="isAgreed" type="checkbox" name="terms" id="terms" />
              <p class="text-text">I agree with the terms and conditions</p>
            </span>

            <button
              :disabled="!isAgreed"
              :class="[
                !isAgreed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                'w-full p-3 cursor-hover text-center text-dark hover:text-text bg-[#f4e4a3]',
              ]"
            >
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col my-15 gap-4">
        <h2 class="text-3xl mb-6 text-center">You can also buy</h2>

        <!-- <div class="w-full flex px-20">
            <div v-for="(cat, index) in categories" :key="index" class="flex overflow-auto gap-10 ">
            <div class="flex flex-col items-center gap-2">
                <Icon :icon="cat.icon" width="40" class="text-4xl w-80 h-70 mx-3 bg-gray-300 "/>
                <div class="flex items-center">
                  <p class="text-xl font-medium">{{ cat.name }}</p>
                </div>
            </div>
            </div>
        </div> -->
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
