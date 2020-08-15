<template>
  <div class="user-index">
    <router-view class="content" />
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home">
        首页
        <template #icon="props">
          <img :src="props.active ? icons.home.active : icons.home.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/find">
        发现
        <template #icon="props">
          <img :src="props.active ? icons.find.active : icons.find.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/order">
        订单
        <template #icon="props">
          <img :src="props.active ? icons.order.active : icons.order.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        我的
        <template #icon="props">
          <img :src="props.active ? icons.mine.active : icons.mine.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'User',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      active: 0,
      icons: {
        home: {
          active: require('@/assets/images/home-active.png'),
          inactive: require('@/assets/images/home.png'),
        },
        find: {
          active: require('@/assets/images/find-active.png'),
          inactive: require('@/assets/images/find.png'),
        },
        order: {
          active: require('@/assets/images/order-active.png'),
          inactive: require('@/assets/images/order.png'),
        },
        mine: {
          active: require('@/assets/images/mine-active.png'),
          inactive: require('@/assets/images/mine.png'),
        },
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    switch (this.$route.path) {
      case '/home':
        this.active = 0
        break
      case '/find':
        this.active = 1
        break
      case '/order':
        this.active = 2
        break
      case '/mine':
        this.active = 3
        break
    }
  },

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.content {
  margin-bottom: 50px;
}
</style>
