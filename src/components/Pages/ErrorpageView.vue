<template>
    <div class="relative flex w-screen h-screen">
        <img src="@/assets/404.webp" class="inset-0 w-full" alt="">
        <div class="absolute top-50 left-15 flex flex-col items-center gap-8">
            <h1 class="text-center text-7xl text-dark">Ooops! <br> Page not found!</h1>
            <span class="flex gap-3 text-text text-sm tracking-widest font-medium"> PLEASE GO BACK TO
                <router-link class="font-light text-dark hover:text-red-700 pb-0.5 border-b border-b-dark" :to="{name:'dashboard'}">HOME PAGE</router-link>
            </span>
        </div>
    </div>
</template>
<script>

</script>
<style lang="">
    
</style>