import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/components/utils/api";
import toast from "vue3-hot-toast";
//import allProductsData from '@/components/utils/products.js'; 

export const useProductStore = defineStore('products', () => {
    // 1. STATE
    const products = ref([]);
    const singleProduct = ref(null);
    const productByCat = ref({ New:[], Popular:[], Sale:[] });
    const loading = ref(false);
    const error = ref(null);
    const searchQuery = ref('');
    const pagination = ref({
        current_page: 1,
        last_page: 1,
        total: 0,
        from: 0,
        to: 0
    });

    // 2. ACTIONS
    const fetchProducts = async (page = 1, perPage = 12, category = null) => {

        if (category && productByCat.value[category].length > 0) return;
        
        loading.value = true;
        error.value = null;
        
        try {

            const  params = {page, per_page: perPage}
            if(category) params.tab = category.toLowerCase();

             const response = await api.get('/products', { params });
             const fetchData = response.data.data; // Adjust based on your API response structure
             

             if(category){
                productByCat.value[category] = fetchData;
             }else{
                products.value = fetchData;
                pagination.value = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    total: response.data.total,
                    from: response.data.from,
                    to: response.data.to
                 };
             }
             
            //  if(Array.isArray(fetchData)){ 
            //     products.value = fetchData;
            //  } else {
            //     throw new Error('Invalid data format received from API');
            //  }


            // For now, we simulate a delay then load local data
            // await new Promise(resolve => setTimeout(resolve, 500)); 
            // products.value = allProductsData; 
        
        } catch (err) {
            error.value = 'Failed to load products';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 3. GETTERS (Computed Properties)
    
    // Get First 6 New Products
    // const getNewArrivals = computed(() => {
    //     return products.value
    //         .filter(p => p.tab === 'new')
    //         .slice(0, 6);
    // });

    // // Get First 6 Popular Products
    // const getPopular = computed(() => {
    //     return products.value
    //         .filter(p => p.tab === 'popular')
    //         .slice(0, 6);
    // });

    // // Get First 6 Sale Products
    // const getOnSale = computed(() => {
    //     return products.value
    //         .filter(p => p.tab === 'sale')
    //         .slice(0, 6);
    // });

    // Get All Products (for Shop Page)

    const getAllProducts = computed(() => products.value);

    // const getProductById = computed(() => {
    //     return (id) => products.value.find(p => p.id === id || p.id === Number(id))
    // });

    const getSingleProduct = async (productId) => {
            if (!productId) return;
            loading.value = true;

        try {
            const response = await api.get(`/products/${productId}`)


            const rawData = response.data.data || response.data


            singleProduct.value = {
                ...rawData,
                quantity:1
            }

            if (products.value.length === 0) {
                fetchProducts(1, 10);
            }

            // products.value = products.value?.find(product => product.id === productId)
        } catch (error) {
            toast.error(`Failed to load product`)
            error.value = `Failed to load product`;
            console.error(error);
            
        } finally {
            loading.value = false
        }
    }

    const filterProducts = computed(() => {
        if(!searchQuery.value || searchQuery.value.trim() === ''){ 
            return products.value;
        }

        return products.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    });

    return { 
        products,
        productByCat,
        pagination,
        singleProduct,
        getSingleProduct,
        loading, 
        error,
        searchQuery, 
        fetchProducts, 
        getAllProducts,
        filterProducts
    };
});