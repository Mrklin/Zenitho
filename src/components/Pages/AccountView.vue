<template>
  <div>
    <section class="bg-sec px-10 py-8 w-full">
      <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
        <div class="flex items-start">
          <span class="cursor-pointer"
            ><router-link :to="{ name: 'dashboard' }">Home</router-link> /
            <span class="text-text">My Account</span>
          </span>
        </div>
      </div>
    </section>

    <section class="mt-10 px-4 md:px-10 lg:px-20">
      <div class="flex w-full items-start justify-between py-3 border-b border-b-text">
        <h2 class="text-3xl text-dark">My Account</h2>
        <button @click="user.logoutUser" class="cursor-pointer text-dark hover:text-text">
          Logout
        </button>
      </div>

      <div class="w-full flex flex-col">
        <h3 class="text-2xl my-4">Order History</h3>
        <div>
          <div>
            <div v-if="cart.orderHistory.length > 0" class="flex flex-col gap-10">
              <div
                v-for="order in cart.orderHistory"
                :key="order.id"
                class="border p-6 rounded-lg bg-gray-50"
              >
                <div class="flex justify-between items-center border-b pb-3 mb-4">
                  <div>
                    <p class="text-sm text-text">Order Date</p>
                    <p class="font-semibold text-dark">{{ order.date }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-text">Total Amount</p>
                    <p class="font-bold text-dark text-lg">${{ order.total.toFixed(2) }}</p>
                  </div>
                </div>

                <div class="flex flex-col gap-4">
                  <div
                    v-for="item in order.items"
                    :key="item.id"
                    class="flex justify-between items-center"
                  >
                    <div class="flex items-center gap-4">
                      <span
                        class="w-12 h-12 relative shadow-sm rounded-sm overflow-hidden bg-white"
                      >
                        <img :src="item.image" class="w-full h-full object-cover" />
                      </span>
                      <div>
                        <p class="text-sm font-medium">{{ item.name }}</p>
                        <p class="text-xs text-text">Qty: {{ item.quantity }}</p>
                      </div>
                    </div>
                    <p class="text-sm font-semibold">${{ item.price }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="py-10 text-center border border-dashed rounded-lg">
              <p class="text-text">You haven't placed any orders yet.</p>
              <router-link to="/store" class="text-blue-500 underline text-sm mt-2 block"
                >Start Shopping</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-10 px-4 md:px-10 lg:px-20">
      <h3 class="text-2xl my-4">Account Details</h3>
      <div>
        <p class="text-2xl">{{ user.userName }}</p>
        <div v-if="user.defaultAddress" class="text-text">
          <p>{{ user.defaultAddress.fName }} {{ user.defaultAddress.lName }}</p>
          <p>{{ user.defaultAddress.address1 }}</p>
          <p>{{ user.defaultAddress.city }}, {{ user.defaultAddress.zip }}</p>
          <p>{{ user.defaultAddress.country }}</p>
        </div>
        <p v-else class="text-text italic text-sm">No default address set.</p>
      </div>
      <router-link :to="{ name: 'address' }" class="hover:text-blue-500">View Addresses({{ user.addressBook.length }})</router-link>
    </section>
  </div>
</template>

<script setup>
import { userStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore'

const user = userStore()

const cart = useCartStore()
</script>

<style></style>
