<script setup>
import { RouterView } from 'vue-router';
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue';
import { useCurrencyStore } from './stores/currencyStore';
import ScrollToTop from './components/Universal/ScrollToTop.vue';

const { locale } = useI18n();

const currencyStore = useCurrencyStore();

watch(locale, (newLocale) => {
  localStorage.setItem('user-language', newLocale)
});

onMounted(() => {
  currencyStore.fetchExchangeRates()
})

</script>

<template>

  <RouterView />

  <ScrollToTop />
  
</template>

<style scoped></style>
