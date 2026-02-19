<!-- <template>
    <div>
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        <section class="bg-sec p-8 w-full">
            <div class="max-w-350 flex justify-start items-center ml-10 text-sm">
                <span class="cursor-pointer"><router-link :to="{name: 'dashboard'}">Home</router-link> /  
                    <span class="text-text">Create Account</span> </span>
            </div>
        </section>

        <section class="w-full flex justify-center items-center mt-20">

            <Form :validation-schema="schema" @submit="onSubmit"
             v-slot="{ meta, isSubmitting }"
             class="bg-sec p-10 w-130 h-230 flex flex-col gap-3 [&_p]:text-text" >
                <span class="w-full flex justify-center flex-col items-center gap-2">
                    <h2 class="text-3xl font-normal">Create Account</h2>
                    <p>Please register with details below</p>
                </span>

                <span class="w-full p-1.5 h-20 ">
                    <label class="block text-sm mb-0.5">First Name</label>
                    <Field name="firstName" type="text" class=" p-2 bg-white w-full rounded" placeholder="First Name" />
                    <ErrorMessage name="firstName" class="text-red-500 text-xs mt-0.5" />
                </span>
                <span class="w-full p-1.5 h-20">
                    <label class="block text-sm mb-0.5">Last Name</label>
                    <Field name="lastName" type="text" class=" p-2 bg-white w-full rounded" placeholder="Last Name" />
                    <ErrorMessage name="lastName" class="text-red-500 text-xs mt-0.5" />
                </span>
                <span class="w-full p-1.5 h-20">
                    <label class="block text-sm mb-0.5">Email</label>
                    <Field name="email" type="email" class=" p-2 bg-white w-full rounded" placeholder="Email@example.com" />
                    <ErrorMessage name="email" class="text-red-500 text-xs mt-0.5" />
                </span>
                <span class="w-full p-1.5 h-20">
                    <label class="block text-sm mb-0.5">Password</label>
                    <Field name="password" type="password" class="p-2 bg-white w-full rounded" placeholder="Password" />
                    <ErrorMessage name="password" class="text-red-500 text-xs mt-0.5" />
                </span>
                <span class="w-full p-1.5 h-20">
                    <label class="block text-sm mb-0.5">Confirm Password</label>
                    <Field name="confirmPassword" type="password" class="p-2 bg-white w-full rounded" placeholder="Confirm Password" />
                    <ErrorMessage name="confirmPassword" class="text-red-500 text-xs mt-0.5" />
                </span>
                <span class="w-full flex justify-between items-center mt-0.5">
                    <ButtonComp type="submit"
                    :disabled="!meta.valid || isSubmitting"
                    >
                    <span v-if="isSubmitting">Creating...</span>
                    <span v-else>Create</span>
                </ButtonComp>
                </span>
                <span>
                    <router-link :to="{name:'login'}"
                     class="cursor-pointer text-sm hover:text-text duration-200 transition-all ease-initial">
                     Already Have an Account? Log In
                    </router-link>
                </span>
                
            </Form>
        </section>
        
    </div>
</template> -->

<template>
    <div class="min-h-screen flex flex-col">
        <div><Toaster position="top-center" :reverseOrder="false"/></div>
        
        <section class="bg-sec p-4 md:p-8 w-full">
            <div class="max-w-7xl mx-auto flex justify-start items-center px-4 md:px-10 text-sm">
                <span class="cursor-pointer">
                    <router-link :to="{name: 'dashboard'}" class="hover:text-dark transition-colors">Home</router-link> 
                    <span class="mx-2">/</span>
                    <span class="text-text">Create Account</span> 
                </span>
            </div>
        </section>

        <section class="w-full flex flex-1 justify-center items-center py-10 md:py-20 px-4">
            <Form 
                :validation-schema="schema" 
                @submit="onSubmit"
                v-slot="{ meta, isSubmitting }"
                class="bg-sec p-6 md:p-10 w-full max-w-125 flex flex-col gap-4 rounded-lg shadow-sm"
            >
                <div class="w-full flex justify-center flex-col items-center gap-2 mb-4">
                    <h2 class="text-2xl md:text-3xl font-normal text-dark">Create Account</h2>
                    <p class="text-text text-sm md:text-base">Please register with details below</p>
                </div>

                <div class="w-full flex flex-col gap-1 min-h-21.25">
                    <label class="block text-sm font-medium">First Name</label>
                    <Field name="firstName" type="text" class="p-3 bg-white w-full rounded border border-transparent focus:border-gray-300 outline-none transition-all" placeholder="First Name" />
                    <ErrorMessage name="firstName" class="text-red-500 text-xs" />
                </div>

                <div class="w-full flex flex-col gap-1 min-h-21.25">
                    <label class="block text-sm font-medium">Last Name</label>
                    <Field name="lastName" type="text" class="p-3 bg-white w-full rounded border border-transparent focus:border-gray-300 outline-none transition-all" placeholder="Last Name" />
                    <ErrorMessage name="lastName" class="text-red-500 text-xs" />
                </div>

                <div class="w-full flex flex-col gap-1 min-h-21.25">
                    <label class="block text-sm font-medium">Email</label>
                    <Field name="email" type="email" class="p-3 bg-white w-full rounded border border-transparent focus:border-gray-300 outline-none transition-all" placeholder="Email@example.com" />
                    <ErrorMessage name="email" class="text-red-500 text-xs" />
                </div>

                <div class="w-full flex flex-col gap-1 min-h-21.25">
                    <label class="block text-sm font-medium">Password</label>
                    <Field name="password" type="password" class="p-3 bg-white w-full rounded border border-transparent focus:border-gray-300 outline-none transition-all" placeholder="Password" />
                    <ErrorMessage name="password" class="text-red-500 text-xs" />
                </div>

                <div class="w-full flex flex-col gap-1 min-h-21.25">
                    <label class="block text-sm font-medium">Confirm Password</label>
                    <Field name="confirmPassword" type="password" class="p-3 bg-white w-full rounded border border-transparent focus:border-gray-300 outline-none transition-all" placeholder="Confirm Password" />
                    <ErrorMessage name="confirmPassword" class="text-red-500 text-xs" />
                </div>

                <div class="w-full mt-4">
                    <ButtonComp 
                        type="submit"
                        class="w-full py-4 uppercase tracking-widest text-sm"
                        :disabled="!meta.valid || isSubmitting"
                    >
                        <span v-if="isSubmitting">Creating...</span>
                        <span v-else>Create Account</span>
                    </ButtonComp>
                </div>

                <div class="text-center mt-4">
                    <router-link :to="{name:'login'}"
                        class="cursor-pointer text-sm text-text hover:text-dark underline-offset-4 hover:underline duration-200 transition-all">
                        Already Have an Account? Log In
                    </router-link>
                </div>
            </Form>
        </section>
    </div>
</template>


<script setup>
import ButtonComp from '../Universal/ButtonComp.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { userStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import toast,{Toaster} from 'vue3-hot-toast';


    const userAuth = userStore();

    const router = useRouter();

    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Must contain at least one number')
            .matches(/[@$!%*#?&]/, 'Must contain at least one special character (@$!%*#?&)')
            .required('Password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const onSubmit = async (values, {resetForm}) => {

        try {
            const newUser = {
                name: `${values.firstName} ${values.lastName}`.trim(),
                email: values.email,
                password: values.password,
            }; 
            await new Promise(resolve => setTimeout(resolve, 800));

            await userAuth.signupUser(newUser);

            resetForm();

            router.push({ name: 'login' });

        } catch (error) {
            toast.error(error.message);
            console.error("There was a problem signing up", error);
            
        }  
    };

</script>
<style lang="">
    
</style>