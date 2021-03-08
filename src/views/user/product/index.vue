<template>
  <van-skeleton title :row="8" :loading="loading">
    <div class="container">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index" @click="onPreview">
          <img v-lazy="image" class="goods_img" />
        </van-swipe-item>
        <template #indicator>
          <div class="indicator">{{ current + 1 }} / {{ images.length }}</div>
        </template>
      </van-swipe>
      <van-goods-action>
        <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickStore" />
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickChat" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
      </van-goods-action>
      <div class="goods_container">
        <div>
          <!-- <div class="label">
            <van-tag>套餐</van-tag>
          </div> -->
          <div class="price">
            <span class="pre">¥</span>
            {{ goods_info.around_price }}
            <span class="original_price">¥ {{ oldPrice(goods_info) }}</span>
          </div>
          <div class="tag">
            <van-tag>联盟推广</van-tag>
            <van-tag>推广独享价</van-tag>
            <span class="tag-right">{{ store_info.city_name }} {{ store_info.area_name }}</span>
          </div>
        </div>
        <div>
          <div class="title">{{ goods_info.name }}</div>
          <div style="font-size: 13px">{{ goods_info.description }}</div>
        </div>
      </div>
      <div class="goods_container store_info">
        <div class="store_logo">
          <van-image width="45" height="45" :src="store_info.shop_logo" />
          <div class="store_name">
            <div>{{ store_info.name }}</div>
            <div>
              {{ store_info.time }}
            </div>
          </div>
        </div>
        <div class="store_right">
          <van-button type="danger" size="mini" round plain @click="onConactMer">联系商家</van-button>
          <van-button type="danger" size="mini" round @click="onClickMap">导航到店</van-button>
        </div>
      </div>
      <van-divider :style="{ borderColor: '#ddd', padding: '0 16px' }">
        {{ goods_info.goods_type != '4' ? '图文详情' : '套餐内商品' }}
      </van-divider>
      <div v-html="des" style="width: 100vw" v-if="goods_info.goods_type != '4'" class="html" @click="onHtmlPreview" />
      <div v-else>
        <van-card
          :num="item.goods_num"
          :title="item.name"
          :tag="item.type == '0' ? '服务' : ''"
          v-for="item in goods_info.detail"
          :key="item.id"
          :thumb="item.pic"
        />
      </div>
      <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
    </div>
  </van-skeleton>
</template>

<script>
import { getGoodsInfo } from '@/api/product'

export default {
  name: 'ProductIndex',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      show: false,
      loading: false,
      images: [],
      current: 0,
      store_info: {},
      goods_info: {},
      actions: [{ name: '百度地图' }, { name: '高德地图' }],
      des: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { staff_id, imax_id, commodity_type, commodity_id } = this.$route.query
    getGoodsInfo({
      staff_id,
      imax_id,
      commodity_type,
      commodity_id,
    }).then(res => {
      if (res.errorCode != 0) {
        this.$dialog
          .alert({
            title: '提示',
            message: res.errorMsg,
            theme: 'round-button',
          })
          .then(() => {
            this.$router.go(-1)
          })
        return
      }
      this.store_info = res.result.store_info
      switch (res.result.goods_detail.goods_type) {
        case '0':
          this.goods_info = res.result.goods_detail
          this.images = res.result.goods_detail.image.split(',')
          this.des = res.result.goods_detail.des
          break
        case '1':
          break
        case '2':
          this.goods_info = res.result.goods_detail
          this.images = res.result.goods_detail.pic.split(',')
          this.des = res.result.goods_detail.appoint_pic_content
          this.goods_info.name = res.result.goods_detail.appoint_name
          break
        case '4':
          this.goods_info = res.result.goods_detail
          this.images = res.result.goods_detail.pic.split(',')
          break
        default:
          this.$dialog
            .alert({
              title: '错误',
              message: '商品信息有误',
              theme: 'round-button',
            })
            .then(() => {
              this.$router.go(-1)
            })
          return
      }
      this.loading = false
    })
  },

  destroyed() {},

  methods: {
    onChange(index) {
      this.current = index
    },
    onClickChat() {
      let url = 'www.9youke.com'
      if (process.env.VUE_APP_ENV == 'prod') {
        url = 'www.91gzt.com'
      }
      const { store_id } = this.$route.query
      window.location.href = `${window.location.protocol}//${url}/wap.php?g=wap&c=hxim&a=index&store_id=${store_id}`
    },
    onClickStore() {
      let url = 'www.9youke.com'
      if (process.env.VUE_APP_ENV == 'prod') {
        url = 'www.91gzt.com'
      }
      const { store_id } = this.$route.query
      window.location.href = `${window.location.protocol}//${url}/wap.php?g=Wap&c=Mall&a=store_new&store_id=${store_id}`
    },
    oldPrice(goods) {
      // goods_info.old_price
      let price = ''
      switch (goods.goods_type) {
        case '0':
          price = goods.old_price
          break
        case '1':
          break
        case '2':
          price = goods.show_price
          break
        case '4':
          price = goods.old_price
          break
      }

      return price
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 60px;
  background: #eee;
  min-height: 100vh;
}

.goods_img {
  width: 100vw;
  height: 100vw;
}

.goods_container {
  margin: 6px 10px 12px;
  border-radius: 18px;
  background: #fff;
  padding: 12px 14px;
  box-sizing: border-box;
  box-shadow: 0px 0px 3px 0px #ddd;
}
.label {
  color: red;
  font-size: 13px;
}
.price {
  margin-top: 4px;
  color: red;
  font-size: 24px;
  font-weight: bold;
  .pre {
    font-size: 14px;
  }
  .original_price {
    font-weight: normal;
    margin-left: 10px;
    font-size: 13px;
    text-decoration: line-through;
  }
}

.tag {
  margin-top: 4px;
  .van-tag {
    padding-top: 1px;
    color: @primary-deep;
    background: rgb(253, 245, 225);
  }

  .van-tag + .van-tag {
    margin-left: 5px;
  }
  .tag-right {
    float: right;
    color: @color-text-secondary;
    font-size: 12px;
  }
}

.title {
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 5px;
}

.indicator {
  position: absolute;
  right: 18px;
  bottom: 12px;
  padding: 2px 8px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 10px;
}

.store_info {
  display: flex;
  justify-content: space-between;

  .store_logo {
    display: flex;
    .van-tag {
      background: @primary-deep;
    }
  }

  .store_name {
    display: flex;
    margin-left: 10px;
    font-size: 14px;
    flex-direction: column;
    justify-content: space-between;

    div:nth-child(2) {
      font-size: 11px;
      color: #666;
    }
  }

  .store_right {
    display: flex;
  }
}

.van-goods-action {
  z-index: 10;
}
</style>
