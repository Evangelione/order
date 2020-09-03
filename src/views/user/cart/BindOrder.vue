<template>
  <div class="container">{{ msg }}</div>
</template>

<script>
import { bindOrder, appointNotificationWs } from '@/api/cart'

export default {
  name: 'BindOrder',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      msg: '正在绑定用户...',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { sId, orderId } = this.$route.params
    const { face_id, staff_id } = this.$route.query

    var ua = navigator.userAgent.toLowerCase()
    var isWeixin = ua.indexOf('micromessenger') != -1
    if (isWeixin && !this.$cookie.get('wxAuth')) {
      this.$router.replace({
        name: 'wxBind',
        query: { redirect: this.$route.fullPath },
      })
      return
    }
    bindOrder({
      s_id: sId,
      order_no: orderId,
      face_id,
      staff_id: staff_id || 0,
    })
      .then(res => {
        this.$router.replace({ path: `/cart/${res.result.s_id}` }, () => {
          // 绑定成功，推送屏幕更新订单
          appointNotificationWs({
            sid: res.result.s_id,
            uid: '0',
          })
        })
      })
      .catch(e => {
        console.log(e)
        if (e.errorCode != 20044013) {
          this.$dialog.alert({
            title: '错误',
            message: '订单绑定失败，请扫码重试',
          })
        }
      })
  },

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  text-align: center;
  line-height: 95vh;
}
</style>
