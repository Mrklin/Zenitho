import { createRouter, createWebHistory } from 'vue-router'
// import AuthLayout from '@/Layouts/AuthLayout.vue'
// import AppLayout from '@/Layouts/AppLayout.vue'
import SignupView from '@/components/Auth/SignupView.vue'
import AccountView from '@/components/Pages/AccountView.vue'
import AddressView from '@/components/Pages/AddressView.vue'
import LoginView from '@/components/Auth/LoginView.vue'
import ResetView from '@/components/Auth/ResetView.vue'
import DashBoardView from '@/components/Pages/DashBoardView.vue'
import ProductView from '@/components/Pages/ProductView.vue'
import ContactView from '@/components/Pages/ContactView.vue'
import ErrorpageView from '@/components/Pages/ErrorpageView.vue'
import CartView from '@/components/Pages/CartView.vue'
import WishlistView from '@/components/Pages/WishlistView.vue'
import CheckoutView from '@/components/Pages/CheckoutView.vue'
import SearchView from '@/components/Pages/SearchView.vue'
import AboutView from '@/components/Pages/AboutView.vue'
import PolicyView from '@/components/Pages/PolicyView.vue'
import SingleProduct from '@/components/Pages/SingleProduct.vue'
import FaqsView from '@/components/Pages/FaqsView.vue'
import { userStore } from '@/stores/userStore'

const AuthLayout = () => import('@/Layouts/AuthLayout.vue')
const AppLayout = () => import('@/Layouts/AppLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      meta: {isPublic: true},
      children: [
        { path: '', redirect: { name: 'login' } },
        {
          path: 'login',
          name: 'login',
          component: LoginView,
          
        },
        {
          path: 'signup',
          name: 'signup',
          component: SignupView
        },
        {
          path: 'reset',
          name: 'reset',
          component: ResetView
        }
      ]
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashBoardView,
          meta: {isPublic: true}
        },
        {
          path:'store',
          name:'store',
          component : ProductView,
          meta: {isPublic: true}
        },
        {
          path:'product/:id',
          name:'product',
          component : SingleProduct,
          props:true,
          meta: {isPublic: true}
        },
        {
          path:'cart',
          name:'cart',
          component : CartView,
          meta: {isPublic: true}
        },
        {
          path:'account',
          name: 'account',
          component: AccountView,
          meta: {requiresAuth:true}
        },
        {
          path:'address',
          name: 'address',
          component: AddressView,
          meta: {requiresAuth:true}
        },
        {path:'wishlist',
          name:'wishlist',
          component : WishlistView,
          meta: {requiresAuth: true}
        },
        {path:'checkout',
          name:'checkout',
          component : CheckoutView,
          meta: {requiresAuth: true}
        },
        {
          path:'contact',
          name:'contact',
          component : ContactView,
          meta: {isPublic: true}
        },
        {
          path:'search',
          name:'search',
          component : SearchView,
          meta: {isPublic: true}
        },
        {
          path:'about',
          name:'about',
          component : AboutView,
          meta: {isPublic: true}
        },
        {
          path:'policy',
          name:'policy',
          component : PolicyView,
          meta: {isPublic: true}
        },
        {
          path:'faqs',
          name:'faqs',
          component : FaqsView,
          meta: {isPublic: true}
        }
      ]
    },
    {
      path:'/:catchAll(.*)',
      name: '404',
      component: ErrorpageView,
      // redirect:{name:'login'}
    }
  ],
})


router.beforeEach((to, from, next) => {
  
  const isLoggedIn = userStore().isLoggedIn;

  if(to.meta.requiresAuth && !isLoggedIn){
    return next({name: 'login'});
  }
  
  const isAuth = ['login', 'signup', 'reset'].includes(to.name);

  if(isAuth && isLoggedIn){
    return next({name: 'dashboard'});
  }

  if (to.path === '/auth') {
    return next({ name: 'login' });
  }

    next();
});

export default router
