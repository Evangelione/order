<template>
  <base-layout :header="station.s_name || '点单'" left="我的订单">
    <van-tree-select :height="height" :items="category" :main-active-index.sync="activeIndex">
      <template #content>
        <!-- 商品 -->
        <van-index-bar v-show="activeIndex === 0">
          <div :key="item.sort_id" v-for="item in retailList">
            <van-index-anchor :index="item.sort_name" />
            <van-card
              :key="i.goods_id"
              :num="i.stock_num === '-1' ? '∞' : i.stock_num - i.num"
              :price="i.price"
              :thumb="i.pic_arr[0].url"
              :title="i.name"
              v-for="i in item.goods_list"
            >
              <template #footer>
                <van-stepper
                  :min="i.min"
                  @minus="minus(2, i.goods_id)"
                  @plus="plus(2, i.goods_id, i.price)"
                  disable-input
                  v-model="i.num"
                />
              </template>
            </van-card>
          </div>
          <van-empty description="暂无商品" v-if="retailList.length === 0"></van-empty>
        </van-index-bar>

        <!-- 服务 -->
        <van-index-bar v-show="activeIndex === 1">
          <div :key="item.cat_id" v-for="item in serviceList">
            <van-index-anchor :index="item.cat_name" />
            <van-card
              :key="i.appoint_id"
              :price="i.old_price"
              :thumb="i.pic"
              :title="i.appoint_name"
              num="∞"
              v-for="i in item.goods_list"
            >
              <template #footer>
                <van-stepper
                  :min="i.min"
                  @minus="minus(1, i.appoint_id)"
                  @plus="plus(1, i.appoint_id, i.old_price)"
                  disable-input
                  v-model="i.num"
                />
              </template>
            </van-card>
          </div>
          <van-empty description="暂无服务" v-if="serviceList.length === 0"></van-empty>
        </van-index-bar>

        <!-- 套餐 -->
        <van-index-bar v-show="activeIndex === 2">
          <div :key="item.cat_id" v-for="item in packageList">
            <van-index-anchor :index="item.cat_name" />
            <van-card
              :key="i.package_id"
              :price="i.price"
              :thumb="i.pic"
              :title="i.name"
              num="∞"
              v-for="i in item.goods_list"
            >
              <template #footer>
                <van-stepper
                  :min="i.min"
                  @minus="minus(4, i.package_id)"
                  @plus="plus(4, i.package_id, i.price)"
                  disable-input
                  v-model="i.num"
                />
              </template>
              <template #desc>
                <div :key="index" v-for="(good, index) in i.detail">{{ good.name + ' x ' + good.goods_num }}</div>
              </template>
            </van-card>
          </div>
          <van-empty description="暂无套餐" v-if="serviceList.length === 0" />
        </van-index-bar>
      </template>
    </van-tree-select>

    <template #footer>
      <van-submit-bar
        safe-area-inset-bottom
        :disabled="totalPrice == 0"
        :price="totalPrice"
        @submit="onSubmit"
        button-text="确认选择"
        button-type="primary"
        tip="选择的商品将会加入购物车"
        tip-icon="info-o"
      />
    </template>
  </base-layout>
</template>

<script>
import { retailGoodsList, serviceGoodsList, packageGoodsList, addGoodsList } from '@/api/cart'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommodityList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      activeIndex: 0,
      category: [
        { text: '商品', badge: 0 },
        { text: '服务', badge: 0 },
        { text: '套餐', badge: 0 },
      ],
      cart: [],
      retailList: [],
      serviceList: [],
      packageList: [],
    }
  },

  computed: {
    ...mapState('order', ['station', 'orderList', 'recommendList']),
    height() {
      return window.innerHeight - 130.8
    },
    totalPrice() {
      let total = 0
      this.cart.forEach(item => {
        total += item.price * 100 * item.num
      })
      return total
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { orderId } = this.$route.params
    const { store_id } = this.$route.query
    // 读取商品列表 && 向购物车中添加已购买数据
    retailGoodsList({ store_id, order_id: orderId }).then(res => {
      let list = []
      for (let i in res.result) {
        list.push(res.result[i])
      }

      // 循环所有商品，找出num>1的商品并添加到购物车中
      list.forEach(item => {
        item.goods_list.forEach(i => {
          i.min = i.num
          if (i.num > 0) {
            this.category[0].badge += i.num
            this.cart.push({ id: i.goods_id, num: i.num, type: 2, price: i.price })
          }
        })
      })
      this.retailList = list
    })

    // 读取服务列表 && 向购物车中添加已购买数据
    serviceGoodsList({ store_id, order_id: orderId }).then(res => {
      let list = []
      for (let i in res.result) {
        list.push(res.result[i])
      }

      // 循环所有服务，找出num>1的商品并添加到购物车中
      list.forEach(item => {
        item.goods_list.forEach(i => {
          i.min = i.num
          if (i.num > 0) {
            this.category[1].badge += i.num
            this.cart.push({ id: i.appoint_id, num: i.num, type: 1, price: i.old_price })
          }
        })
      })
      this.serviceList = list
      console.log(list)
    })

    // 读取套餐列表 && 向购物车中添加已购买数据
    packageGoodsList({ store_id, order_id: orderId }).then(res => {
      let list = []
      for (let i in res.result) {
        list.push(res.result[i])
      }

      // 循环所有套餐，找出num>1的商品并添加到购物车中
      list.forEach(item => {
        item.goods_list.forEach(i => {
          i.min = i.num
          if (i.num > 0) {
            this.category[2].badge += i.num
            this.cart.push({ id: i.package_id, num: i.num, type: 4, price: i.price })
          }
        })
      })
      this.packageList = list
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['placeOrderList', 'notificationWs']),
    minus(type, id) {
      const index = this.cart.findIndex(item => {
        if (item.id === id) {
          return item
        }
      })
      if (index !== -1) {
        this.cart[index].num -= 1
        if (this.cart[index].num === 0) {
          this.cart.splice(index, 1)
        }
      } else {
        // console.log('没有还减')
      }
      this.changeNum(type, 1)
    },
    plus(type, id, price) {
      const index = this.cart.findIndex(item => {
        if (item.id === id) {
          return item
        }
      })
      if (index !== -1) {
        this.cart[index].num += 1
      } else {
        this.cart.push({ id: id, num: 1, type: type, price: price })
      }
      this.changeNum(type, 0)
    },
    changeNum(type, operation) {
      let num = 0
      if (operation === 1) {
        num = -1
      } else {
        num = 1
      }
      if (type === 1) {
        this.category[1].badge += num
      } else if (type === 2) {
        this.category[0].badge += num
      } else if (type === 3) {
        this.category[3].badge += num
      } else if (type === 4) {
        this.category[2].badge += num
      }
    },
    onSubmit() {
      console.log('submit')
      const { sId } = this.$route.params
      const { store_id } = this.$route.query

      addGoodsList({
        list: this.cart,
        s_id: sId,
        store_id,
      }).then(() => {
        this._toast('已加入购物车', () => {
          this.placeOrderList({ s_id: sId })
          this.notificationWs()
          this._goBack()
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-tree-select__content {
  flex: 3;
}

/deep/.van-index-bar__sidebar {
  display: none;
}

/deep/.van-info {
  right: -10px;
}
</style>
