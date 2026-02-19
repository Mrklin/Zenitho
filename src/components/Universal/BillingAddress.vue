
<template>
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
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';
//useFormValues
import { Icon } from '@iconify/vue';

// We inject the errors from the parent Form component automatically
// providing we are inside a <Form> tag in the parent.
const props = defineProps({
  countries: {
    type: Array,
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style scoped>
@reference "../../main.css";

.input-field {
  @apply w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-shadow;
}
</style>