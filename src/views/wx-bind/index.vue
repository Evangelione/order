<template>
  <div class="container">{{ msg }}</div>
</template>

<script>
import { getWxCode, getOpenID } from '@/api/common'
export default {
  name: 'WxBind',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      msg: '正在拉取订单信息...',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    if (this.$cookie.get('wxAuth')) {
      this.$router.go(-1)
      return
    }
    const { code, state, redirect } = this.$route.query
    if (code && state) {
      getOpenID({ code, state }).then(() => {
        this.$router.replace({
          path: redirect,
        })
      })
    } else {
      getWxCode({ code }).then(res => {
        window.location.href = res.result.referer
      })
    }
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
