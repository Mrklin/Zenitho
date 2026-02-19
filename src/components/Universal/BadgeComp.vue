<script setup>
defineProps({
  label: {
    type: String,
    default: 'Sale'
  },
  color: {
    type: String,
    default: 'bg-red-600'
  },
tailColor: {
    type: String,
    default: 'before:border-t-red-600'
  }
})
</script>

<template>
  <span :class="[color, tailColor]" 
        class="relative text-white text-[10px] font-bold uppercase px-2 py-0.5 inline-block
               before:content-[''] before:absolute before:top-full before:left-0 
               before:border-t-[6px] before:border-r-[6px] before:border-r-transparent">
    {{ label }}
  </span>
</template>