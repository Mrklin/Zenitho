<template>
  <div>
    <div><Toaster position="top-center" :reverseOrder="false"/></div>
    <section class="bg-sec p-8 w-full">
      <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
        <div class="flex flex-col items-start">
          <span class="text-5xl text-dark mb-4">Products</span>
          <span>Home / <span class="text-text">Products</span> </span>
        </div>
      </div>
    </section>

    <section class="border-b px-8 w-full">
      <div class="p-6 flex justify-between items-center">
        <div class="flex items-center gap-4 p-2 rounded-lg w-fit">
          <button
            @click="cols = 4"
            :class="{ 'text-dark shadow-sm bg-white': cols === 4 }"
            class="p-2 rounded transition-all"
          >
            <Icon icon="ri:grid-fill" width="18" />
          </button>

          <button
            @click="cols = 3"
            :class="{ 'text-dark shadow-sm bg-white': cols === 3 }"
            class="p-2 rounded transition-all text-gray-400"
          >
            <Icon icon="ri:layout-grid-fill" width="18" />
          </button>

          <button
            @click="cols = 2"
            :class="{ 'text-dark shadow-sm bg-white': cols === 2 }"
            class="p-2 rounded transition-all text-gray-400"
          >
            <Icon icon="ri:layout-2-fill" width="18" />
          </button>

          <button
            @click="cols = 1"
            :class="{ 'text-dark shadow-sm bg-white': cols === 1 }"
            class="p-2 rounded transition-all text-gray-400"
          >
            <Icon icon="ri:layout-top-fill" width="18" />
          </button>
        </div>

        <div class="flex gap-4 items-center text-text">
          <span>
            Showing {{ store.pagination.from }} - {{ store.pagination.to }} of {{ store.pagination.total }} result
            <select
              @change="handleItemsPerPageChange"
              class="bg-white outline-0 border border-gray-300 rounded-lg p-2"
            >
              <option v-for="num in numbs" :key="num.id" :value="num.id" :selected="num.id === 12">
                {{ num.id }}
              </option>
            </select>
            per page
          </span>
          <span>
            Sort by:
            <select class="bg-white outline-0 border border-gray-300 rounded-lg p-2">
              <option v-for="sort in sorts" :key="sort.cat" :value="sort">
                {{ sort.cat }}
              </option>
            </select>
          </span>
        </div>
      </div>
    </section>

    <section class="p-8 flex gap-2">
      <div class="w-1/4">
        <AccordionView />
        <!-- <Disclosure v-slot="{open}">
                    <DisclosureButton class="py-2 flex gap-3 items-center justify-between">
                            <span class="text-3xl">Custom Menu</span> 
                             <Icon icon="ri:arrow-down-s-line" width="18" 
                             :class="open ? 'rotate-180 transform transition-transform duration-200 ease-in-out':''"  />
                    </DisclosureButton>
                    <DisclosurePanel as="ul" class="text-gray-500">
                        <li>Home</li>
                        <li>Shop</li>
                        <Disclosure v-slot="{open}">
                            <DisclosureButton class="flex justify-between items-center">
                                <span>Catalog SALE</span>
                                <Icon :icon="open ? 'ri:subtract-line' : 'ri:add-line'" width="20" 
                                    class="transition-transform duration-200" />
                            </DisclosureButton>
                            <DisclosurePanel as="ul">
                              <li>fast</li>
                            </DisclosurePanel>
                        </Disclosure>

                    </DisclosurePanel>
                </Disclosure> -->
      </div>

      <div class="flex flex-col w-3/4">
        <div
          v-if="store.searchQuery"
          class="mb-6 p-3 bg-gray-50 border-l-4 border-dark flex items-center justify-between"
        >
          <p class="text-text">
            Showing results for: <span class="font-bold text-dark">"{{ store.searchQuery }}"</span>
          </p>
            <!-- <p>Debug: Search Query is [{{ store.searchQuery }}]</p>
            <p>Debug: Number of filtered items: {{ store.filterProducts.length }}</p> -->
          <button
            @click="store.searchQuery = ''"
            class="text-red-500 hover:text-red-700 underline text-sm"
          >
            Clear Search
          </button>
        </div>

        <div v-if="store.loading"
          class="grid gap-8 transition-all duration-500"
          :class="{
            'grid-cols-4': cols === 4,
            'grid-cols-3': cols === 3,
            'grid-cols-2': cols === 2,
            'grid-cols-1': cols === 1,
          }"
        >
          <ProductCardSkeleton  v-for="product in store.products" :key="product.id" />
        </div>

        <div v-else
          class="grid gap-8 transition-all duration-500"
          :class="{
            'grid-cols-4': cols === 4,
            'grid-cols-3': cols === 3,
            'grid-cols-2': cols === 2,
            'grid-cols-1': cols === 1,
          }"
        >
          <ProductCard  v-for="product in store.products" :key="product.id" :product="product" />
        </div>

        <div class="flex justify-center mt-10 gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1 || store.loading"
            class="px-4 py-2 border cursor-pointer rounded disabled:opacity-30"
          >
            <Icon icon="ri:arrow-left-s-line" />
          </button>

          <div class="flex gap-1">
            <button 
              v-for="page in displayedPages" 
              :key="page"
              @click="currentPage = page"
              :class="['w-10 h-10 border rounded transition-all duration-200 cursor-pointer', 
                      currentPage === page ? 'bg-dark text-white' : 'hover:bg-gray-100']"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="currentPage++"
            :disabled="currentPage >= totalPages || store.loading"
            class="px-4 py-2 border cursor-pointer rounded disabled:opacity-30"
          >
            <Icon icon="ri:arrow-right-s-line" />
          </button>
        </div>
      </div>
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

onMounted(async () => {

  await store.fetchProducts(currentPage.value, itemsPerPage.value)
});

</script>

<style lang="">
</style>
