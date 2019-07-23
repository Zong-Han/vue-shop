import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Pages/Login';
import Dashboard from '@/components/Dashboard/Dashboard';
import Products from '@/components/Pages/Products';
import Orders from '@/components/Pages/Orders';
import Coupon from "@/components/Pages/Coupon";
import PayOrder from "@/components/Pages/PayOrder";
import Index from '@/components/Pages/Index';
import Category from '@/components/Pages/Category';
import AllCategory from "@/components/FrontEnd/CategoryComponents/AllCategory";
import ProductInfo from "@/components/FrontEnd/CategoryComponents/ProductInfo";
import CartOrders from "@/components/FrontEnd/OrderComponents/CartOrders";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/all-category',
      name: 'category',
      component: Category,
      children: [
        {
          path: "category/:id",
          name: "allCategory",
          component: AllCategory
        },
        {
          path: 'product-info/:id',
          name: 'productInfo',
          component: ProductInfo,
        },
        {
          path: "cart-orders",
          name: "cartOrders",
          component: CartOrders
        },
        {
          path: "pay-order/:id",
          name: "payOrder",
          component: PayOrder
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      meta: { requireAuth: true },//需要驗證

      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requireAuth: true },//需要驗證

        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: { requireAuth: true },//需要驗證
        },
        {
          path: "coupon",
          name: "coupon",
          component: Coupon,
          meta: { requireAuth: true }
        }

      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

