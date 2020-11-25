<template>
  <van-skeleton title :row="8" :loading="loading">
    <div class="container">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index">
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
          <div class="title">{{ goods_info.name }} {{ goods_info.description }}</div>
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
      <div v-html="des" style="width: 100vw" v-if="goods_info.goods_type != '4'" class="html" />
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
import { getGoodsInfo } from '@/api/promotion'
export default {
  name: 'PromotionProduct',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      show: false,
      loading: true,
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
    const { ad_id, imax_id, store_id, staff_id } = this.$route.query
    getGoodsInfo({
      ad_id,
      imax_id,
      store_id,
      staff_id,
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
    onClickChat() {
      window.location.href = 'https://www.9youke.com/wap.php?g=wap&c=hxim&a=index&store_id=323'
    },
    onClickStore() {
      window.location.href = 'https://www.9youke.com/wap.php?g=Wap&c=Mall&a=store_new&store_id=323'
    },
    onClickButton() {
      this.$toast('商户暂未开通支付功能')
    },
    onClickMap() {
      this.show = true
    },
    onChange(index) {
      this.current = index
    },
    onConactMer() {
      this.$dialog
        .alert({
          closeOnClickOverlay: true,
          message: this.store_info.phone,
          theme: 'round-button',
          confirmButtonText: '拨号',
        })
        .then(() => {
          window.location.href = `tel://${this.store_info.phone}`
          // on close
        })
        .catch(() => {})
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      switch (item.name) {
        case '百度地图':
          setTimeout(() => {
            window.location.href = `http://api.map.baidu.com/marker?location=${this.store_info.lat},${this.store_info.long}&title=${this.store_info.name}&content=${this.store_info.adress}&output=html`
          }, 500)
          break
        case '高德地图':
          setTimeout(() => {
            var point = this.bd_decrypt(this.store_info.long, this.store_info.lat)
            window.location.href = `https://uri.amap.com/marker?position=${point.lng},${point.lat}&name=${this.store_info.name}&coordinate=gaode&callnative=1`
          }, 500)
          break
      }
      this.show = false
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
    bd_decrypt(bd_lng, bd_lat) {
      var X_PI = (Math.PI * 3000.0) / 180.0
      var x = bd_lng - 0.0065
      var y = bd_lat - 0.006
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
      var gg_lng = z * Math.cos(theta)
      var gg_lat = z * Math.sin(theta)
      return { lng: gg_lng, lat: gg_lat }
    },
    //高德坐标转百度（传入经度、纬度）
    bd_encrypt(gg_lng, gg_lat) {
      var X_PI = (Math.PI * 3000.0) / 180.0
      var x = gg_lng,
        y = gg_lat
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
      var bd_lng = z * Math.cos(theta) + 0.0065
      var bd_lat = z * Math.sin(theta) + 0.006
      return {
        bd_lat: bd_lat,
        bd_lng: bd_lng,
      }
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
  height: 80vw;
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
  margin-top: 20px;
  font-weight: bold;
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
