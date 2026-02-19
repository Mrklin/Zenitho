<template>
    <div>
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        <section class="bg-sec p-8 w-full">
            <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
                <span class="cursor-pointer"><router-link :to="{name: 'dashboard'}">Home</router-link> /  <span class="text-text">Account</span> </span>
            </div>
        </section> 

        <section class="w-full flex justify-center items-center mt-20">
            <form @submit.prevent="handleLogin"
            class="bg-sec p-10 w-130 flex flex-col gap-6 [&_p]:text-text"
            action="">
                <span class="w-full flex justify-center flex-col items-center gap-2">
                    <h2 class="text-3xl font-normal">Login</h2>
                    <p>Please login with details below</p>
                </span>

                <span class="w-full p-3 bg-white">
                    <input type="email" placeholder="Email" v-model="email" class="w-full outline-0">
                </span>
                <span class="w-full p-3 bg-white flex justify-between items-center">
                    <input :type="passwordType" placeholder="Password" v-model="password" class="w-full outline-0">
                    <Icon 
                        :icon="passwordType==='password' ? 'mdi:eye-off' : 'mdi:eye'" 
                        @click="passType"
                        class="cursor-pointer"
                        width="20" 
                        />
                </span>
                <p class="text-red-500 text-sm mt-0">{{ error }}</p>
                <span class="w-full md:flex-row flex-col gap-2 flex justify-between items-center">
                    <ButtonComp type="submit"
                    :disabled="!email || !password">
                        SIGN IN
                    </ButtonComp>

                    <router-link :to="{name:'reset'}" 
                     class="cursor-pointer text-sm hover:text-text duration-200 transition-all ease-initial">
                        Forgot your Password ?
                    </router-link>
                    
                </span>
                <span>
                    <router-link :to="{name:'signup'}"
                     class="cursor-pointer text-sm hover:text-text duration-200 transition-all ease-initial">
                        Create Account
                    </router-link>
                    
                </span>
                
            </form>
        </section>
        

    </div>
</template>
<script setup>
    import ButtonComp from '../Universal/ButtonComp.vue';
    import {Toaster} from 'vue3-hot-toast';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue'; 
    import { userStore } from '@/stores/userStore';

    const Login = userStore();

    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const error = ref('');
    const passwordType = ref("password");


    const handleLogin = async () => {
        error.value = '';

        try {
            await Login.loginUser({
                email: email.value,
                password: password.value
            });

            router.push({name:'dashboard'})
            
        } catch (err) {
            error.value = err.message
        }

    };

    const passType = () => {
        passwordType.value = passwordType.value === "password" ? "text" : "password";
    };

</script>
<style >
    
</style>