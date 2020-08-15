<template>
  <div class="search-view">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>

    <div class="search-result" v-if="list">
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
    </div>

    <template v-if="history && !list">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="12" class="label">历史搜索</van-col>
        <van-col span="2" offset="2">
          <van-icon name="delete" @click="onDeleteTouch" />
        </van-col>
      </van-row>

      <div class="history-box">
        <van-tag v-for="(item, index) in history" :key="index" @click="onTagTouch(item)">{{ item }}</van-tag>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SearchView',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      value: '',
      list: null,
      history: JSON.parse(localStorage.getItem('search-history-order')),
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    console.log(this.h)
  },

  destroyed() {},

  methods: {
    onTagTouch(val) {
      this.value = val
      this.onSearch(val)
    },
    onDeleteTouch() {
      localStorage.removeItem('search-history-order')
      this.history = null
    },
    onSearch(val) {
      if (!this.history) {
        localStorage.setItem('search-history-order', JSON.stringify([val]))
      } else {
        const set = new Set(this.history)
        set.add(val)
        localStorage.setItem('search-history-order', JSON.stringify(Array.from(set)))
      }
      this.list = []
      console.log(this.value)
    },
    onCancel() {
      this.list = null
      this.history = JSON.parse(localStorage.getItem('search-history-order'))
      this.$emit('cancel')
    },
  },
}
</script>

<style lang="less" scoped>
.search-view {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 999;
}

.label {
  margin-left: 14px;
  font-size: @font-size-md;
  font-weight: bold;
}

.van-icon {
  color: @color-text-regular;
}

.history-box {
  margin: 8px 14px;
  .van-tag {
    margin-right: 8px;
    padding: 2px 12px;
    background: #ececec;
    color: @color-text-regular;
    margin-bottom: 6px;
  }
}
</style>
