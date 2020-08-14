import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Wap" */ '@/views'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/user/cart/PlaceOrder'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login'),
  },
  {
    path: '/cart/:sId',
    component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/cart'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/cart/PlaceOrder'),
      },
      {
        path: 'bind/:orderId',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/cart/BindOrder'),
      },
      {
        path: 'shelves/:orderId',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/cart/CommodityList'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
