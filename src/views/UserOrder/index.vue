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

  created() {},

  mounted() {
    const { sId } = this.$route.params
    this.placeOrderList({ s_id: sId })
  },

  destroyed() {},

  methods: {
    ...mapActions('userOrder', ['placeOrderList']),
  },
}
</script>

<style lang="less" scoped></style>
