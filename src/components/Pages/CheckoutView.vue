<template>
  <div class="flex flex-col">
    <div><Toaster position="top-center" :reverseOrder="false" /></div>
    <div class="flex w-full px-40 py-3 justify-between items-center border-b border-black/10">
      <router-link :to="{ name: 'dashboard' }" class="text-2xl font-medium"
        >Lezada - Multipurpose eCommerce Shopify Theme</router-link
      >

      <router-link :to="{ name: 'cart' }" class="text-text">
        <Icon icon="ri:shopping-bag-line" width="22" class="group-hover:text-gray-500" />
      </router-link>
    </div>

    <div class="flex justify-center my-10 items-start px-40">
      <div
        class="flex flex-col gap-3 border-r border-r-black/10 items-start [&_h2]:text-dark pr-5 w-1/2"
      >
        <span class="flex justify-between items-center w-full">
          <h2 class="text-xl font-semibold">Contact</h2>
          <router-link :to="{ name: 'login' }" class="text-text text-sm underline"
            >Sign in</router-link
          >
        </span>

        <span class="flex flex-col gap-2 w-full items-start">
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span class="flex justify-center gap-3">
            <input type="checkbox" name="newsletter" id="newsletter" class="mr-2" />
            <label for="newsletter" class="text-text text-sm ml-2"
              >Email me with news and offers</label
            >
          </span>
        </span>

        <span
          class="flex w-full flex-col mt-4 gap-3 [&_input]:px-4 [&_input]:text-sm [&_input]:py-3 [&_input]:border [&_input]:border-black/10 [&_input]:rounded-md [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-blue-500"
        >
          <h2 class="text-xl font-semibold">Delivery</h2>

          <BillingAddress @country-change="handleCountryChange" :display="display" />
          <!-- <span class="w-full flex items-center justify-between">
            <input type="text" name="fName" id="" placeholder="First name" />
            <input type="text" name="lName" id="" placeholder="Last name" />
          </span>

          <span class="w-full">
            <input type="text" name="fName" class="w-full" id="" placeholder="Address" />
          </span>

          <span class="w-full">
            <input
              type="text"
              name="fName"
              class="w-full"
              id=""
              placeholder="Apartment, suit, etc. (optional)"
            />
          </span>

          <span class="w-full flex items-center justify-between">
            <input type="text" name="fName" id="" placeholder="Postal code" />
            <input type="text" name="lName" id="" placeholder="City" />
          </span> -->

          <span class="flex justify-start my-3 gap-3">
            <input type="checkbox" name="info" id="info" class="mr-2" />
            <label for="info" class="text-text text-sm ml-2"
              >Save this information for next time</label
            >
          </span>

          <span class="flex flex-col gap-2">
            <h2 class="text-dark font-semibold">Shipping Method</h2>
            <input
              disabled
              class="bg-black/5 text-dark"
              type="text"
              :value="
                selectedCountry
                  ? `International shipping $${shippingFee.toFixed(2)}`
                  : 'Enter your shipping address to view available shipping methods.'
              "
            />
          </span>
        </span>

        <span class="flex flex-col gap-3 my-3 items-start w-full">
          <h2 class="text-xl font-semibold">Payment</h2>
          <p class="text-text text-sm">All transactions are secure and encrypted.</p>

          <!-- <span class="flex flex-col items-start gap-3 w-full bg-black/5">

                            <span class="flex rounded-t-md border justify-between py-3 px-2 items-center w-full">
                                <span class="flex gap-2 items-center">
                                    <div class="p-1.5 bg-black rounded-full flex items-center">
                                        <div class="p-1 bg-white rounded-full flex items-center" />
                                    </div>
                                    <p class="text-text text-sm">Credit card</p>
                                </span>

                                <span class="px-4.5 py-0.5 rounded-sm bg-amber-500 text-white">
                                    B
                                </span>
                            </span>

                            <span class="flex flex-col gap-3 items-start px-4 w-full">
                                <span class="flex justify-between items-center text-sm px-4 py-3 bg-white border border-black/10 rounded-md w-full">
                                    <input class="outline-none" type="text" placeholder="Card number" name="" id="">
                                
                                </span>

                                <span class="flex justify-between items-center">
                                    <input type="text" class="outline-none" name="" id="">
                                </span>
                            </span>
                            
                        </span> -->

          <div class="w-full max-w-2xl mx-auto">
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              v-slot="{ errors, meta }"
              class="flex flex-col gap-6"
            >
              <div
                class="flex flex-col border border-gray-200 rounded-md bg-white overflow-hidden shadow-sm"
              >
                <div class="border-b border-gray-200 last:border-0">
                  <label
                    class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        v-model="paymentMethod"
                        class="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                      />
                      <span class="font-medium text-sm text-gray-900">Credit Card</span>
                    </div>
                    <div class="flex gap-2 text-gray-400">
                      <Icon icon="logos:visa" width="32" />
                      <Icon icon="logos:mastercard" width="24" />
                      <Icon icon="logos:amex" width="24" />
                    </div>
                  </label>

                  <Transition name="expand">
                    <div
                      v-if="paymentMethod === 'card'"
                      class="accordion-content p-4 bg-gray-50 border-t border-gray-200 space-y-4"
                    >
                      <div class="relative">
                        <Field
                          name="cardNumber"
                          type="text"
                          inputmode="numeric"
                          @keypress="onlyNumbers"
                          placeholder="Card number"
                          class="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-white"
                          :class="{ 'border-red-500': errors.cardNumber }"
                        />
                        <Icon
                          icon="ri:lock-line"
                          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <ErrorMessage name="cardNumber" class="text-red-500 text-xs mt-1 block" />
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <Field
                            name="cardExpiry"
                            type="text"
                            placeholder="Expiration (MM/YY)"
                            class="w-full p-3 bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                            :class="{ 'border-red-500': errors.cardExpiry }"
                          />
                          <ErrorMessage name="cardExpiry" class="text-red-500 text-xs mt-1 block" />
                        </div>

                        <div class="relative">
                          <Field
                            name="cardCvv"
                            type="text"
                            inputmode="numeric"
                            @keypress="onlyNumbers"
                            maxlength="4"
                            placeholder="Security code"
                            class="w-full p-3 pr-10 bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                            :class="{ 'border-red-500': errors.cardCvv }"
                          />
                          <div class="group absolute right-3 top-1/2 -translate-y-1/2 cursor-help">
                            <Icon
                              icon="ri:question-line"
                              class="text-gray-400 hover:text-black transition-colors"
                            />
                            <div
                              class="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded hidden group-hover:block z-20 shadow-xl"
                            >
                              3-digit security code on the back of your card.
                            </div>
                          </div>
                          <ErrorMessage name="cardCvv" class="text-red-500 text-xs mt-1 block" />
                        </div>
                      </div>

                      <div>
                        <Field
                          name="cardName"
                          type="text"
                          placeholder="Name on card"
                          class="w-full p-3 bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                          :class="{ 'border-red-500': errors.cardName }"
                        />
                        <ErrorMessage name="cardName" class="text-red-500 text-xs mt-1 block" />
                      </div>

                      <div class="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="billingSameAsShippingCard"
                          v-model="cardBillingSame"
                          class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                        />
                        <label
                          for="billingSameAsShippingCard"
                          class="text-sm text-gray-700 select-none cursor-pointer"
                          >Use shipping address as billing address</label
                        >
                      </div>

                      <Transition name="expand">
                        <div
                          v-if="paymentMethod === 'card'"
                          class="accordion-content pt-4 space-y-4"
                        >
                          <h2 class="text-lg font-medium text-gray-900">Billing address</h2>
                          <BillingAddress
                            @country-change="handleCountryChange"
                            :display="display"
                          />
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </div>

                <div class="border-b border-gray-200 last:border-0">
                  <label
                    class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        v-model="paymentMethod"
                        class="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                      />
                      <span class="font-medium text-sm text-gray-900">Cash on Delivery (COD)</span>
                    </div>
                  </label>

                  <Transition name="expand">
                    <div
                      v-if="paymentMethod === 'cod'"
                      class="accordion-content p-4 bg-gray-50 border-t border-gray-200 space-y-4"
                    >
                      <div
                        class="bg-gray-100 p-4 text-center text-sm text-gray-600 rounded flex items-center justify-center gap-2"
                      >
                        <Icon icon="ri:hand-coin-line" class="text-lg" /> Pay with cash upon
                        delivery.
                      </div>

                      <h2 class="text-lg font-medium text-gray-900 pt-2">Billing address</h2>

                      <div class="flex flex-col gap-3">
                        <label
                          class="flex items-center gap-3 p-3 border rounded-md cursor-pointer bg-white hover:border-black transition-colors"
                          :class="
                            codBillingSame ? 'border-black ring-1 ring-black' : 'border-gray-200'
                          "
                        >
                          <input
                            type="radio"
                            :value="true"
                            v-model="codBillingSame"
                            class="w-4 h-4 text-black border-gray-300 accent-black"
                          />
                          <span class="text-sm">Same as shipping address</span>
                        </label>

                        <label
                          class="flex items-center gap-3 p-3 border rounded-md cursor-pointer bg-white hover:border-black transition-colors"
                          :class="
                            !codBillingSame ? 'border-black ring-1 ring-black' : 'border-gray-200'
                          "
                        >
                          <input
                            type="radio"
                            :value="false"
                            v-model="codBillingSame"
                            class="w-4 h-4 text-black border-gray-300 accent-black"
                          />
                          <span class="text-sm">Use a different billing address</span>
                        </label>
                      </div>

                      <Transition name="expand">
                        <div v-if="!codBillingSame" class="accordion-content pt-2">
                          <BillingAddress
                            @country-change="handleCountryChange"
                            :display="display"
                          />
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </div>
              </div>

              <button
                type="submit"
                :disabled="!meta.valid || !meta.dirty"
                class="w-full py-4 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition-all active:scale-[0.99] flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                <span>Pay Now</span>
                <Icon icon="ri:arrow-right-line" />
              </button>
            </Form>
          </div>
        </span>
      </div>

      <div class="w-1/2 pt-10 px-10 bg-[#fafafa] border-l border-l-black/10">
        <div class="max-h-60 overflow-auto py-5 flex flex-col gap-2">
          <span
            v-for="product in store.cartItems"
            :key="product.id"
            class="flex justify-between items-center [&_p]:text-sm [&_p]:text-text"
          >
            <span class="w-15 relative shadow-sm mr-2 rounded-sm">
              <div
                class="absolute right-0 flex justify-center border border-red-300 bg-dark rounded-full text-white text-sm w-6 h-6"
              >
                {{ product.quantity }}
              </div>
              <img :src="product.image" alt="" class="w-full shadow-sm" />
            </span>
            <p>{{ product.name }}</p>
            <p>${{ product?.price }}</p>
          </span>
        </div>

        <span class="flex justify-between text-sm w-full my-4 text-text">
          <p>Subtotal • {{ store.cartItems.length }} items</p>
          <p>${{ store.cartTotal.toFixed(2) }}</p>
        </span>

        <span class="flex justify-between text-sm w-full my-2 text-dark">
          <p>Shipping</p>
          <p v-if="selectedCountry" class="font-medium">${{ shippingFee.toFixed(2) }}</p>
          <p v-else class="text-gray-400 italic">Calculated at next step</p>
        </span>

        <span class="flex justify-between text-base font-semibold w-full my-4 text-dark">
          <p>Total</p>
          <p>${{ grandTotal.toFixed(2) }}</p>
        </span>
      </div>
    </div>
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
