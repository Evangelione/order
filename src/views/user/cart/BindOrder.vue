<template>
  <div class="container">{{ msg }}</div>
</template>

<script>
import { bindOrder } from '@/api/order'

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
    bindOrder({
      s_id: sId,
      order_no: orderId,
      face_id,
      staff_id: staff_id || 0,
    }).then(res => {
      this.$router.replace({ path: `/userOrder/${res.result.s_id}` })
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
