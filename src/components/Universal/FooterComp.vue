<!-- <template>
    <div class="bg-sec px-15 pt-15 pb-20 flex justify-between items-start bottom-0
    text-text text-sm mt-30">
        <div class="flex flex-col gap-4 items-start">
            <div class="flex gap-4 justify-start items-center">
                <router-link :to="{name:link.url}" class="hover:underline duration-200 transition-all ease-linear"
                 v-for="(link, index) in links" :key="index"
                >{{ $t(link.name) }}</router-link>
            </div>
            <p>© 2018 {{ $t('lezada. All Rights Reserved') }} | (+00) 123 567990  | <span>contact@lezada.com</span></p>
        </div>

        <div class="flex flex-col items-end justify-center">
            <div class="flex gap-6 p-4 rounded-xl shadow-sm">
                <a v-for="link in socialLinks" 
                    :key="link.name" 
                    :href="link.url"
                    target="_blank"
                    class="transition-transform hover:scale-110"
                    >
                    <Icon :icon="link.icon" 
                    class="text-black"
                    width="20" height="20" />
                </a>
            </div>

            <div>
                <div class="flex gap-4 mt-4">
                    <component 
                    v-for="(icon, index) in paymentIcons" 
                    :is="icon" 
                    :key="index" />
                </div>
            </div>

            <div class="mt-6 flex gap-3 items-center">
                <div class="flex items-center gap-3">
                    <label for="lang-select" class="text-sm font-medium text-gray-700">
                    <Icon icon="heroicons:language" class="w-5 h-5 inline mr-1" />
                    {{ $t('language') }}: 
                    </label>
        
                    <div class="relative">
                    <select 
                        id="lang-select"
                        v-model="locale"
                        class="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                        {{ lang.name }}
                        </option>
                    </select>
                    </div>
                </div>

                <div class="flex items-center  gap-3">
                    <label class="text-sm font-medium">{{ $t('currency') }}:</label>
                    <select 
                    v-model="currencyStore.currency"
                    class="bg-white outline-0 border border-gray-300 rounded-lg p-2"
                    >
                    <option v-for="curr in availableCurrencies" :key="curr" :value="curr">
                        {{ curr }}
                    </option>
                    </select>
                </div>

            </div>
            
        </div>
    </div>
</template> -->

<template>
  <footer class="bg-sec px-6 md:px-15 pt-15 pb-10 lg:pb-20 flex flex-col lg:flex-row justify-between items-center lg:items-start bottom-0 text-text text-sm mt-20 lg:mt-30 gap-10 lg:gap-0">
    
    <div class="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
      <div class="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
        <router-link 
          :to="{name: link.url}" 
          class="hover:underline duration-200 transition-all ease-linear"
          v-for="(link, index) in links" :key="index"
        >
          {{ $t(link.name) }}
        </router-link>
      </div>
      
      <p class="max-w-md">
        © 2026 {{ $t('Lezada. All Rights Reserved') }} <br class="md:hidden" /> 
        <span class="hidden md:inline">|</span> (+00) 123 567990 <br class="md:hidden" />
        <span class="hidden md:inline">|</span> <span>contact@lezada.com</span>
      </p>
    </div>

    <div class="flex flex-col items-center lg:items-end justify-center order-1 lg:order-2 w-full lg:w-auto">
      
      <div class="flex gap-6 p-2 lg:p-4 justify-center">
        <a v-for="link in socialLinks" 
           :key="link.name" 
           :href="link.url"
           target="_blank"
           class="transition-transform hover:scale-110"
        >
          <Icon :icon="link.icon" class="text-black" width="20" height="20" />
        </a>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mt-2 lg:mt-4">
        <component 
          v-for="(icon, index) in paymentIcons" 
          :is="icon" 
          :key="index" 
          class="w-8 lg:w-auto"
        />
      </div>

      <div class="mt-8 lg:mt-6 flex flex-col sm:flex-row gap-6 items-center">
        <div class="flex items-center gap-3">
          <label for="lang-select" class="text-sm font-medium text-gray-700">
            <Icon icon="heroicons:language" class="w-5 h-5 inline mr-1" />
            {{ $t('language') }}: 
          </label>
          <select 
            id="lang-select"
            v-model="locale"
            class="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-lg block p-2 px-4 focus:ring-1 focus:ring-dark"
          >
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </div>

        <div class="flex items-center gap-3">
          <label class="text-sm font-medium">{{ $t('currency') }}:</label>
          <select 
            v-model="currencyStore.currency"
            class="bg-white outline-0 border border-gray-300 rounded-lg p-2 px-4 focus:ring-1 focus:ring-dark"
          >
            <option v-for="curr in availableCurrencies" :key="curr" :value="curr">
              {{ curr }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';  
import visaIcon from '../Icons/visaIcon.vue';
import masterCard from '../Icons/masterCard.vue';
import americanExp from '../Icons/americanExp.vue';
import paypalIcon from '../Icons/paypalIcon.vue';
import themeIcon from '../Icons/themeIcon.vue';
import discoverIcon from '../Icons/discoverIcon.vue';
import { useI18n } from 'vue-i18n'
import { useCurrencyStore } from '@/stores/currencyStore'



const links= [
        {
            name: 'Search',
            url: 'search',
        },
        {
            name: 'About Us',
            url: 'about',
        },
        {
            name: 'Contact',
            url: 'contact',
        },
        {
            name: 'Policy',
            url: 'policy',
        },
        {
            name: 'Faqs',
            url: 'faqs',
        },
    ];


const socialLinks = [
  { 
    name: 'Facebook', 
    icon: 'ri:facebook-fill',       // Monochrome option
    url: 'https://facebook.com' 
  },
  { 
    name: 'Instagram', 
    icon: 'ri:instagram-fill', 
    url: 'https://instagram.com' 
  },
  { 
    name: 'Twitter/X', 
    icon: 'ri:twitter-x-fill',    // Modern X logo
    url: 'https://twitter.com' 
  },
  { 
    name: 'LinkedIn', 
    icon: 'ri:linkedin-fill', 
    url: 'https://linkedin.com' 
  },
  { 
    name: 'YouTube', 
    icon: 'ri:youtube-fill', 
    url: 'https://youtube.com' 
  }
];

const paymentIcons = [
    visaIcon,
    masterCard,
    americanExp,
    paypalIcon,
    themeIcon,
    discoverIcon,
];

const { locale } = useI18n();

const languages = [
  { name: 'English', code: 'en', flag: 'twemoji:flag-united-kingdom' },
  { name: 'Español', code: 'es', flag: 'twemoji:flag-spain' },
  { name: 'Français', code: 'fr', flag: 'twemoji:flag-france' }
];

const currencyStore = useCurrencyStore()
const availableCurrencies = ['USD', 'EUR', 'GBP', 'NGN'];


</script>
<style lang="">
    
</style>