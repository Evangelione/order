export default {
  path: '/copartner',
  component: () => import(/* webpackChunkName: "Copartner" */ '@/views/copartner'),
  children: [
    {
      path: '',
      component: () => import(/* webpackChunkName: "Copartner" */ '@/views/copartner/AreaManager'),
    },
    {
      path: 'crud/:id?',
      component: () => import(/* webpackChunkName: "Copartner" */ '@/views/copartner/AreaCRUD'),
    },
  ],
}
