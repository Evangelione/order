<template>
  <div class="container">
    <slot name="header">
      <van-nav-bar
        :left-arrow="arrow"
        :left-text="left"
        :right-text="right"
        :title="header"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        v-if="header"
      />
    </slot>
    <div class="flex">
      <slot />
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout',

  mixins: [],

  components: {},

  props: {
    header: String,
    arrow: {
      type: Boolean,
      default: true,
    },
    left: {
      type: String,
      default: '返回',
    },
    right: {
      type: String,
      default: '',
    },
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    onClickLeft() {
      this._goBack()
    },
    onClickRight() {
      this.$emit('click-right')
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .flex {
    flex: 1;
    overflow: scroll;
  }
}
</style>
