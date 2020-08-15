<template>
  <div class="mine">
    <van-nav-bar title="我的" fixed :style="{ opacity: opacity }" />
    <van-row class="user-box">
      <van-col span="18">
        <van-col span="6">
          <van-image round width="60" height="60" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-col>
        <van-col span="18">
          <div class="nickname van-ellipsis">432e3d556432e3d556432e3d556432e3d556</div>
          <div class="desc van-ellipsis">
            填满了肚子，人就不会空虚,填满了肚子，人就不会空虚,填满了肚子，人就不会空虚,填满了肚子，人就不会空虚
          </div>
        </van-col>
      </van-col>
      <van-col span="6" class="tool-box">
        <van-col span="12">
          <img :src="require('@/assets/images/setting.png')" width="36" height="36" />
        </van-col>
        <van-col span="12">
          <img :src="require('@/assets/images/message.png')" width="32" height="36" />
        </van-col>
      </van-col>
    </van-row>

    <div class="swipe-box">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <tool-box mode="multi" :data="data" />

    <van-row gutter="8">
      <van-col span="12">
        <tool-box mode="single" :data="sdata" />
      </van-col>
      <van-col span="12">
        <tool-box mode="single" :data="sdata1" />
      </van-col>
    </van-row>

    <tool-box mode="multi" :data="data1" :column="3" />

    <tool-box mode="multi" :data="data3" />
  </div>
</template>
<script>
import ToolBox from './components/ToolBox'
export default {
  name: 'Mine',

  mixins: [],

  components: {
    ToolBox,
  },

  props: {},

  data() {
    return {
      data: {
        title: '常用功能',
        list: [
          { text: '签到', icon: 'checked', route: '1' },
          { text: '收藏', icon: 'star', route: '1' },
          { text: '优惠券', icon: 'coupon', route: '1' },
          { text: '收货地址', icon: 'map-marked', route: '1' },
        ],
      },
      data1: {
        title: '我的钱包',
        detail: '金币、余额',
        list: [
          { text: '签到', icon: 'checked', route: '1' },
          { text: '收藏', icon: 'star', route: '1' },
          { text: '优惠券', icon: 'coupon', route: '1' },
        ],
      },
      data3: {
        title: '更多功能',
        list: [
          { text: '会员卡', icon: 'vip-card', route: '1' },
          { text: '套餐卡', icon: 'send-gift', route: '1' },
          { text: '我的红包', icon: 'balance-list', route: '1' },
          { text: '我的推广', icon: 'good-job', route: '1' },
          { text: '参与活动', icon: 'fire', route: '1' },
          { text: '区域管理', icon: 'location', route: '1' },
        ],
      },
      sdata: { title: '赚金豆', detail: '可兑换大礼包哦', icon: 'coupon', route: '1' },
      sdata1: { title: '翻滚吧钱包', detail: '多买多送', icon: 'coupon', route: '1' },
      images: [require('@/assets/images/1s.png'), require('@/assets/images/1s.png')],
      scrollTop: 0,
    }
  },

  computed: {
    opacity() {
      console.log(this.scrollTop / 100 > 1 ? 1 : this.scrollTop / 100)
      return this.scrollTop / 100 > 1 ? 1 : this.scrollTop / 100
    },
  },

  watch: {},

  created() {},

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 10) {
        this.scrollTop = scrollTop
        //滚动大于0的时候要做的操作
      } else {
        this.scrollTop = 0
      }
    },
  },
}
</script>

<style lang="less" scoped>
.mine {
  padding: 8px 14px;
}
.user-box {
  .nickname {
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    padding-left: 4px;
  }
  .desc {
    color: @color-text-secondary;
    font-size: @font-size-sm;
    padding-left: 4px;
  }

  .tool-box {
    padding-top: 10px;
    .van-col {
      text-align: right;
      .van-icon {
        font-size: 28px;
      }
    }
  }
}

.swipe-box {
  margin-top: 8px;

  img {
    width: 100%;
    height: 75px;
  }
}
</style>
