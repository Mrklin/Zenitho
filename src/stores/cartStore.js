import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/components/utils/api'
import toast from 'vue3-hot-toast'
import { userStore } from './userStore'

export const useCartStore = defineStore('cartStore', () => {
    const items = ref([])

    const count = computed(() => items.value.length)

    const cartItems = computed(() => items.value)

    const checkOutSuccess = ref(null)

    const loading = ref(false)
    const error = ref(null)

    const isInCart = computed(() => {
      return (productId) => {
        // Add Array.isArray check here as a safety net
        if (!Array.isArray(items.value)) return false
        return items.value.some((item) => item.id == productId)
      }
      // return (id) => items.value.some(item => item.id === id);
    })

    const fetchCart = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await api.get('/cart')

        const data = response.data.data || response.data

        items.value = Array.isArray(data) ? data : []
      } catch (error) {
        console.error('Error fetching cart:', error)
      } finally {
        loading.value = false
      }
    }

    // const addToCart = async (product) => {
    //     try {
    //         const response = await api.post('/cart/add',{
    //             product_id: product.id,
    //             quantity:1 }
    //         );

    //         const serverData = response.data?.data || {};

    //         const existingIndex = items.value.findIndex(i => i.id === product.id);

    //         if (existingIndex !==-1) {
    //            items.value[existingIndex].quantity++;
    //            console.log(existingIndex);
    //         } else {
    //          items.value.push({
    //             ...product,
    //             cart_id: serverData.id || Date.now() ,
    //             quantity: 1
    //          });
    //         }
    //         toast.success("Item added to cart", {duration: 2000});

    //     } catch (error) {
    //         console.error("Validation Error:", error.response?.data);
    //         toast.error("Failed to add item to cart");
    //     }
    // }

    const addToCart = async (product) => {
      const uStore = userStore()
      const qtyToAdd = product.quantity || 1

      if (!uStore.isLoggedIn) {
        const existingIndex = items.value.findIndex((item) => item.id === product.id)
        if (existingIndex !== -1) {
          items.value[existingIndex].quantity += qtyToAdd
        } else {
          items.value.push({
            ...product,
            cart_id: Date.now(),
            quantity: qtyToAdd,
          })
        }
        toast.success('Added to local cart')
        return
      }

      try {
        // Correct way: The 2nd argument is the BODY of the request
        const response = await api.post('/cart/add', {
          product_id: product.id,
          quantity: qtyToAdd,
        })

        const serverData = response.data?.data || {}

        // Local state update
        const existingIndex = items.value.findIndex((i) => i.id === product.id)

        if (existingIndex !== -1) {
          items.value[existingIndex].quantity++
        } else {
          items.value.push({
            ...product,
            cart_id: serverData.id || Date.now(),
            quantity: qtyToAdd,
          })
        }
        toast.success('Item added to cart', { duration: 2000 })
      } catch (error) {
        toast.error('Failed to add item to cart')
        // This will now show you exactly what the server didn't like
        console.error('Validation Error Details:', error.response?.data?.errors)
      }
    }


    const syncCart = async () => {
      if (items.value.length === 0) return

      try {
        // Prepare payload for bulkAddToCart
        const payload = items.value.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        }))

        await api.post('/cart/bulkAddToCart', { items: payload })

        // After bulk adding, fetch the "merged" cart from the server
        await fetchCart()

        console.log('Cart synced with server successfully')
      } catch (error) {
        console.error('Failed to sync cart:', error)
      }
    }

    const updateCartQuantity = async (productId, type) => {
      const uStore = userStore()

      const item = items.value.find((item) => item.id === productId)
      if (!item) return

      if (type === 'decrement' && item.quantity <= 1) {
        return removeFromCart(item)
      }

      if (uStore.isLoggedIn) {
        try {
          if (type === 'increment') item.quantity++
          else item.quantity--

          await api.put(
            `/cart/${productId}`,
            {},
            {
              params: { type: type },
            },
          )
        } catch (error) {
          // Rollback on failure
          if (type === 'increment') item.quantity--
          else item.quantity++

          toast.error('Failed to update quantity')
          console.error('Update error:', error)
        }
      } else {
        console.log('Guest quantity updated locally')
      }
    }

    //     toast.error("No more stock available");
    //     return;
    // } else {
    //     items.value[index].number += 1;
    // }

    const removeFromCart = async (product) => {
      const uStore = userStore()

      items.value = items.value.filter((item) => item.id !== product.id)

      if (uStore.isLoggedIn) {
        try {
          await api.delete(`/cart/${product.id}`)

          items.value = items.value.filter((item) => item.id !== product.id)
          toast.success('Product removed from cart')
        } catch (error) {
          toast.error('Failed to remove product from cart')
          console.error('Faild to remove from Cart:', error)
        }
      }else{
        toast.success('Item removed locally')
      }
    }

    // const decrementCart = (id) => {
    //     const item = items.value.find(item => item.id === id);
    //     // if (item && item.number > 1) {
    //     //     const index = items.value.findIndex(item => item.id === id);
    //     //     items.value[index].number -= 1;
    //     // }
    //  if (item && item.number > 1) {
    //     item.number--;
    // }
    // };

    const itemTotal = (product) => {
      const price = Number(product.price)
      const qut = Number(product.quantity || 1)
      return price * qut
    }

    const cartTotal = computed(() => {
      return items.value.reduce((total, item) => {
        const subTotal = Number(item.price) * Number(item.quantity || 1)
        if (isNaN(subTotal)) {
          console.error(`Invalid price or quantity for item ID ${item.id}`)
          return total
        }
        return total + subTotal
      }, 0)
    })

    const clearCart = async () => {
      const uStore = userStore()
      // Create a copy of items to iterate over
      items.value = []

      if (uStore.isLoggedIn) {
        try {
          await api.delete('cart/all')
          toast.success('Items removed from cart successfully')
        } catch (error) {
          console.error('failed to clear cart', error)
          toast.error('Failed to clear cart')
        }
      }else{
        toast.success('Local cart cleared')
      }
    }

    const checkOut = async (billing) => {
      try {
        const response = await api.post('/orders/checkout', billing)

        const data = response.data?.data || response.data

        if (data) {
          checkOutSuccess.value = true
          clearCart()
          return true
        }
      } catch (error) {
        console.error('failed to checkout items', error.response?.data?.message)
        toast.error('Failed to checkout items')
        throw error
      }
    }

    return {
      items,
      cartItems,
      count,
      clearCart,
      isInCart,
      addToCart,
      syncCart,
      fetchCart,
      updateCartQuantity,
      removeFromCart,
      itemTotal,
      cartTotal,
      checkOut,
    }
  },
  {
    persist: true,
  },
)
