<template>
  <div class="flex flex-col min-h-screen bg-white">
    <div><Toaster position="top-center" :reverseOrder="false" /></div>
    <header class="w-full px-4 md:px-10 lg:px-20 xl:px-40 py-4 flex justify-between items-center border-b border-black/10">
      <router-link :to="{ name: 'dashboard' }" class="text-lg md:text-2xl font-medium truncate max-w-[70%]">
        Lezada - eCommerce
      </router-link>

      <router-link :to="{ name: 'cart' }" class="text-text p-2">
        <Icon icon="ri:shopping-bag-line" width="24" class="hover:text-gray-500" />
      </router-link>
    </header>

    <main class="flex flex-col lg:flex-row lg:justify-center">
      
      <div class="w-full lg:w-[55%] xl:w-[50%] px-4 md:px-10 lg:px-20 xl:pl-40 xl:pr-10 py-10 order-2 lg:order-1">
        <div class="flex flex-col gap-8">
          
          <section class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-dark">Contact</h2>
              <router-link :to="{ name: 'login' }" class="text-text text-sm underline">Sign in</router-link>
            </div>
            <div class="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <div class="flex items-center gap-2">
                <input type="checkbox" id="newsletter" class="accent-black w-4 h-4" />
                <label for="newsletter" class="text-text text-sm">Email me with news and offers</label>
              </div>
            </div>
          </section>

          <section class="flex flex-col gap-4">
            <h2 class="text-xl font-semibold text-dark">Delivery</h2>
            <BillingAddress @country-change="handleCountryChange" :display="display" />
            
            <div class="flex items-center gap-2 py-2">
              <input type="checkbox" id="info" class="accent-black w-4 h-4" />
              <label for="info" class="text-text text-sm">Save this information for next time</label>
            </div>

            <div class="flex flex-col gap-2">
              <h2 class="text-dark font-semibold">Shipping Method</h2>
              <div class="bg-gray-50 border border-gray-200 p-4 rounded-md text-sm text-dark">
                {{ selectedCountry ? `International shipping $${shippingFee.toFixed(2)}` : 'Enter your shipping address to view available shipping methods.' }}
              </div>
            </div>
          </section>

          <section class="flex flex-col gap-4">
            <h2 class="text-xl font-semibold text-dark">Payment</h2>
            <p class="text-text text-sm -mt-2">All transactions are secure and encrypted.</p>

            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, meta }" class="flex flex-col gap-6">
              <div class="border border-gray-200 rounded-md bg-white overflow-hidden shadow-sm">
                
                <div class="border-b border-gray-200">
                  <label class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-center gap-3">
                      <input type="radio" value="card" v-model="paymentMethod" class="accent-black w-4 h-4" />
                      <span class="font-medium text-sm">Credit Card</span>
                    </div>
                    <div class="flex gap-1">
                      <Icon icon="logos:visa" width="30" />
                      <Icon icon="logos:mastercard" width="24" />
                    </div>
                  </label>

                  <Transition name="expand">
                    <div v-if="paymentMethod === 'card'" class="p-4 bg-gray-50 border-t border-gray-200 space-y-4">
                      <div class="relative">
                        <Field name="cardNumber" type="text" placeholder="Card number" class="w-full p-3 border rounded-md" :class="{'border-red-500': errors.cardNumber}" />
                        <Icon icon="ri:lock-line" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <ErrorMessage name="cardNumber" class="text-red-500 text-xs mt-1 block" />
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <Field name="cardExpiry" placeholder="MM/YY" class="p-3 border rounded-md" />
                        <Field name="cardCvv" placeholder="CVV" class="p-3 border rounded-md" />
                      </div>
                      
                      <div class="flex items-center gap-2">
                        <input type="checkbox" v-model="cardBillingSame" id="cardSame" class="accent-black" />
                        <label for="cardSame" class="text-xs text-gray-600">Billing same as shipping</label>
                      </div>
                    </div>
                  </Transition>
                </div>

                <div>
                  <label class="flex items-center p-4 cursor-pointer hover:bg-gray-50">
                    <input type="radio" value="cod" v-model="paymentMethod" class="accent-black w-4 h-4 mr-3" />
                    <span class="font-medium text-sm">Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                :disabled="!meta.valid"
                class="w-full py-4 bg-black text-white font-semibold rounded hover:bg-gray-800 disabled:bg-gray-400 transition-all"
              >
                Pay Now
              </button>
            </Form>
          </section>
        </div>
      </div>

      <aside class="w-full lg:w-[45%] xl:w-[40%] bg-gray-50 border-l border-gray-200 px-4 md:px-10 lg:px-12 xl:pr-40 py-10 order-1 lg:order-2">
        <div class="sticky top-10">
          <h2 class="text-lg font-semibold mb-6 hidden lg:block">Order Summary</h2>
          
          <div class="max-h-[40vh] overflow-y-auto pt-2 pr-2 space-y-4">
            <div v-for="product in store.cartItems" :key="product.id" class="flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <img :src="product.image" class="w-16 h-16 object-contain bg-white border rounded-md shadow-sm" />
                <span class="absolute -top-2 -right-2 bg-gray-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {{ product.quantity }}
                </span>
              </div>
              <div class="flex-grow">
                <p class="text-sm font-medium text-dark line-clamp-1">{{ product.name }}</p>
              </div>
              <p class="text-sm font-semibold">${{ product.price }}</p>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-gray-200 space-y-3">
            <div class="flex justify-between text-sm text-text">
              <span>Subtotal ({{ store.cartItems.length }} items)</span>
              <span>${{ store.cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm text-text">
              <span>Shipping</span>
              <span v-if="selectedCountry">${{ shippingFee.toFixed(2) }}</span>
              <span v-else class="italic text-xs">Calculated at next step</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-dark pt-3">
              <span>Total</span>
              <span>USD ${{ grandTotal.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </aside>

    </main>

    <ModalPop v-if="showSuccessModal" :value="true" @close="showSuccessModal = null">
      <div class="flex flex-col items-center justify-center w-full text-center p-6 sm:p-8 gap-5">
        <div
          class="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2 animate-bounce-short"
        >
          <Icon icon="ri:checkbox-circle-fill" width="48" />
        </div>

        <div class="space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Order Successful!</h2>
          <p class="text-gray-500 text-sm sm:text-base max-w-70 mx-auto leading-relaxed">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        <button
          @click="continueShopping"
          class="w-full sm:w-auto min-w-50 mt-2 py-3.5 px-6 bg-black text-white text-sm font-semibold uppercase tracking-wide rounded hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <Icon icon="ri:arrow-right-line" />
        </button>
      </div>
    </ModalPop>
  </div>
</template>
<script setup>
import { useCartStore } from '@/stores/cartStore'
import toast, { Toaster } from 'vue3-hot-toast'
import { ref, computed } from 'vue'
import router from '@/router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { Icon } from '@iconify/vue'
import BillingAddress from '../Universal/BillingAddress.vue'
import ModalPop from '../Universal/ModalPop.vue'

const store = useCartStore()

// State
const paymentMethod = ref('card')
const cardBillingSame = ref(true)
const codBillingSame = ref(true)
const showSuccessModal = ref(false)
const display = ref(false)
const selectedCountry = ref('')
const shippingFee = ref(0)

// Mock Data
const shippingAddress = '123 Shipping St'

//   { code: 'US', name: 'United States' },
//   { code: 'GB', name: 'United Kingdom' },
//   { code: 'NG', name: 'Nigeria' },
// ];

// Helper: Restrict Input
const onlyNumbers = (event) => {
  const charCode = event.which ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault()
  }
}

const handleCountryChange = (countryName) => {
  selectedCountry.value = countryName
  if (countryName) {
    shippingFee.value = 20.0 // Set your flat rate here
  } else {
    shippingFee.value = 0
  }
}

// Computed property for the final total
const grandTotal = computed(() => {
  return store.cartTotal + shippingFee.value
})

// Schema
const schema = yup.object().shape({
  cardNumber: yup.string().when([], {
    is: () => paymentMethod.value === 'card',
    then: (s) =>
      s
        .required('Card number is required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(13, 'Too short')
        .max(19, 'Too long'),
  }),
  cardExpiry: yup.string().when([], {
    is: () => paymentMethod.value === 'card',
    then: (s) =>
      s
        .required('Expiry is required')
        .matches(/^(0[1-2]|1[0-2])\/?([0-9]{2})$/, 'Must be a valid date (MM/YY)'),
  }),
  cardCvv: yup.string().when([], {
    is: () => paymentMethod.value === 'card',
    then: (s) => s.required('CVV is required').matches(/^[0-9]{3,4}$/, 'Must be 3 or 4 digits'),
  }),

  cardName: yup.string().when([], {
    is: () => paymentMethod.value === 'card',
    then: (s) => s.required('Name is required'),
  }),

  // Logic: Require billing fields if (Card AND !Same) OR (COD AND !Same)
  billingAddress: yup.string().when([], {
    is: () =>
      (paymentMethod.value === 'card' && !cardBillingSame.value) ||
      (paymentMethod.value === 'cod' && !codBillingSame.value),
    then: (s) => s.required('Address is required'),
  }),
  billingCity: yup.string().when([], {
    is: () =>
      (paymentMethod.value === 'card' && !cardBillingSame.value) ||
      (paymentMethod.value === 'cod' && !codBillingSame.value),
    then: (s) => s.required('City is required'),
  }),
  billingZip: yup.string().when([], {
    is: () =>
      (paymentMethod.value === 'card' && !cardBillingSame.value) ||
      (paymentMethod.value === 'cod' && !codBillingSame.value),
    then: (s) => s.required('Zip is required'),
  }),
  billingCountry: yup.string().when([], {
    is: () =>
      (paymentMethod.value === 'card' && !cardBillingSame.value) ||
      (paymentMethod.value === 'cod' && !codBillingSame.value),
    then: (s) => s.required('Country is required'),
  }),
  billingFirstName: yup.string().when([], {
    is: () =>
      (paymentMethod.value === 'card' && !cardBillingSame.value) ||
      (paymentMethod.value === 'cod' && !codBillingSame.value),
    then: (s) => s.required('First Name is required'),
  }),
  billingLastName: yup.string().when([], {
    is: () =>
      (paymentMethod.value === 'card' && !cardBillingSame.value) ||
      (paymentMethod.value === 'cod' && !codBillingSame.value),
    then: (s) => s.required('Last Name is required'),
  }),
})

const onSubmit = async (values) => {
  try {
    // 1. Calculate Billing Address
    const isSameAddress =
      paymentMethod.value === 'card' ? cardBillingSame.value : codBillingSame.value

    let finalBillingAddress = isSameAddress
      ? shippingAddress
      : `${values.billingFirstName} ${values.billingLastName}, ${values.billingAddress}, ${values.billingCity}, ${values.billingZip}, ${values.billingCountry}`

    if (!isSameAddress && values.billingApartment)
      finalBillingAddress += ` (Apt ${values.billingApartment})`

    // 2. Prepare Payload
    const payload = {
      payment_method: paymentMethod.value,
      shipping_address: shippingAddress,
      billing_address: finalBillingAddress,
      // Note: Add card info here if your backend requires it, e.g., tokenized card data
    }

    // 3. Fake Delay & Checkout
    await new Promise((resolve) => setTimeout(resolve, 500))
    await store.checkOut(payload)

    // 4. Show Success Modal
    showSuccessModal.value = true
  } catch (error) {
    toast.error(error.message || 'Checkout failed')
    console.error('There was a problem checking out', error)
  }
}

const continueShopping = () => {
  showSuccessModal.value = false
  router.push('/store') // Redirect to home/shop
}
</script>
<style>
/* Smooth accordion animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  max-height: 1000px; /* Arbitrary large height */
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}
</style>
