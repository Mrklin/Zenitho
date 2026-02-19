<template>
    <div>

        <button :disabled="props.disabled"
            :class="[props.disabled ? 'opacity-50 cursor-not-allowed':'cursor-pointer',
             'text-white text-sm p-2 transition-colors ease-linear duration-200 hover:text-dark',
              props.label]">
            <slot></slot>
        </button>
        
    </div>
</template>
<script setup>

    const props = defineProps({ 
        label:{
            type:String,
            default: 'bg-dark px-7 hover:bg-white',
        },
        disabled: {
            type: Boolean,
            default: false
        }
    });



</script>
<style lang="">
    
</style>