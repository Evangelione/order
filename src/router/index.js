import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Wap" */ '@/views'),
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login'),
  },
  {
    path: '/userOrder/:sId',
    component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/UserOrder'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/UserOrder/PlaceOrder'),
      },
      {
        path: 'order/:storeId/:orderId',
        component: () => import(/* webpackChunkName: "UserOrder" */ '@/views/UserOrder/CommodityList'),
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
