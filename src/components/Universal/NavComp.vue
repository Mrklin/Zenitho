<template>
  <nav
    class="top-0 px-4 md:px-8 py-3 flex justify-between items-center w-full sticky bg-white z-50 shadow-md"
  >

    <div class="lg:hidden flex items-center">
      <Icon icon="ri:menu-line" width="28" @click="isMobileMenuOpen = true" class="cursor-pointer" />
    </div>

    <div class="text-2xl md:text-3xl cursor-pointer" @click="router.push('/')">Zenitho</div>

    <ul class="hidden lg:flex items-center gap-8 text-base">
      <li
        v-for="item in navLinks"
        :key="item.name"
        class="relative group py-2"
        @mouseenter="activeMenu = item.name"
        @mouseleave="activeMenu = null"
      >
        <div
          class="relative flex justify-center items-center cursor-pointer text-text hover:text-dark transition-all"
        >
          <router-link
            v-if="item.route"
            :to="item.route"
            class="h-10 flex items-end hover:underline"
            >{{ item.name }}</router-link
          >
          <span v-else class="flex flex-col justify-end h-10">
            <BadgeComp
              v-if="item.badge"
              color="bg-[#98d8ca]"
              tailColor="before:border-t-[#98d8ca]"
              :label="item.badge"
              class="w-10 no-underline"
            />
            <span class="flex items-center hover:underline">
              {{ item.name }}
              <Icon
                v-if="item.children || item.columns || item.col"
                icon="ri:arrow-down-s-line"
                class="ml-1"
            /></span>
          </span>

          <Transition name="fade-slide">
            <div
              v-if="activeMenu === item.name && item.columns"
              class="absolute top-full mt-3 bg-white shadow-xl flex p-6 gap-10 z-50"
            >
              <div
                v-for="col in item.columns"
                :key="col.title"
                class="min-w-37.5 border-r last:border-r-0"
              >
                <h3 class="mb-2.5 text-dark pb-2 cursor-auto">{{ col.title }}</h3>
                <ul class="flex flex-col gap-2">
                  <li v-for="link in col.links" :key="link.label" class="flex flex-col">
                    <BadgeComp
                      v-if="link.badge"
                      :color="link.badge === 'Sale' ? 'bg-[#98d8ca]' : 'bg-red-600'"
                      class="no-underline w-10"
                      :tailColor="
                        link.badge === 'Sale'
                          ? 'before:border-t-[#98d8ca]'
                          : 'before:border-t-red-600'
                      "
                      :label="link.badge"
                    />
                    <router-link
                      :to="link.to"
                      class="hover:underline text-text hover:text-dark justify-end items-start h-10 gap-2"
                    >
                      {{ link.label }}
                    </router-link>
                  </li>
                </ul>
              </div>

              <div v-if="item.name === 'Category'" class="w-65 pl-2">
                <Carousel v-bind="carouselConfig">
                  <Slide v-for="(imgs, index) in carouselImgs" :key="index">
                    <div class="carousel__item w-full flex flex-col group/car">
                      <div class="relative overflow-hidden mb-3">
                        <img
                          :src="imgs.img"
                          alt="Carousel Image"
                          class="object-cover w-full h-64 transition-transform duration-500 group-hover/car:scale-105"
                        />
                      </div>
                      <span class="w-full text-left flex flex-col gap-3">
                        <p class="text-2xl">{{ imgs.name }}</p>
                        <span class="flex gap-3">
                          <p class="text-dark">{{ imgs.new }}</p>
                          <p class="text-text line-through">{{ imgs.old }}</p>
                        </span>
                      </span>
                    </div>
                  </Slide>

                  <template #addons>
                    <Navigation />
                    <!-- <Pagination />  -->
                  </template>
                </Carousel>
              </div>
            </div>
          </Transition>

          <Transition name="fade-slide">
            <ul
              v-if="activeMenu === item.name && item.children"
              class="absolute top-full left-0 mt-2 bg-white shadow-xl w-48 z-50"
            >
              <li
                v-for="child in item.children"
                :key="child.name"
                class="relative group/sub px-4 py-3 hover:bg-gray-50"
              >
                <div
                  class="flex justify-between items-center cursor-pointer text-text hover:text-dark"
                >
                  <span>{{ child.name }}</span>
                  <Icon v-if="child.subChildren" icon="ri:arrow-right-s-line" />
                </div>

                <ul
                  v-if="child.subChildren"
                  class="absolute right-full top-0 ml-0.5 bg-white shadow-xl w-48 hidden group-hover/sub:block"
                >
                  <li
                    v-for="sub in child.subChildren"
                    :key="sub"
                    class="px-4 py-3 text-text hover:text-dark hover:bg-gray-50"
                  >
                    <router-link to="/">{{ sub }}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </Transition>

          <Transition name="fade-slide">
            <ul
              v-if="activeMenu === item.name && item.col"
              class="absolute top-full left-0 mt-2 bg-white shadow-xl p-4 w-48 z-50"
            >
              <li
                v-for="link in item.col"
                :key="link.name"
                class="py-2 px-3 flex flex-col text-text hover:text-dark"
              >
                <BadgeComp v-if="link.badge" class="w-10" :label="link.badge" />
                <router-link to="" class="hover:text-dark hover:underline">{{
                  link.name
                }}</router-link>
              </li>
            </ul>
          </Transition>
        </div>
      </li>
    </ul>

    <div class="flex items-center gap-3 md:gap-10">
      <Icon @click="searchPanel" icon="ri:search-line" width="22" class="cursor-pointer hover:text-gray-500" />

      <div @mouseenter="showMenu = true" 
             
      class="relative cursor-pointer group">
        <router-link :to="{ name: 'login' }">
          <Icon icon="ri:user-line" width="22" class="cursor-pointer hover:text-gray-500" />
        </router-link>
        <div 
         @mouseenter="showMenu = true"
         @mouseleave="showMenu = false"
          v-if="user.isLoggedIn"
          :class="[
            showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none', 
            'absolute left-0 top-full mt-2 w-40 bg-white shadow-xl border border-gray-100 rounded-md py-2 z-50 transition-all duration-600'
          ]"
        >
            <div class="px-4 py-2 border-b border-gray-50 mb-1">
              <p class="text-[10px] text-gray-400 uppercase font-bold">Account</p>
              <p class="text-xs text-dark truncate">{{ user.userName }}</p>
          </div>
          <button 
            @click="handleLogOut" 
            class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <Icon icon="ri:logout-box-r-line" width="18" />
            Logout
        </button>
        </div>
      </div>

      <div class="relative cursor-pointer group">
        <router-link :to="{ name: 'wishlist' }">
          <Icon icon="ri:heart-line" width="22" class="cursor-pointer hover:text-gray-500" />
        </router-link>
        <span
          v-if="wishlist.count > 0"
          class="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center"
        >
          {{ wishlist.count }}
        </span>
      </div>

      <div @click="triggerOpenCart" class="relative cursor-pointer group">
        <Icon icon="ri:shopping-cart-2-line" width="22" class="group-hover:text-gray-500" />
        <span
          class="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center"
        >
          {{ cart.count }}
        </span>
      </div>
    </div>
  </nav>

  <Transition name="slide">
    <div v-if="openCart" ref="cartRef" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50">
        <div class="w-full flex p-4 mt-2 justify-between items-center h-6 relative">
         <h2 class="text-2xl font-normal">Cart</h2>
        <Icon
            icon="ri:close-line"
            width="30"
            @click="openCart = false"
            class="absolute cursor-pointer hover:rotate-180 duration-300 ease-out right-0"
        />
        </div>

        <div v-if="cart.count === 0" class="w-full text-4xl text-center mt-5 p-4">No items in cart</div>
        <div v-else class="w-full max-h-screen overflow-auto flex flex-col px-4 pb-10 py-2 gap-2">
            <div v-for="product in cart.cartItems" :key="product.id">
          <div class="w-full flex flex-col gap-2 border-t border-t-black/10" >
            <div class="flex gap-2 justify-between items-start my-2">
              <div class="w-10">
                <img :src="product.image" alt="" />
              </div>
            <div class="flex flex-col gap-2 text-text">
            <span>{{ product.name }}</span>
            <span class="text-xs"> x{{ product.quantity }} <span class="font-semibold">${{ product?.price }}</span> </span>
            </div>
            <div @click="cart.removeFromCart(product)" class="relative">
            <Icon
                icon="ri:close-line"
                width="16"
                class="absolute cursor-pointer right-0"
            />
            </div>
            </div>
        </div>
        
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex gap-2 border-y text-dark border-y-bg-black/10 py-2 px-1.5">
                <span>Total :</span>
                <span>${{ Number(cart.cartTotal).toFixed(2) }}</span>
            </div>
            <span class="flex items-center w-full justify-between">
            <input v-model="isAgree" type="checkbox" />
            <label class="text-text text-sm ml-2">I agree to the terms & conditions</label>
            </span>
            <button
            :disabled="!isAgree"
            class="bg-dark text-white py-3 rounded hover:bg-gray-800 transition-colors mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
            PROCEED TO CHECKOUT
            </button>
            <router-link
            :to="{ name: 'cart' }"
            class="w-full mb-3 cursor-pointer text-center border border-text-dark px-10 py-3"
            >VIEW CART</router-link
            >
        </div>
        </div>
        
        
    </div>
  </Transition>

<Transition name="slide">
  <div class="fixed inset-0 w-full h-full bg-white z-50 flex flex-col justify-center items-center" v-if="openSearch">
    <div class=" fixed top-0 w-full bg-white right-0 h-20">

      <Icon icon="ri:close-line" class="absolute cursor-pointer hover:rotate-180 duration-300 
        ease-out right-0" width="50" @click="openSearch = false" />

    </div>

    <span class="text-3xl flex gap-1 border-b text-text font-semibold">
       <input type="text" v-model="localSearch" 
        placeholder="Search..." 
        @keyup.enter="handleSearch"
        class="w-full outline-0 border-none" /> 

       <Icon icon="ri:search-line" class="cursor-pointer" @click="handleSearch" width="40" />
    </span>
    
  </div>
</Transition>

<Transition name="fade">
    <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black/50 z-60 lg:hidden"></div>
  </Transition>

  <Transition name="slide-left">
    <div v-if="isMobileMenuOpen" class="fixed top-0 left-0 w-3/4 max-w-sm h-full bg-white z-70 shadow-2xl lg:hidden overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-8">
          <span class="text-2xl">Zenitho</span>
          <Icon icon="ri:close-line" width="28" @click="isMobileMenuOpen = false" />
        </div>

        <ul class="flex flex-col gap-6">
          <li v-for="item in navLinks" :key="item.name">
            <div @click="toggleMobileSub(item.name)" class="flex justify-between items-center text-lg ">
              <router-link v-if="item.route" :to="item.route" @click="isMobileMenuOpen = false">{{ item.name }}</router-link>
              <span v-else>{{ item.name }}</span>
              <Icon v-if="!item.route" :icon="mobileSubOpen === item.name ? 'ri:subtract-line' : 'ri:add-line'" />
            </div>
            
            <div v-if="mobileSubOpen === item.name && !item.route" class="mt-4 ml-4 flex flex-col gap-3 border-l-2 border-text pl-4">
               <div v-for="sub in (item.columns || item.children || item.col)" :key="sub.name || sub.title">
                  <p class="text-sm text-gray-400 uppercase tracking-widest">{{ sub.title || sub.name }}</p>
                  </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Transition>

</template>

<!-- <template>
  <nav class="top-0 px-4 md:px-8 py-3 flex justify-between items-center w-full sticky bg-white z-50 shadow-md">
    
    <div class="lg:hidden flex items-center">
      <Icon icon="ri:menu-line" width="28" @click="isMobileMenuOpen = true" class="cursor-pointer" />
    </div>

    <div class="text-2xl md:text-3xl font-bold cursor-pointer" @click="router.push('/')">Zenitho</div>

    <ul class="hidden lg:flex items-center gap-8 text-base">
      <li v-for="item in navLinks" :key="item.name" class="relative group py-2"
          @mouseenter="activeMenu = item.name" @mouseleave="activeMenu = null">
          </li>
    </ul>

    <div class="flex items-center gap-4 md:gap-8">
      <Icon @click="searchPanel" icon="ri:search-line" width="22" class="cursor-pointer hover:text-gray-500" />
      <div class="hidden md:block"> </div>
      <div @click="triggerOpenCart" class="relative cursor-pointer group">
        <Icon icon="ri:shopping-cart-2-line" width="22" />
        <span class="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
          {{ cart.count }}
        </span>
      </div>
    </div>
  </nav>

  <Transition name="fade">
    <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black/50 z-[60] lg:hidden"></div>
  </Transition>

  <Transition name="slide-left">
    <div v-if="isMobileMenuOpen" class="fixed top-0 left-0 w-3/4 max-w-sm h-full bg-white z-[70] shadow-2xl lg:hidden overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-8">
          <span class="text-2xl font-bold">Zenitho</span>
          <Icon icon="ri:close-line" width="28" @click="isMobileMenuOpen = false" />
        </div>

        <ul class="flex flex-col gap-6">
          <li v-for="item in navLinks" :key="item.name">
            <div @click="toggleMobileSub(item.name)" class="flex justify-between items-center text-lg font-medium">
              <router-link v-if="item.route" :to="item.route" @click="isMobileMenuOpen = false">{{ item.name }}</router-link>
              <span v-else>{{ item.name }}</span>
              <Icon v-if="!item.route" :icon="mobileSubOpen === item.name ? 'ri:subtract-line' : 'ri:add-line'" />
            </div>
            
            <div v-if="mobileSubOpen === item.name && !item.route" class="mt-4 ml-4 flex flex-col gap-3 border-l-2 border-gray-100 pl-4">
               <div v-for="sub in (item.columns || item.children || item.col)" :key="sub.name || sub.title">
                  <p class="font-bold text-sm text-gray-400 uppercase tracking-widest">{{ sub.title || sub.name }}</p>
                  </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Transition>

</template> -->

<script setup>
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import router from '@/router';
import coco from '@/assets/coco.webp'
import moon from '@/assets/moon.webp'
import BadgeComp from './BadgeComp.vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore';
import { userStore } from '@/stores/userStore';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

// const isMenuOpen = ref(false);
// const isBlog =ref(false)
// let closeTimeout = null;

// const openMenu = () => {
//     if (closeTimeout) clearTimeout(closeTimeout);
//     isMenuOpen.value = true;
//     isBlog.value = false;

// };

// const openBlog = () =>{
//     if(closeTimeout) clearTimeout(closeTimeout);
//     isBlog.value = true;
//     isMenuOpen.value = false;
// }

// const closeMenu = () => {
//     // Wait 500ms before closing so user has time to move mouse
//     closeTimeout = setTimeout(() => {
//         isMenuOpen.value = false;

//     }, 600);
// };

// const closeBlog = () => {
//     closeTimeout = setTimeout(() => {
//         isBlog.value =false
//     }, 600);
// }


//Initialize stores

const productSearch = useProductStore()

const cart = useCartStore()

const user = userStore()

const wishlist = useWishlistStore()


//Initialize refs and variables

const localSearch = ref('')
let debounceTimeout = null;
const isAgree = ref(false)
const openCart = ref(false)
const cartRef = ref(null) // Create a template ref
const openSearch = ref(false)
const activeMenu = ref(null)

const isMobileMenuOpen = ref(false)
const mobileSubOpen = ref(null)

const toggleMobileSub = (name) => {
  mobileSubOpen.value = mobileSubOpen.value === name ? null : name
}

// Close mobile menu when route changes
watch(() => router.currentRoute.value.path, () => {
  isMobileMenuOpen.value = false
})

const showMenu = ref(null)

const handleLogOut = () =>{
  user.logoutUser()
  showMenu.value = false
}

const searchPanel = () => {
  openSearch.value = !openSearch.value
}
// This magic function listens for clicks outside the element
onClickOutside(cartRef, () => {
  if (openCart.value) openCart.value = false
});

const handleSearch = () => {
  openSearch.value = false;
  router.push({name:'store'})
}

const triggerOpenCart = () => {
  openCart.value = true
}


const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  transition: 600,
  snapAlign: 'center',
}

const carouselImgs = [
  { img: coco, name: 'Coco Rose Body', new: 33.95, old: 52.95 },
  { img: moon, name: 'Organic Moon Fruit', new: 47.95, old: 65.95 },
]



const navLinks = [
  { name: 'Home', route: { name: 'dashboard' } },
  { name: 'Shop', route: { name: 'store' } },
  {
    name: 'Category',
    badge: 'New',
    columns: [
      {
        title: 'Popular',
        links: [
          { label: 'Casual', route: '' },
          { label: 'Exclusive', route: '', badge: 'New' },
          { label: 'Aligory', route: '' },
          { label: 'Churidar', route: '' },
          { label: 'Shalwar', route: '' },
          { label: 'Jeans', route: '' },
          { label: 'Dress', route: '' },
        ],
      },
      {
        title: 'Best Selling',
        links: [
          { label: 'Sanders', route: '' },
          { label: 'Bast Shoes', route: '' },
          { label: 'Blucher shoe', route: '', badge: 'New' },
          { label: 'Boatshoe', route: '' },
          { label: 'Brogan', route: '' },
          { label: 'Chelsea boot', route: '' },
          { label: 'Brothel creeper', route: '' },
        ],
      },
      {
        title: 'New Products',
        links: [
          { label: 'Belt', route: '' },
          { label: 'Wallets', route: '' },
          { label: 'Card Holders', route: '' },
          { label: 'Bags', route: '', badge: 'Sale' },
          { label: 'Executive bags', route: '' },
          { label: 'Cufflinks', route: '' },
          { label: 'Caps', route: '' },
        ],
      },
    ],
  },
  {
    name: 'Blog',
    children: [
      {
        name: 'Standard Layout',
        subChildren: ['Left Sidebar', 'Right Sidebar', 'Full Width'],
      },
      { name: 'Another', subChildren: ['Left Sidebar', 'Right Sidebar', 'Full Width'] },
      { name: 'Third One', subChildren: ['Left Sidebar', 'Right Sidebar', 'Full Width'] },
    ],
  },
  {
    name: 'Pages',
    col: [
      { name: 'Brand', badge: 'New', route: '' },
      { name: 'About Us', route: '' },
      { name: 'About Us 2', route: '' },
      { name: 'Contact Us', route: '' },
      { name: 'Faq', route: '' },
      { name: 'Team', route: '' },
      { name: 'Icon Box', route: '' },
      { name: 'Mailchimp', route: '' },
      { name: 'Typography', route: '' },
      { name: '404', route: '' },
    ],
  },
]


//Initialze watches

watch(localSearch, (newValue) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    productSearch.searchQuery = newValue;

    if(newValue && router.currentRoute.value.name !== 'store') {
        router.push({ name: 'store' });
    }
  }, 300); // Adjust the delay as needed
});

watch(() => productSearch.searchQuery,
  (newQuery) => {
    if (newQuery === '') {
      localSearch.value = '';
    }
  });

</script>

<style scoped>
:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin: 0 -10px;
}

:deep(.carousel__pagination) {
  padding: 0;
  margin-top: 10px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Slide from Left for Mobile Menu */
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-left-enter-from, .slide-left-leave-to {
  transform: translateX(-100%);
}

/* Simple fade for the background overlay */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Adjust sticky nav padding for smaller screens */
@media (max-width: 768px) {
  nav {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
