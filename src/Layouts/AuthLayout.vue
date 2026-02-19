<template>
    <div>
        <NavComp />
        <RouterView />
        <FooterComp />
    </div>
</template>

<script setup>
import NavComp from '../components/Universal/NavComp.vue'
import FooterComp from '../components/Universal/FooterComp.vue';
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n();

watch(locale, (newLocale) => {
  localStorage.setItem('user-language', newLocale)
});

</script>
<style>
    
</style>