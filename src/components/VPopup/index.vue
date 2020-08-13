<template>
  <van-popup
    :position="position"
    :style="{ height }"
    get-container="body"
    round
    safe-area-inset-bottom
    v-model="visible"
  >
    <slot>popup</slot>
    <slot name="footer" />
  </van-popup>
</template>

<script>
export default {
  name: 'VPopup',

  mixins: [],

  components: {},

  props: {
    height: {
      type: String,
      default: 'auto',
    },
    position: {
      type: String,
      default: 'bottom',
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    toggle() {
      this.visible = !this.visible
    },
  },

  beforeRouteLeave(to, from, next) {
    if (this.visible) {
      this.visible = false
      next(false)
    } else {
      next()
    }
  },
}
</script>

<style lang="less" scoped></style>
