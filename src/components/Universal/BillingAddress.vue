
<!-- <template>
  <div class="space-y-3">
    <div class="relative">
      <Field 
        as="select" 
        name="billingCountry" 
        class="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black appearance-none transition-shadow"
        :class="{'border-red-500': errors.billingCountry}"
      >
        <option value="" disabled>Country/Region</option>
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </Field>
      <Icon icon="ri:arrow-down-s-line" class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
      <ErrorMessage name="billingCountry" class="text-red-500 text-xs mt-1 block" />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <Field name="billingFirstName" type="text" placeholder="First name" class="input-field" :class="{'border-red-500': errors.billingFirstName}" />
        <ErrorMessage name="billingFirstName" class="text-red-500 text-xs mt-1 block" />
      </div>
      <div>
        <Field name="billingLastName" type="text" placeholder="Last name" class="input-field" :class="{'border-red-500': errors.billingLastName}" />
        <ErrorMessage name="billingLastName" class="text-red-500 text-xs mt-1 block" />
      </div>
    </div>

    <div>
      <Field name="billingAddress" type="text" placeholder="Address" class="input-field" :class="{'border-red-500': errors.billingAddress}" />
      <ErrorMessage name="billingAddress" class="text-red-500 text-xs mt-1 block" />
    </div>

    <div>
      <Field name="billingApartment" type="text" placeholder="Apartment, suite, etc. (optional)" class="input-field" />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <Field name="billingCity" type="text" placeholder="City" class="input-field" :class="{'border-red-500': errors.billingCity}" />
        <ErrorMessage name="billingCity" class="text-red-500 text-xs mt-1 block" />
      </div>
      <div>
        <Field name="billingZip" type="text" placeholder="Postal code" class="input-field" :class="{'border-red-500': errors.billingZip}" />
        <ErrorMessage name="billingZip" class="text-red-500 text-xs mt-1 block" />
      </div>
    </div>
  </div>

</template> -->



<template>
    <div class="bg-gray-50 p-3 rounded-md mb-6">
      <h3 v-if="display" class="text-xl font-semibold mb-4">{{ title }}</h3>
      
      <form @submit="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <input v-model="fName" v-bind="fNameAttrs" placeholder="First Name" 
                 :class="['border p-2', errors.fName ? 'border-red-500' : 'input-field']" />
          <span class="text-red-500 text-xs">{{ errors.fName }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <input v-model="lName" v-bind="lNameAttrs" placeholder="Last Name" 
                 :class="['border p-3', errors.lName ? 'border-red-500' : 'input-field']" />
          <span class="text-red-500 text-xs">{{ errors.lName }}</span>
        </div>

        <input v-if="display" v-model="company" placeholder="Company" class="input-field p-3 col-span-2" />

        <div class="flex flex-col gap-1 col-span-2">
          <input v-model="address1" v-bind="address1Attrs" placeholder="Address 1" 
                 :class="['border p-3', errors.address1 ? 'border-red-500' : 'input-field']" />
          <span class="text-red-500 text-xs">{{ errors.address1 }}</span>
        </div>

        <input  v-model="address2" placeholder="Address 2" class="border input-field col-span-2" />

        <div class="flex flex-col gap-1">
          <label class="text-xs text-text">Country</label>
          <select v-model="country" v-bind="countryAttrs" class="input-field" :disabled="isLoadingCountries">
            <option value="">{{ isLoadingCountries ? 'Loading...' : 'Select Country' }}</option>
            <option v-for="c in countries" :key="c.name" :value="c.name">{{ c.name }}</option>
          </select>
          <span class="text-red-500 text-xs">{{ errors.country }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs text-text">State / Province</label>
          <select v-model="state" v-bind="stateAttrs" class="input-field" :disabled="!country || isLoadingStates">
            <option value="">{{ isLoadingStates ? 'Fetching...' : !country ? 'Pick a country first' : 'Select State' }}</option>
            <option v-for="s in states" :key="s.name" :value="s.name">{{ s.name }}</option>
          </select>
          <span class="text-red-500 text-xs">{{ errors.state }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <input v-model="city" v-bind="cityAttrs" placeholder="City" 
                 :class="['border p-3', errors.city ? 'border-red-500' : 'input-field']" />
          <span class="text-red-500 text-xs">{{ errors.city }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <input v-model="zip" v-bind="zipAttrs" placeholder="Postal/Zip Code" 
                 :class="['border p-3', errors.zip ? 'border-red-500' : 'input-field']" />
          <span class="text-red-500 text-xs">{{ errors.zip }}</span>
        </div>

        <div class="flex flex-col gap-1 col-span-2">
          <input v-model="phone" v-bind="phoneAttrs" placeholder="Phone" class="border p-2 input-field" />
          <span class="text-red-500 text-xs">{{ errors.phone }}</span>
        </div>

        <div v-if="display" class="col-span-2 flex items-center gap-2 mt-2">
          <input type="checkbox" id="default" v-model="isDefault" />
          <label for="default">Set as default address?</label>
        </div>

        <div v-if="display" class="col-span-2 flex gap-4 mt-4">
          <button type="submit" class="bg-dark text-white px-6 py-2">
            {{ submitText }}
          </button>
          <button type="button" @click="$emit('cancel')" class="border px-6 py-2">
            CANCEL
          </button>
        </div>
      </form>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';

const props = defineProps({
  title: { type: String, default: 'Add a New Address' },
  submitText: { type: String, default: 'ADD ADDRESS' },
  initialData: { type: Object, default: () => ({}) },
  display: {type: Boolean, default: true}
});

const emit = defineEmits(['save', 'cancel', 'country-change']);

// 1. Validation Schema
const schema = yup.object({
  fName: yup.string().required('First name is required'),
  lName: yup.string().required('Last name is required'),
  address1: yup.string().required('Address is required'),
  country: yup.string().required('Select a country'),
  state: yup.string().required('Select a state'),
  city: yup.string().required('City is required'),
  zip: yup.string().required('Zip code is required'),
  phone: yup.string().min(10, 'Phone number is too short')
});

// 2. Form Setup
const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.initialData
});

const [fName, fNameAttrs] = defineField('fName');
const [lName, lNameAttrs] = defineField('lName');
const [company] = defineField('company');
const [address1, address1Attrs] = defineField('address1');
const [address2] = defineField('address2');
const [country, countryAttrs] = defineField('country');
const [state, stateAttrs] = defineField('state');
const [city, cityAttrs] = defineField('city');
const [zip, zipAttrs] = defineField('zip');
const [phone, phoneAttrs] = defineField('phone');
const [isDefault] = defineField('isDefault');

// 3. API Logic
const countries = ref([]);
const states = ref([]);
const isLoadingCountries = ref(false);
const isLoadingStates = ref(false);

const fetchCountries = async () => {
  isLoadingCountries.value = true;
  try {
    const res = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
    countries.value = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) { console.error(err); }
  finally { isLoadingCountries.value = false; }
};

const fetchStates = async (name) => {
  if (!name) return;
  isLoadingStates.value = true;
  try {
    const res = await axios.post('https://countriesnow.space/api/v0.1/countries/states', { country: name });
    states.value = res.data.data.states;
  } catch (err) { 
    console.error(err);
    states.value = []; }
  finally { isLoadingStates.value = false; }
};

watch(country, (newVal) => {
  state.value = ''; // Reset state
  fetchStates(newVal);
  emit('country-change', newVal)
});

onMounted(fetchCountries);

// 4. Submit
const onSubmit = handleSubmit((values) => {
  emit('save', values);
  resetForm();
});
</script>

<style scoped>
@reference "../../main.css";

.input-field {
  @apply w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-shadow;
}
</style>