export default {
  path: '/',
  component: () => import(/* webpackChunkName: "Customer" */ '@/views/user'),
  children: [
    {
      path: 'home',
      component: () => import(/* webpackChunkName: "Customer" */ '@/views/user/home'),
    },
    {
      path: 'find',
      component: () => import(/* webpackChunkName: "Customer" */ '@/views/user/find'),
    },
    {
      path: 'order',
      component: () => import(/* webpackChunkName: "Customer" */ '@/views/user/order'),
    },
    {
      path: 'mine',
      component: () => import(/* webpackChunkName: "Customer" */ '@/views/user/mine'),
    },
  ],
}
