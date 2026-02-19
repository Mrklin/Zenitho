

// const DEFAULT_CREDENTIALS = {
//     name:'Frank',
//     email:'frank@gmail.com',
//     password:'SecureP@ss123'
// };

// function InitializeLocalUser(){
//     if(!localStorage.getItem('localUsers')){
//         localStorage.setItem('localUsers', JSON.stringify([DEFAULT_CREDENTIALS]))
//     }
// }

// InitializeLocalUser();

import toast from "vue3-hot-toast";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/components/utils/api";
import { useCartStore } from "./cartStore";
import { useWishlistStore } from "./wishlistStore";

export const userStore = defineStore("user", () => {

    const user = ref(null);
    const token = ref(null);
    const isLoggedIn = ref(false);

    // const setToken = (authToken) => {
    //     token.value = authToken;
    //     localStorage.setItem('token', authToken);
    // }

    const userName = computed(() => user.value ? user.value?.name : 'Guest');

    const setUser = (data, authToken) => {
        user.value = data;
        token.value = authToken;
        isLoggedIn.value = true;
    };

    const clearUser = () => {
        user.value = null;
        isLoggedIn.value = false;
    };

    // const signupUser = (credentials) => {
    //     const storedUser = localStorage.getItem('localUsers');
    //     const users = storedUser ? JSON.parse(storedUser) : [];

    //     const emailExist = users.some(user => user.email === credentials.email);

    //     if (emailExist) {
    //         throw new Error('This email is already registered.');
    //     }

    //     users.push(credentials);
    //     localStorage.setItem('localUsers', JSON.stringify(users));
    // };


    const signupUser = async (credentials) => {
        try {
            const response = await api.post("/register", credentials);
            toast.success("Account created! Please login.");
            return response.data;
        } catch (error) {
            const msg = error.response?.data?.message || "Signup failed";
            toast.error(msg);
            throw error;
        }
    };


    // const loginUser = (credentials) => {
    //     const storedUser = localStorage.getItem('localUsers');
    //     const users = storedUser ? JSON.parse(storedUser) : [];
    //     const foundUser = users.find(user => user.email === credentials.email && user.password === credentials.password);

    //     if (!foundUser) {
    //         throw new Error('Invalid email or password');
    //     }
    //     setUser(foundUser);
    //     toast.success("Login successful!", {duration: 2000});
    // };

    const loginUser = async (credentials) => {

        try{
            const response = await api.post("/login", credentials);
            // JUST update the state. No localStorage.setItem needed!
            user.value = response.data.user;
            token.value = response.data.token;

            // console.log(user.value);
            // console.log(token.value);
            
            isLoggedIn.value = true;

            const cart = useCartStore();
            await cart.syncCart();

            const wishlist = useWishlistStore();
            await wishlist.fetchWishlist();

            toast.success("Login successful!", {duration: 2000});
            return response.data;
            
        }catch(error){
            const msg = error.response?.data?.message || "Login failed";
            toast.error(msg);
            throw error;
        }
    
  };


//   const updateApiCart = async () => {
    
//         const cartStore = useCartStore();
//         const {items} = cartStore;
//         if(items.lenght){
//             for(let i = 0; i < items.length; i++){
//                 await cartStore.addToCart({product_id: items[i].id, quantity:1})
//             }
//         }
//   }

    const resetPassword = (email) => {
        const storedUser = localStorage.getItem('localUsers');
        const users = storedUser ? JSON.parse(storedUser) : [];
        const foundUser = users.find(user => user.email === email);

        if (!foundUser) {
            toast.error("Email not found!", {duration: 2000});
            throw new Error('Email not found');
        }
        // In a real app, send reset email here
        toast.success("Password reset link sent to your email!", {duration: 2000});
    };

    // const logoutUser = () => {
    //     clearUser();
    //     toast.error("Logged out successfully!", {duration: 2000});
    // };

    const logoutUser = async () => {

    try {
        await api.post(`/logout`);
        
    } catch(error){
        const msg = error.response?.data?.message || "Logout Failed";
        toast.error(msg);
        throw error;
    }finally {
        token.value = null
        clearUser();

        const wishlist = useWishlistStore();
            wishlist.clearWishlist();

            // 3. CLEAR THE CART (Highly recommended for privacy)
            const cart = useCartStore();
            if (cart.clearCart) {
                cart.clearCart(); 
            }

        toast.success("Logout successful!", {duration: 2000});
    }


  };

    return { user, resetPassword, token, isLoggedIn, signupUser, loginUser, logoutUser, userName, setUser, clearUser };


},{
     persist: { 
    paths: ['user', 'token', 'isLoggedIn'], // Only persist these two
  }
});






// auth store:
 
// import { defineStore } from "pinia";
// import api from "@/helpers/axios";
// import { ref, computed } from "vue";
// export const useAuthStore = defineStore("auth", () => {
//   const token = ref(localStorage.getItem("authToken") || null);
//   const user = ref(JSON.parse(localStorage.getItem("user")) || null);
//   const setToken = (authToken) => {
//     token.value = authToken;
//     localStorage.setItem("authToken", authToken);
//   };
//   const clearToken = () => {
//     token.value = null;
//     localStorage.removeItem("authToken");
//   };
//   const setUser = (userData) => {
//     user.value = userData;
//     localStorage.setItem("user", JSON.stringify(userData));
//   };
//   const clearUser = () => {
//     user.value = null;
//     localStorage.removeItem("user");
//   };
//   const isAuthenticated = computed(() => token.value !== null);
 
//   const login = async (email, password) => {
//     try {
//         const response = await api.post("/login", { email, password });
 
//         setToken(response.data.data.token);
//         setUser(response.data.data.user);
//     } catch (error) {
//       console.error(error);
//     }
//   };
 
//   const logout = () => {
//     clearToken();
//     clearUser();
//   };
 
//   const getUser = computed(() => user.value);
 
//   return { token, setToken, isAuthenticated, getUser, login, logout };
// });
 
 
// axios helper:
 
// import axios from 'axios'
// import { useAuthStore } from '@/stores/auth'
 
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//     },
// })
 
 
// // api.interceptors.request.use(config => {
// //     const authStore = useAuthStore()
// //     if (authStore.token) {
// //         config.headers.Authorization = `Bearer ${authStore.token}`
// //     }
// //     return config
// // })
 
//https://e-commerce-api-ixoyjgks.on-forge.com/api

// export default api;
 