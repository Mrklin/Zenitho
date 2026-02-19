<!-- <template>
    <div>
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        <section class="bg-sec p-8 w-full">
            <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
                <span>Home  /  <span class="text-text">Account</span> </span>
            </div>
        </section>

        <section class="w-full flex justify-center items-center mt-20">
            <form @submit="handleLogin"
            class="bg-sec p-10 w-130 flex flex-col gap-6 [&_p]:text-text"
            action="">
                <span class="w-full flex justify-center flex-col items-center gap-2">
                    <h2 class="text-3xl font-normal">Reset Your Password</h2>
                    <p>We will send you an email to reset your password.</p>
                </span>

                <span class="w-full p-3 bg-white">
                    <input type="email" placeholder="Email" v-model="email" class="w-full outline-0">
                </span>
                
                <span class="w-full flex justify-between items-center">
                    <ButtonComp>SUBMIT</ButtonComp>
                    <router-link :to="{name:'login'}"
                     class="cursor-pointer text-sm hover:text-text duration-200 transition-all ease-initial">
                        Cancel
                    </router-link>
                </span>

                <p v-if="error" class="text-red-500 text-sm mt-0">{{ error }}</p>
                
            </form>
        </section>

    </div>
</template> -->

<template>
    <div class="min-h-screen flex flex-col">
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        
        <section class="bg-sec p-4 md:p-8 w-full">
            <div class="max-w-7xl mx-auto flex justify-start items-center px-4 md:px-10 text-sm">
                <router-link :to="{name: 'dashboard'}" class="hover:text-dark transition-colors">Home</router-link> 
                <span class="mx-2">/</span>
                <span class="text-text">Account</span>
            </div>
        </section>

        <section class="w-full flex flex-1 justify-center items-center py-12 md:py-20 px-4">
            <form @submit.prevent="handleReset"
                class="bg-sec p-6 md:p-10 w-full max-w-125 flex flex-col gap-6 rounded-lg shadow-sm">
                
                <div class="w-full flex flex-col items-center text-center gap-2">
                    <h2 class="text-2xl md:text-3xl font-normal text-dark">Reset Your Password</h2>
                    <p class="text-text text-sm md:text-base">We will send you an email to reset your password.</p>
                </div>

                <div class="w-full flex flex-col gap-1">
                    <label class="text-sm font-medium mb-1">Email Address</label>
                    <div class="w-full p-3 bg-white border border-transparent focus-within:border-gray-300 rounded transition-all">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            v-model="email" 
                            required
                            class="w-full outline-none bg-transparent"
                        >
                    </div>
                    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
                </div>
                
                <div class="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                    <ButtonComp 
                        type="submit" 
                        class="w-full sm:w-auto px-10 py-3"
                        :disabled="loading"
                    >
                        {{ loading ? 'SENDING...' : 'SUBMIT' }}
                    </ButtonComp>
                    
                    <router-link :to="{name:'login'}"
                        class="cursor-pointer text-sm text-text hover:text-dark underline-offset-4 hover:underline duration-200 transition-all">
                        Cancel
                    </router-link>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup>
import ButtonComp from '../Universal/ButtonComp.vue';
import toast,{Toaster} from 'vue3-hot-toast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/userStore';

const auth = userStore();
const router = useRouter();

const email = ref('');
const error = ref('');
const loading = ref(false);

const handleReset = async () => {
    if (!email.value) return;
    
    error.value = '';
    loading.value = true;
    
    try {
        await auth.resetPassword(email.value);
        toast.success("Reset link sent to your email!");
        
        // Delay slightly so user sees the success message
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 2000);
    } catch (err) {
        error.value = err.message || "Something went wrong. Please try again.";
        toast.error(error.value);
    } finally {
        loading.value = false;
    }
};
  

</script>
<style lang="">
    
</style>