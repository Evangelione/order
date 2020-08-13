<template>
  <div>
    <van-popup position="bottom" round safe-area-inset-bottom v-model="visible">
      <van-picker :columns="col" @cancel="onCancel" @change="onChange" @confirm="onConfirm" show-toolbar />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'MultiplePicker',
  mixins: [],

  components: {},

  props: {
    col: Array,
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
    onConfirm(data) {
      this.$emit('confirm', data)
      this.toggle()
    },
    onChange() {},
    onCancel() {
      this.toggle()
    },
    toggle() {
      this.visible = !this.visible
    },
  },

  beforeRouteLeave(to, from, next) {
    if (this.visible) {
      next(false)
      this.visible = false
    } else {
      next()
    }
  },
}
</script>

<style lang="less" scoped></style>
