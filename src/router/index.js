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
    path: '/userOrder/:sId',
    component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/user/cart'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/user/cart/PlaceOrder'),
      },
      {
        path: 'bind/:orderId',
        component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/user/cart/BindOrder'),
      },
      {
        path: 'shelves/:orderId',
        component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/user/cart/CommodityList'),
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
