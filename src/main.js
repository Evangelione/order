import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/vant'
import '@/common/axios'
import BaseLayout from '@/components/BaseLayout'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {}
  },
  methods: {
    _goBack() {
      this.$router.go(-1)
    },
    _toast(message = '操作成功', callback = () => {}) {
      this.$toast.success({
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

Vue.component('base-layout', BaseLayout)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
