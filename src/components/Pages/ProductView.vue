<template>
  <div>
    <div><Toaster position="top-center" :reverseOrder="false"/></div>
    <section class="bg-sec p-4 md:p-8 w-full">
      <div class="max-w-7xl mx-auto text-sm">
        <div class="flex flex-col items-start">
          <span class="text-3xl md:text-5xl text-dark mb-2 md:mb-4 font-medium">Products</span>
          <span>Home / <span class="text-text">Products</span> </span>
        </div>
      </div>
    </section>

    <section class="border-b px-4 md:px-8 w-full bg-white sticky top-0 z-10">
      <div class="py-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="hidden md:flex items-center gap-4 p-2 rounded-lg w-fit bg-gray-50">
          <button
           v-for="n in [4, 3, 2, 1]" :key="n"
            @click="cols = n"
            :class="[cols === n ? 'text-dark shadow-sm bg-white' : 'text-gray-400']"
            class="p-2 rounded transition-all hover:text-dark"
          >
            <Icon :icon="getIcon(n)" width="18" />
          </button>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 items-center text-text text-xs md:text-sm w-full md:w-auto">
          <div class="flex items-center gap-2 whitespace-nowrap">
            <span>Show</span>
            <select @change="handleItemsPerPageChange" class="bg-white border border-gray-300 rounded-md p-1 md:p-2 outline-none">
              <option v-for="num in numbs" :key="num.id" :value="num.id" :selected="num.id === 12">
                {{ num.id }}
              </option>
            </select>
            <span>of {{ store.pagination.total }} results</span>
          </div>

          <div class="flex items-center gap-2 whitespace-nowrap">
            <span>Sort:</span>
            <select class="bg-white border border-gray-300 rounded-md p-1 md:p-2 outline-none w-full sm:w-auto">
              <option v-for="sort in sorts" :key="sort.cat" :value="sort.cat">{{ sort.cat }}</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <section class="p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      
        <aside class="w-full lg:w-1/4">
        <div class="lg:sticky lg:top-24">
          <AccordionView />
        </div>
      </aside>

      <main class="flex flex-col w-full lg:w-3/4">
        
        <div v-if="store.searchQuery" class="mb-6 p-4 bg-gray-50 border-l-4 border-dark flex flex-wrap items-center justify-between gap-2">
          <p class="text-text">
            Results for: <span class="font-bold text-dark">"{{ store.searchQuery }}"</span>
          </p>
          <button @click="store.searchQuery = ''" class="text-red-500 hover:underline text-sm font-medium">
            Clear Search
          </button>
        </div>

        <div 
          class="grid gap-4 md:gap-8 transition-all duration-500"
          :class="responsiveGridClasses"
        >
          <template v-if="store.loading">
            <ProductCardSkeleton v-for="n in 8" :key="n" />
          </template>
          <template v-else>
            <ProductCard v-for="product in store.products" :key="product.id" :product="product" />
          </template>
        </div>

        <div class="flex flex-wrap justify-center items-center mt-12 gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1 || store.loading"
            class="p-2 border rounded-md disabled:opacity-20 hover:bg-gray-50 transition-colors">
            <Icon icon="ri:arrow-left-s-line" width="20" />
          </button>

          <div class="flex gap-1 overflow-x-auto">
            <button v-for="page in displayedPages" :key="page"
              @click="currentPage = page"
              :class="[currentPage === page ? 'bg-dark text-white border-dark' : 'hover:bg-gray-50 border-gray-200']"
              class="min-w-10 h-10 border rounded-md transition-all duration-200 text-sm font-medium"
            >
              {{ page }}
            </button>
          </div>

          <button @click="currentPage++" :disabled="currentPage >= totalPages || store.loading"
            class="p-2 border rounded-md disabled:opacity-20 hover:bg-gray-50 transition-colors">
            <Icon icon="ri:arrow-right-s-line" width="20" />
          </button>
        </div>
      </main>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { Toaster } from 'vue3-hot-toast'
import { Icon } from '@iconify/vue'
import AccordionView from './AccordionView.vue'
import ProductCard from '../Universal/productCard.vue'
import { useProductStore } from '@/stores/productStore'
import { useRoute, useRouter } from 'vue-router'
import ProductCardSkeleton from '../Universal/ProductCardSkeleton.vue'

const store = useProductStore()
const route = useRoute()
const router = useRouter()

const cols = ref(3)

const currentPage = ref(parseInt(route.query.page) || 1)
const itemsPerPage = ref(parseInt(route.query.per_page) || 12)

const totalPages = computed(() => store.pagination.last_page || 1)


watch([currentPage, itemsPerPage], ([newPage, newItems]) => {
  router.push({ 
    query: { ...route.query, page: newPage, per_page: newItems } })
    store.fetchProducts(newPage, newItems)
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

watch(() => route.query.page, (newVal)=> {
  const page = parseInt(newVal) || 1
  if (page !== currentPage.value) {
    currentPage.value = page
  }
})


const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2 // Number of pages to show on each side of current
  
  let pages = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    pages.push(i)
  }
  return pages
})

// const paginatedProducts = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage.value
//   const end = start + itemsPerPage.value
//   return store.filterProducts.slice(start, end)
// })

// const totalPages = computed(() => {
//   return Math.ceil(store.filterProducts.length / itemsPerPage.value)
// })

const handleItemsPerPageChange = (event) => {
  itemsPerPage.value = parseInt(event.target.value)
  currentPage.value = 1
}

const numbs = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 19 },
  { id: 20 },
]

const sorts = [
  { cat: 'Featured' },
  { cat: 'Best Selling' },
  { cat: 'Alphabetically,A-Z' },
  { cat: 'Alphabetically,Z-A' },
  { cat: 'Price, low to high' },
  { cat: 'Price, high to low' },
  { cat: 'Date, new to old' },
  { cat: 'Date, old to new' },
]

const getIcon = (n) => {
  const icons = {
    4: 'ri:grid-fill',
    3: 'ri:layout-grid-fill',
    2: 'ri:layout-2-fill',
    1: 'ri:layout-top-fill'
  }
  return icons[n]
};

const responsiveGridClasses = computed(() => {
  return {
    // Mobile: Always 1 or 2 columns
    'grid-cols-1 sm:grid-cols-2': true,
    
    // Tablet (md): Respect the 'cols' choice but cap it at 3
    'md:grid-cols-2 lg:grid-cols-3': cols.value >= 3,
    
    // Desktop (lg+): Fully respect the choice
    'lg:grid-cols-1': cols.value === 1,
    'lg:grid-cols-2': cols.value === 2,
    'lg:grid-cols-3': cols.value === 3,
    'lg:grid-cols-4': cols.value === 4,
  }
})

onMounted(async () => {
  await store.fetchProducts(currentPage.value, itemsPerPage.value)
});

</script>

<style lang="">
</style>
