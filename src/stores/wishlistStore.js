import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/components/utils/api'
import toast from 'vue3-hot-toast'
import { userStore } from '@/stores/userStore'
import router from '@/router'

export const useWishlistStore = defineStore('wishlistStore',() => {

    const items = ref([])
    const loading = ref(false)
    const error = ref(null)

    const count = computed(() => items.value.length)

    const isInWishlist = computed(() => {
      return (productId) => {
        // Add Array.isArray check here as a safety net
        if (!Array.isArray(items.value)) return false
        return items.value.some((item) => item.id == productId)
      }
    })


    const clearWishlist = () => {
        items.value = [];
    };

    const fetchWishlist = async () => {
      const user = userStore();

      if(!user.isLoggedIn){
        clearWishlist();
        return;
      } else {

        loading.value = true
        error.value = null
     
        try {
          const response = await api.get('/wishlist')

          const data = response.data.data || response.data // Adjust based on your API response structure

          items.value = Array.isArray(data) ? data : []
        } catch (error) {
          console.error('Error fetching wishlist:', error)
        } finally {
          loading.value = false
        }

      }
      
    }

    const addToWishlist = async (product) => {

      const user = userStore();
      if(!user.isLoggedIn){
          toast('Please login to save items to your wishlist', {
      icon: 'ℹ️',
      duration: 3000,
      });
        return;
      } else{

        try {
        const response = await api.post('/wishlist/add',{ product_id: product.id })

        const newEntry = {
          ...product,
          wishlist_id: response.data.data.id,
        }

        items.value.push(newEntry)
        toast.success('Item added to wishlist', { duration: 2000 })
      } catch (error) {
        console.error('Full Error Object:', error.response) // Debug here
        if (error.response?.status === 422) {
          toast.error('Product already in wishlist or invalid ID')
        } else {
          toast.error('Failed to add item to wishlist')
        }
      }

      }
      
    }


    const removeFromWishlist = async (productId) => {
      try {
        await api.delete(`/wishlist/${productId}`)

        items.value = items.value.filter((item) => item.id !== productId)

        toast.success('Item removed from wishlist', { duration: 2000 })
      } catch (error) {
        toast.error('Failed to remove item from wishlist', { duration: 2000 })
        console.error('Error removing from wishlist:', error)
      }
    }


    const toggleWishlist = async (product) => {
      
      if (isInWishlist.value(product.id)) {
        await removeFromWishlist(product.id)
      } else {
        await addToWishlist(product)
      }
    }

    return {
      items,
      count,
      clearWishlist,
      fetchWishlist,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
    }
  },
  {
    persist: true,
  },
)
