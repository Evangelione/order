<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserOrder',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {
    // 微信静默授权
    var ua = navigator.userAgent.toLowerCase()
    var isWeixin = ua.indexOf('micromessenger') != -1
    console.log(isWeixin)
    console.log(this.$cookie.get('wxAuth'))
    if (isWeixin && !this.$cookie.get('wxAuth')) {
      this.$router.replace({
        name: 'wxBind',
        query: { redirect: this.$route.fullPath },
      })
    } else {
      const { sId } = this.$route.params
      this.placeOrderList({ s_id: sId })
    }
  },

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('order', ['placeOrderList']),
  },
}
</script>

<style lang="less" scoped></style>
