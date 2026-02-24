<template>
  <div class="w-full bg-white p-2 md:p-4">
    <Disclosure v-slot="{ open }" defaultOpen>
      <DisclosureButton class="flex w-full justify-between items-center py-4 text-dark group">
        <span class="text-xl md:text-2xl uppercase tracking-wide">Custom Menu</span>
        <Icon
          icon="ri:arrow-down-s-line"
          width="24"
          class="transition-transform duration-300"
          :class="open ? 'rotate-180' : ''"
        />
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0 max-h-0"
        enter-to-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-to-class="transform scale-95 opacity-0 max-h-0"
      >
        <DisclosurePanel class="pt-2 pl-2">
          <MenuItem v-for="(item, index) in menuTree" :key="index" :item="item" />
        </DisclosurePanel>
      </transition>
    </Disclosure>

    <Disclosure v-slot="{ open }" defaultOpen>
      <DisclosureButton class="flex w-full justify-between items-center py-4 text-dark">
        <span class="text-xl md:text-2xl uppercase tracking-wide">Availability</span>
        <Icon
          icon="ri:arrow-down-s-line"
          width="24"
          class="transition-transform duration-300"
          :class="open ? 'rotate-180' : ''"
        />
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0 max-h-0"
        enter-to-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-to-class="transform scale-95 opacity-0 max-h-0"
      >
        <DisclosurePanel class="pt-2 pl-2">
          <div class="space-y-3"> <label v-for="(avail, index) in availabilityBox" :key="index" 
            class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-dark focus:ring-dark">
            <span class="text-text group-hover:text-dark transition-colors">{{ avail.name }} ({{avail.stock}})</span>
          </label>
        </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>

    <Disclosure>
      <DisclosureButton class="flex w-full justify-between items-center py-4 text-dark">
        <span class="text-xl md:text-2xl uppercase tracking-wide">Colors</span>
        <Icon
          icon="ri:arrow-down-s-line"
          width="24"
          class="transition-transform duration-300"
          :class="open ? 'rotate-180' : ''"
        />
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0 max-h-0"
        enter-to-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-to-class="transform scale-95 opacity-0 max-h-0"
      >
        <DisclosurePanel class="pt-2 pl-2">
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            <label
              v-for="(col, index) in colors"
              :key="index"
              class="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                class="w-5 h-5 rounded border-gray-300 text-dark focus:ring-dark"
              />
              <span class="text-text group-hover:text-dark capitalize transition-colors">{{
                col.name
              }}</span>
            </label>
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>

    <Disclosure>
      <DisclosureButton class="flex w-full justify-between items-center py-4 text-dark">
        <span class="text-xl md:text-2xl uppercase tracking-wide">Size</span>
        <Icon
          icon="ri:arrow-down-s-line"
          width="24"
          class="transition-transform duration-300"
          :class="open ? 'rotate-180' : ''"
        />
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0 max-h-0"
        enter-to-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-to-class="transform scale-95 opacity-0 max-h-0"
      >
        <DisclosurePanel class="pt-2 pl-2">
          <div class="flex flex-wrap lg:flex-col gap-3">
            <label
              v-for="(size, index) in sizes"
              :key="index"
              class="flex items-center gap-3 cursor-pointer min-w-20"
            >
              <input
                type="checkbox"
                name=""
                id=""
                class="w-5 h-5 rounded border-gray-300 text-dark focus:ring-dark"
              />
              <span class="text-text uppercase">{{ size.name }} </span>
            </label>
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>

    <Disclosure>
      <DisclosureButton class="flex w-full justify-between items-center py-4 text-dark">
        <span class="text-xl md:text-2xl uppercase tracking-wide">Material</span>
        <Icon
          icon="ri:arrow-down-s-line"
          width="24"
          class="transition-transform duration-300"
          :class="open ? 'rotate-180' : ''"
        />
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0 max-h-0"
        enter-to-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100 max-h-[1000px]"
        leave-to-class="transform scale-95 opacity-0 max-h-0"
      >
        <DisclosurePanel class="pt-2 pl-2">
          <div class="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <label
              v-for="(mat, index) in materials"
              :key="index"
              class="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                name=""
                id=""
                class="w-5 h-5 rounded border-gray-300 text-dark focus:ring-dark"
              />
              <span class="text-text capitalize">{{ mat.name }} </span>
            </label>
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { onMounted } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useProductStore } from '@/stores/productStore'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

// --- 1. DATA STRUCTURE ---
// Defined variables for reuse to keep the main tree clean

const store = useProductStore()

const availabilityBox = computed(() => [
  { name: 'In stock', stock: store.getInStock?.length || 0 },
  { name: 'Out of stock', stock: store.getOutOfStock?.length || 0 },
])

const colors = [
  { name: 'black' },
  { name: 'blue' },
  { name: 'dark wood' },
  { name: 'dark red' },
  { name: 'dold' },
  { name: 'gray' },
  { name: 'green' },
  { name: 'grey' },
  { name: 'honeydew' },
  { name: 'ivory' },
  { name: 'light wood' },
  { name: 'magenta' },
  { name: 'navy' },
  { name: 'orange' },
  { name: 'pink' },
  { name: 'purple' },
  { name: 'red' },
  { name: 'violet' },
  { name: 'white' },
  { name: 'yellow' },
]

const sizes = [{ name: 's' }, { name: 'm' }, { name: 'l' }, { name: 'xl' }, { name: 'xxl' }]

const materials = [
  { name: 'fiber' },
  { name: 'leather' },
  { name: 'metal' },
  { name: 'resin' },
  { name: 'slag' },
]

const blogSubItems = [
  { label: 'Left Sidebar' },
  { label: 'Right Sidebar' },
  { label: 'Full Width' },
]

const menuTree = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#' },
  {
    label: 'Catalog Sale',
    children: [
      {
        label: 'Popular',
        children: [
          { label: 'Casual' },
          { label: 'Exclusive' },
          { label: 'Aligory' },
          { label: 'Churidar' },
          { label: 'Shalwar' },
          { label: 'Jeans' },
          { label: 'Dress' },
        ],
      },
      {
        label: 'Best Selling',
        children: [
          { label: 'Sanders' },
          { label: 'Bast Shoes' },
          { label: 'Blucher shoe' },
          { label: 'Boatshoe' },
          { label: 'Brogan' },
          { label: 'Chelsea boot' },
          { label: 'Brothel creeper' },
        ],
      },
      {
        label: 'New Product',
        children: [
          { label: 'Belt' },
          { label: 'Wallets' },
          { label: 'Card Holders' },
          { label: 'Bags' },
          { label: 'Executive bags' },
          { label: 'Cufflinks' },
          { label: 'Caps' },
        ],
      },
    ],
  },
  {
    label: 'Blog',
    children: [
      { label: 'Standard Layout', children: blogSubItems },
      { label: 'Grid Layout', children: blogSubItems },
      { label: 'List Layout', children: blogSubItems },
      { label: 'Masonry Layout', children: blogSubItems },
      { label: 'Single Post Layout', children: blogSubItems },
    ],
  },
  {
    label: 'Pages',
    children: [
      { label: 'Brand New' },
      { label: 'About Us' },
      { label: 'About Us 2' },
      { label: 'Contact Us' },
      { label: 'Faq' },
      { label: 'Team' },
      { label: 'Icon Box' },
      { label: 'Mailchimp' },
      { label: 'Typography' },
      { label: '404' },
    ],
  },
]

// --- 2. RECURSIVE COMPONENT ---
// // This component calls itself if "children" exist.
const MenuItem = defineComponent({
  props: ['item'],
  setup(props) {
    // If it has children, render Accordion. If not, render simple Link.
    return () => {
      const { label, children, href } = props.item
      // CASE A: LEAF NODE (No children, just a link)
      if (!children || children.length === 0) {
        return h(
          'a',
          {
            href: href || '#',
            class: 'block py-2 text-gray-500 hover:text-black transition-colors',
          },
          label,
        )
      }
      // CASE B: PARENT NODE (Has children, render Disclosure)
      return h(
        Disclosure,
        {},
        {
          default: ({ open }) => [
            h(
              DisclosureButton,
              {
                class:
                  'flex w-full justify-between items-center py-2 hover:text-dark group text-text',
              },
              () => [
                h('span', label),
                // PLUS / MINUS ICON LOGIC
                h(Icon, {
                  icon: open ? 'ri:subtract-line' : 'ri:add-line',
                  width: 18,
                  class: 'text-dark hover:text-text transition-transform duration-200',
                }),
              ],
            ),
            h(
              'div', // Wrapper for transition
              { class: 'overflow-hidden transition-all duration-300 ease-in-out' },
              [
                h(DisclosurePanel, { class: 'pl-4 ml-1' }, () =>
                  children.map((child, idx) => h(MenuItem, { key: idx, item: child })),
                ),
              ],
            ),
          ],
        },
      )
    }
  },
})

onMounted(async () => {
  // Only fetch if we don't have products yet to avoid duplicate calls
  if (store.products.length === 0) {
    await store.fetchProducts()
  }
})
</script>
