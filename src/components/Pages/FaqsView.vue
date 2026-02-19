<template>
    <div>
        <section class="bg-sec p-8 w-full">
            <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
                <span>Home  /  <span class="text-text">Faqs</span> </span>
            </div>
        </section>

        <section class="flex flex-col px-20 mt-20">
            <h1 class="mb-8 text-4xl">Shipping information</h1>
            <div class="h-fit">
                <details v-for="(faq, index) in Faqs" :key="index"  class="group rounded-lg overflow-hidden transition-all duration-500">
      
                    <summary class="flex items-center justify-between p-4 cursor-pointer list-none ">
                        <span  class="font-medium text-2xl text-dark">{{ faq.title }}</span>
                        
                    </summary>

                    <div class="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-linear group-open:grid-rows-[2fr]">
                        <div class="overflow-hidden">
                            <div class="p-4 pt-0 text-gray-600 text-sm leading-relaxed">
                                {{ faq.note }}
                            </div>
                        </div>
                    </div>
                    </details>
            </div>
        </section>

        <section class="p-15 mt-15 flex justify-between w-full bg-[#6d7f96]">
            <h2 class="text-3xl text-white">Call To Action Title</h2>
            <ButtonComp>CONTACT US</ButtonComp>
        </section>
    </div>
</template>
<script setup>
import ButtonComp from '../Universal/ButtonComp.vue';

const Faqs = [
    {title:'frequently Asked Questions', note:' Once your order has been shipped, you will receive an email with your tracking and shipping information.'},
    {title:'frequently Asked Questions', note:' Once your order has been shipped, you will receive an email with your tracking and shipping information.'},
    {title:'frequently Asked Questions', note:' Once your order has been shipped, you will receive an email with your tracking and shipping information.'},
    {title:'frequently Asked Questions', note:' Once your order has been shipped, you will receive an email with your tracking and shipping information.'},
];

</script>
<style lang="">
    
</style>