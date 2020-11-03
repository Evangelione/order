import Vue from 'vue'
import VueRouter from 'vue-router'
import copartner from './copartner'
import customer from './customer'

Vue.use(VueRouter)

const routes = [
  customer,
  copartner,
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
