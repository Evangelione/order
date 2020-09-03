import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Wap" */ '@/views/user'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/home'),
      },
      {
        path: 'find',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/find'),
      },
      {
        path: 'order',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/order'),
      },
      {
        path: 'mine',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/mine'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login'),
  },
  {
    path: '/cart/:sId/bind/:orderId',
    component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/cart/BindOrder'),
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
        path: 'shelves/:orderId?',
        component: () => import(/* webpackChunkName: "Cart" */ '@/views/user/cart/CommodityList'),
      },
    ],
  },
  {
    path: '/wxBind',
    name: 'wxBind',
    component: () => import(/* webpackChunkName: "Cart" */ '@/views/wx-bind'),
  },
  {
    path: '*',
    redirect: '/login',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
