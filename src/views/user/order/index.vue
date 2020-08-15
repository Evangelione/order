<template>
  <div>
    <van-nav-bar left-text="订单" :border="false">
      <template #right>
        <img :src="require('@/assets/images/search-1.png')" width="26" height="26" @click="showSearch = true" />
      </template>
    </van-nav-bar>
    <search-view v-show="showSearch" @cancel="showSearch = false" />
    <van-tabs v-model="active" sticky swipeable>
      <van-tab title="全部">
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
      </van-tab>
      <van-tab title="零售">内容 2</van-tab>
      <van-tab title="优惠买单">内容 3</van-tab>
      <van-tab title="预约记录">内容 4</van-tab>
      <template #nav-right>
        <div class="van-tab" @click="showAction = true">其他订单</div>
      </template>
    </van-tabs>
    <van-action-sheet v-model="showAction" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import SearchView from './components/SearchView'
export default {
  name: 'Order',

  mixins: [],

  components: {
    SearchView,
  },

  props: {},

  data() {
    return {
      active: 0,
      value1: 0,
      showAction: false,
      showSearch: false,
      actions: [
        { name: '其他', value: 0 },
        { name: '新款商品', value: 1 },
        { name: '活动商品', value: 2 },
      ],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    onSelect(value) {
      console.log(value)
      this.showAction = false
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__text {
  font-weight: bold;
  font-size: @font-size-lg;
}

/deep/.van-dropdown-menu__bar {
  box-shadow: none;
  height: 100%;
  .van-dropdown-menu__title {
    color: @color-text-regular;
    font-size: @font-size-md;
  }
}
</style>
