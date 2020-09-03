import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/vant'
import '@/common/axios'
import components from '@/components'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)
Vue.use(components)

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {}
  },
  methods: {
    _goBack() {
      this.$router.go(-1)
    },
    _toast(message = '操作成功', callback = () => {}, type = 'success') {
      this.$toast({
        type: type,
        message: message,
        forbidClick: true,
        duration: 850,
        onClose: () => {
          callback()
        },
      })
    },
    _showLoading() {
      return this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
    },
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
