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
      msg: '请稍后...',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { code, state, redirect } = this.$route.query
    if (this.$cookie.get('wxAuth')) {
      this.$router.replace({
        path: redirect,
      })
      return
    }
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
