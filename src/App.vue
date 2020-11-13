<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',

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
    console.log(process.env.BASE_URL)
  },

  destroyed() {},

  methods: {},
}
</script>

<style lang="less">
html,
body {
  background: @background-color-base;
}

.van-card__title {
  font-size: @font-size-md;
  margin-top: 4px;
}

.van-card__desc {
  margin-top: 2px;
}

.van-card__footer {
  margin-top: 6px;
}

.html {
  img {
    width: 100%;
  }
}
</style>
