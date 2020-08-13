<template>
  <van-button :loading="loading" :size="size" :type="type" @click="submit">
    <slot>确定</slot>
  </van-button>
</template>

<script>
export default {
  name: 'VButton',

  mixins: [],

  components: {},

  props: {
    promise: Function,
    size: {
      type: String,
      default: 'normal',
    },
    type: {
      type: String,
      default: 'primary',
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    submit() {
      this.loading = true
      const toast = this._showLoading()
      this.promise().then(() => {
        this.loading = false
        toast.clear()
      })
    },
  },
}
</script>

<style lang="less"></style>
