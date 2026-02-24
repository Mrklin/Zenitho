<template>
  <div>
    <section class="bg-sec px-10 py-8 w-full">
      <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
        <div class="flex items-start">
          <span class="cursor-pointer"
            ><router-link :to="{ name: 'dashboard' }">Home</router-link> /
            <span class="text-text">Address</span>
          </span>
        </div>
      </div>
    </section>

    <section class="px-4 py-6 md:px-10 lg:px-20 w-full">
      <div class="flex flex-col gap-4 justify-start items-start pb-3 border-b border-b-text">
        <h2 class="text-3xl">My Account</h2>
        <ButtonComp @click="showForm = true" class="py-2"> ADD A NEW ADDRESS </ButtonComp>
      </div>
      <div class="flex flex-col gap-3 mt-3 justify-start">
        <router-link :to="{ name: 'account' }" class="hover:text-blue-500">Return to account details</router-link>

        <Transition name="fade">
          <!-- <div v-if="showForm" class="bg-gray-50 p-8 border rounded-md mb-10">
            <h3 class="text-xl font-semibold mb-6">Add a New Address</h3>
            <form @submit.prevent="submitAddress" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="form.fName" placeholder="First Name" class="border p-3" required />
              <input v-model="form.lName" placeholder="Last Name" class="border p-3" required />
              <input v-model="form.company" placeholder="Company" class="border p-3 col-span-2" />
              <input
                v-model="form.address1"
                placeholder="Address 1"
                class="border p-3 col-span-2"
                required
              />
              <input
                v-model="form.address2"
                placeholder="Address 2"
                class="border p-3 col-span-2"
              />

            <div class="flex flex-col gap-1">
                <label class="text-xs text-text">Country</label>
                <select
                  v-model="form.country"
                  class="border p-3 bg-white"
                  :disabled="isLoadingCountries"
                >
                  <option value="">
                    {{ isLoadingCountries ? 'Loading...' : 'Select Country' }}
                  </option>
                  <option v-for="c in countries" :key="c.name" :value="c.name">{{ c.name }}</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xs text-text">State / Province</label>
                <select
                  v-model="form.state"
                  class="border p-3 bg-white"
                  :disabled="!form.country || isLoadingStates"
                >
                  <option value="">{{isLoadingStates ? 'Fetching States...': !form.country ? 'Pick a country first' : 'Select State'
                    }}
                  </option>
                  <option v-for="s in states" :key="s.name" :value="s.name">{{ s.name }}</option>
                </select>
              </div>

              <input v-model="form.city" placeholder="City" class="border p-3" required />

              <input v-model="form.zip" placeholder="Postal/Zip Code" class="border p-3" required />
              
              <input v-model="form.phone" placeholder="Phone" class="border p-3" />

              <div class="col-span-2 flex items-center gap-2 mt-2">
                <input type="checkbox" id="default" v-model="form.isDefault" />
                <label for="default">Set as default address?</label>
              </div>

              <div class="col-span-2 flex gap-4 mt-4">
                <button type="submit" class="bg-dark text-white px-6 py-2">ADD ADDRESS</button>
                <button type="button" @click="showForm = false" class="border px-6 py-2">
                  CANCEL
                </button>
              </div>
            </form>
          </div> -->

          <BillingAddress 
             v-if="showForm" 
             @save="handleSave" 
            @cancel="showForm = false"/>

        </Transition>

        <!-- <div>
                when the add a new address button is clicked v-show brings a box to input detail 
                first name, last name, company, address 1, address 2, city, 
                country(for the countey you can use an Api or plugin that targets all countries and their states if the countries have),
                postal/zip code, phone, a radio button to set as default, a button to add address, a button to cancel
            </div> -->

        <div class="flex flex-col">
          <h3 class="text-3xl mb-6">Your Addresses</h3>
          <div
            v-if="user.addressBook.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="addr in user.addressBook"
              :key="addr.id"
              class="border p-6 rounded relative"
            >
              <span
                v-if="addr.isDefault"
                class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded absolute top-4 right-4"
                >DEFAULT</span
              >
              <p class="font-bold">{{ addr.fName }} {{ addr.lName }}</p>
              <p class="text-text text-sm">{{ addr.address1 }}</p>
              <p class="text-text text-sm">{{ addr.city }}, {{ addr.zip }}</p>
              <p class="text-text text-sm">{{ addr.country }}</p>

              <div class="flex gap-4 mt-4 text-sm font-medium">
                <button class="hover:underline">Edit</button>
                <button @click="user.deleteAddress(addr.id)" class="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-text italic">No addresses saved yet.</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/userStore'
import ButtonComp from '../Universal/ButtonComp.vue'
import BillingAddress from '../Universal/BillingAddress.vue'
// import axios from 'axios'

const user = userStore()
const showForm = ref(false)
// const countries = ref([])
// const states = ref([])
// const isLoadingCountries = ref(false)
// const isLoadingStates = ref(false)

// const form = reactive({
//   fName: '',
//   lName: '',
//   company: '',
//   address1: '',
//   address2: '',
//   city: '',
//   country: '',
//   zip: '',
//   phone: '',
//   isDefault: false,
// })

// const fetchCountries = async () => {
//   isLoadingCountries.value = true
//   try {
//     const response = await axios.get('https://countriesnow.space/api/v0.1/countries/positions')
//     // Sort them alphabetically for better UX
//     countries.value = response.data.data.sort((a, b) => a.name.localeCompare(b.name))
//   } catch (error) {
//     console.error('Error fetching countries:', error)
//   } finally {
//     isLoadingCountries.value = false
//   }
// }

// const fetchStates = async (countryName) => {
//   if (!countryName) return
//   isLoadingStates.value = true
//   states.value = [] // Clear old states
//   try {
//     const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
//       country: countryName,
//     })
//     states.value = response.data.data.states
//   } catch (error) {
//     console.error('Error fetching states:', error)
//     states.value = [] // Some countries might not have states in the API
//   } finally {
//     isLoadingStates.value = false
//   }
// }

// watch(
//   () => form.country,
//   (newCountry) => {
//     form.state = '' // Reset state selection
//     fetchStates(newCountry)
//   },
// )

// onMounted(() => {
//   fetchCountries()
// })

const handleSave = (formData) => {
  user.addAddress(formData);
  showForm.value = false;
};

// const submitAddress = () => {
//   user.addAddress(form)
//   showForm.value = false

//   // Reset form
//   Object.keys(form).forEach((key) => (form[key] = key === 'isDefault' ? false : ''))
// }
</script>
<style lang=""></style>
