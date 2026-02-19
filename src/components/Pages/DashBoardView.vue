<template>
    <div class="overflow-x-hidden">
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        
        <!-- Carousel -->
        <section class="py-4 md:py-8">
            <Carousel v-bind="carouselConfig">
                <Slide v-for="(img, index) in carouselImgs" :key="index">
                <div class="carousel__item w-full px-4 md:px-10 relative">
                    <img :src="img" alt="Carousel Image" class="rounded-lg object-cover w-full h-75 md:h-125 lg:h-100" />
                    <div class="absolute inset-0 flex flex-col justify-center items-center lg:items-start lg:justify-start lg:top-30 lg:left-30 px-6 z-10 gap-2 md:gap-3 text-center lg:text-left bg-black/10 lg:bg-transparent rounded-lg">
                        <h3 class="text-sm md:text-xl font-semibold tracking-widest text-white lg:text-dark">ACCESSORIES</h3>
                        <h1 class="text-white lg:text-dark text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">Bottle Grinder, <br>Small, 2-Piecehe </h1>
                        <ButtonComp> 
                            SHOP NOW
                        </ButtonComp>
                    </div>
                </div>
                </Slide>

                <template #addons>
                <div class="hidden md:block">
                        <Navigation />
                </div>
                <Pagination />
                </template>
            </Carousel>
            </section>

         <!-- Product -->
        <section class="px-6 md:px-15 lg:px-30 my-10 md:my-15 flex flex-col items-center">
            <div class="flex flex-wrap justify-center gap-6 md:gap-10 mb-8 md:mb-10">
                    <!-- Our Products -->
                <span v-for="(type, index) in productType"
                @click="activeType=index"
                :class="[activeType===index ? 'text-dark': 'text-text','text-4xl cursor-pointer  font-medium transition-all duration-300 relative pb-1 group/alink']"
                 :key="index">{{ type }} 

                    <span :class="[activeType === index ? 'w-full' : 'w-0', 
                        'absolute bottom-0 left-0 h-0.5 bg-dark transition-all duration-300']">
                    </span>

                </span>
            </div>

            <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                <ProductCardSkeleton 
                v-for="item in displayedProducts"
                :key="item.id" />
            </div>
            
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                <productCard 
                v-for="item in displayedProducts" 
                :key="item.id" 
                :product="item" />
            </div>

        </section>
        
        <section class="px-6 md:px-15 lg:px-30 my-10 md:my-15 w-full flex flex-col items-center">
            <div class="w-full mb-8 overflow-hidden rounded-lg">
                <img :src="cabinet" alt="cabinet" class="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700">
            </div>

            <div class="flex gap-6 justify-center items-center text-text mb-6">
                <router-link v-for="link in extraLinks" :key="link.name" to=""
                class="text-sm md:text-base hover:text-dark hover:underline font-medium">
                    {{ link.name }}
                </router-link>
            </div>

            <div class="flex flex-col items-center max-w-2xl">
                <h2 class="text-2xl md:text-4xl text-center mb-8 leading-snug">
                    Up To 40% Off Final Sale Items. <br class="hidden md:block"> Caught in the moment!
                </h2>
                <ButtonComp>Show Now</ButtonComp>
            </div>
        </section>

    </div>
</template>

<script setup>
import ButtonComp from '../Universal/ButtonComp.vue';
import productCard from '../Universal/productCard.vue';
import ProductCardSkeleton from '../Universal/ProductCardSkeleton.vue';
import { onMounted, computed, watch } from 'vue';
import { useProductStore } from '@/stores/productStore';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref } from 'vue';
import { Toaster } from 'vue3-hot-toast';
import cabinet from '@/assets/cabinet.webp'
import carousel1 from '@/assets/carousel01.webp'
import carousel2 from '@/assets/carousel02.webp'
import carousel3 from '@/assets/carousel03.webp'
import carousel4 from '@/assets/carousel04.webp'


const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  transition:600,
  snapAlign:'center',
  breakpoints: {
    768: {
      itemsToShow: 1,
    },
    1024: {
      itemsToShow: 1.2,
    }
  }
}

const store = useProductStore();

const carouselImgs = [ carousel1, carousel2, carousel3, carousel4 ]

const productType = ['New', 'Popular', 'Sale']

const activeType = ref(0)


watch(activeType, async (newVal) => {
  const category = productType[newVal];
//   if (!store.productByCat[category].length) {
//     await store.fetchProducts(category);
//     }
    await store.fetchProducts(1, 6, category);
});

const displayedProducts = computed(() => {
  const current = productType[activeType.value];

  return store.productByCat[current].slice(0, 6);
});

const extraLinks = [
    {name:'#Summer', to:''},
    {name:'#Shelf', to:''},
    {name:'#Sale', to:''}
];

onMounted(async () => {
    if (store.products.length === 0) {
        await store.fetchProducts(1, 6, 'New');
    }
});

</script>
<style >
.carousel__prev,
.carousel__next {
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  color: #333;
}

.carousel__pagination-button--active::after {
  background-color: #000; /* Match your brand color */
}
</style>