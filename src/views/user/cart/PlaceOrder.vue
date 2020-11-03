<template>
  <base-layout :arrow="false" :header="station.s_name" @click-right="onClickRight" left right="点单">
    <div class="vbbox">
      <van-card
        :class="item.status !== '0' ? 'green' : 'yellow'"
        :desc="commodityType(item.type)"
        :key="index"
        :num="item.goods_num"
        :price="item.pay_price"
        :tag="item.status === '0' ? '未下单' : '已下单'"
        :thumb="item.goods_img"
        :title="item.name"
        @click="openEditor(item)"
        v-for="(item, index) in orderList"
      >
        <template #footer>
          <div v-if="item.type == '1'">
            <span v-if="item.need_service_personnel === '1' && item.remark_service_personnel !== '0' && !item.supply">
              {{ item.remark_service_personnel_name }} - {{ item.remark_service_personnel_level }} （¥{{
                item.remark_service_personnel_price
              }}）
            </span>
            <van-row v-else>
              <van-col :key="index" span="6" v-for="(item, index) in item.supply">
                <div class="technician-box">
                  <van-icon name="manager" />
                  <div>{{ item.name }}</div>
                  <div>{{ item.grade_name }}</div>
                  <div>¥{{ item.service_fee }}</div>
                </div>
              </van-col>
            </van-row>
            <van-button
              @click.stop="appointTechnician(item)"
              round
              size="mini"
              type="primary"
              v-if="item.status == '0' && item.need_service_personnel === '1'"
            >
              预选技师
            </van-button>
          </div>

          <div class="package-box" v-if="item.type == '4'">
            <div :key="index2" v-for="(i, index2) in item.detail">
              <div>
                <span class="goods-name">{{ i.name }} x1</span>
                <span v-if="i.need_service_personnel === '1' && i.remark_service_personnel !== '0' && !i.supply">
                  {{ i.remark_service_personnel_name }} - {{ i.remark_service_personnel_level }} （¥{{
                    i.remark_service_personnel_price
                  }}）
                </span>
                <van-button
                  @click.stop="appointTechnician(i)"
                  round
                  size="mini"
                  type="primary"
                  v-if="i.status == '0' && i.need_service_personnel === '1'"
                >
                  预选技师
                </van-button>
              </div>
              <van-row v-if="i.supply">
                <van-col :key="index" span="6" v-for="(i, index) in i.supply">
                  <div class="technician-box">
                    <van-icon name="manager" />
                    <div>{{ i.name }}</div>
                    <div>{{ i.grade_name }}</div>
                    <div>¥{{ i.service_fee }}</div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </template>
      </van-card>
    </div>

    <van-empty
      :image="require('@/assets/images/bg.png')"
      description="购物车内还没有商品哦"
      v-if="orderList.length == 0 && !listLoading"
    >
      <van-button round type="primary" @click="onClickRight">去选商品</van-button>
    </van-empty>
    <van-loading v-if="listLoading" class="loading">加载中...</van-loading>

    <div class="recommend-box" v-if="recommendList.length">
      <van-divider>推荐搭配</van-divider>
      <van-swipe :autoplay="recommendList.length > 1 ? 3000 : 0" indicator-color="white">
        <van-swipe-item :key="index" v-for="(item, index) in recommendList">
          <van-row gutter="18">
            <van-col
              :key="index2"
              @click="openEditor(i)"
              span="6"
              style="text-align: center;"
              v-for="(i, index2) in item"
            >
              <van-image fit="cover" :src="i.pic" height="20vw" width="20vw" />
              <span style="font-size: 12px; color: #666;">{{ i.name || i.appoint_name }}</span>
            </van-col>
          </van-row>
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-submit-bar
      v-if="orderList.length != 0"
      safe-area-inset-bottom
      :loading="loading"
      :button-text="submitText"
      :disabled="submitDisabled"
      :price="totalPrice"
      :tip="submitTip"
      @submit="stationCheck"
      button-type="primary"
      tip-icon="info-o"
    />
    <single-picker :col="technicianList" @confirm="pickTechnician" ref="technicianPicker"></single-picker>
    <single-picker :col="stationList" @confirm="pickStation" ref="stationPicker"></single-picker>
    <v-popup class="goodsEditor" position="center" ref="goodsEditor">
      <van-image :src="goods.goods_img" height="90vw" width="90vw" />
      <div class="title">{{ goods.name }}</div>
      <div class="price-box">
        <div class="price">
          ¥ {{ goods.pay_price }}
          <span class="origin-price" v-if="goods.old_price">¥ {{ goods.old_price }}</span>
        </div>
        <van-stepper v-if="goods.type == '2' || goods.add" v-model="goods.num" />
      </div>
      <div class="opa">
        <van-button @click="modifyCommodity(0)" size="small" type="primary" v-if="!goods.add">
          删除商品
        </van-button>
        <van-button
          @click="modifyCommodity(goods.num)"
          size="small"
          type="primary"
          v-if="goods.type == '2' && !goods.add"
        >
          确认修改
        </van-button>
        <van-button @click="addCommodity(goods.num)" size="small" type="primary" v-if="goods.add">
          加入购物车
        </van-button>
      </div>
    </v-popup>
  </base-layout>
</template>

<script>
import {
  technicianList,
  appointTechnician,
  addGoods,
  modifyGoods,
  settlementOrder,
  commitOrder,
  pushStaff,
  stationList,
} from '@/api/cart'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'PlaceOrder',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      loading: false,
      technicianList: [],
      stationList: [],
      goods_id: '',
      goods: {},
      site: '',
    }
  },

  computed: {
    ...mapState('order', ['station', 'orderList', 'recommendList', 'listLoading']),
    ...mapGetters('order', ['totalPrice']),
    submitText() {
      if (this.orderList.length > 0) {
        let str = '结算'
        if (this.orderList[0].status == '2') {
          str = '结算中'
        } else {
          for (let i = 0; i < this.orderList.length; i++) {
            if (this.orderList[i].status == '0') {
              str = '提交订单'
              break
            }
          }
        }
        return str
      } else {
        return '提交订单'
      }
    },
    submitTip() {
      if (this.orderList.length > 0) {
        return this.orderList[0].status === '2'
          ? '店员正在结算此订单'
          : '预选服务人员如有变动，工作人员会与您沟通确认。'
      } else {
        return ''
      }
    },
    submitDisabled() {
      if (this.orderList.length > 0) {
        return this.orderList[0].status === '2' ? true : false
      } else {
        return false
      }
    },
    isFirst() {
      let bool = true
      this.orderList.forEach(item => {
        if (item.status !== '0') {
          bool = false
        }
      })
      return bool
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('order', ['placeOrderList', 'notificationWs']),
    onClickRight() {
      if (this.station.order_id) {
        this.$router.push({
          path: `/cart/${this.$route.params.sId}/shelves/${this.station.order_id}`,
          query: {
            store_id: this.station.store_id,
          },
        })
      } else {
        this.$router.push({
          path: `/cart/${this.$route.params.sId}/shelves`,
          query: {
            store_id: this.station.store_id,
          },
        })
      }
    },
    commodityType(type) {
      let name = ''
      switch (type) {
        case '1':
          name = '服务'
          break
        case '2':
          name = '商品'
          break
        case '3':
          name = '组合卡'
          break
        case '4':
          name = '套餐'
          break
        default:
          name = '未知商品'
      }
      return name
    },
    openEditor(item) {
      console.log(item)
      if (item.add) {
        this.goods = item
        this.$set(this.goods, 'num', 1)
        this.goods.name = item.name || item.appoint_name
        this.goods.goods_img = item.pic
        this.goods.pay_price = item.price || item.old_price
        this.$refs.goodsEditor.toggle()
        return
      }
      if (item.status != '0') {
        return
      }
      this.goods = item
      this.$set(this.goods, 'num', item.goods_num)
      this.$refs.goodsEditor.toggle()
    },
    appointTechnician(item) {
      this.goods_id = item.id
      technicianList({ store_id: this.station.store_id, id: item.goods_appoint_id }).then(res => {
        this.technicianList = res.result.map(item => {
          if (item.status != '0') {
            item.text = `${item.name} - ${item.technician_grade_name || '暂无等级'} （¥${item.service_fee}）（服务中）`
            item.disabled = true
          } else {
            item.text = `${item.name} - ${item.technician_grade_name || '暂无等级'} （¥${item.service_fee}）`
          }
          return item
        })
        this.$refs.technicianPicker.toggle()
      })
    },
    pickTechnician(data) {
      console.log(data)
      appointTechnician({
        id: this.goods_id,
        order_id: this.station.order_id,
        staff_id: data.id,
      }).then(() => {
        this.placeOrderList({ s_id: this.station.s_id })
        if (this.station.s_tag == '2') {
          this.notificationWs()
        }
      })
    },
    pickStation(data) {
      this.site = data.id
      this.onSubmit()
    },
    addCommodity(num) {
      console.log(this.goods)
      addGoods({
        order_id: this.station.order_id,
        list: {
          id: this.goods.goods_id || this.goods.appoint_id,
          num: num,
          type: this.goods.type,
        },
      }).then(() => {
        this._toast('添加成功', () => {
          this.placeOrderList({ s_id: this.station.s_id })
          if (this.station.s_tag == '2') {
            this.notificationWs()
          }
          this.$refs.goodsEditor.toggle()
        })
      })
    },
    modifyCommodity(num) {
      console.log(this.goods)
      modifyGoods({ id: this.goods.id, num }).then(() => {
        this._toast('修改成功', () => {
          console.log('修改了1次')
          this.placeOrderList({ s_id: this.station.s_id })
          if (this.station.s_tag == '2') {
            this.notificationWs()
          }
          this.$refs.goodsEditor.toggle()
        })
      })
    },
    // 提交前的校验，判断是否需要选择桌台
    stationCheck() {
      let check = false
      // 如果rem里没有内容，则没有提交过，判断当前选择的内容是否需要选择桌台
      if (this.station.order_rem.length == 0) {
        this.orderList.forEach(item => {
          if (item.type == '1' && item.need_table == '1') {
            check = true
          } else if (item.type == '4') {
            item.detail.forEach(item2 => {
              if (item2.need_table == '1') {
                check = true
              }
            })
          }
        })
      }
      // 1个人 2多人 3临时，只有临时标识才需要选
      if (this.station.s_tag == '1' || this.station.s_tag == '2') {
        check = false
      }
      // 不需要选标识
      if (!check) {
        this.onSubmit()
      } else {
        // 需要选标识
        stationList({ store_id: this.station.store_id }).then(res => {
          console.log(res)
          this.stationList = res.result.map(item => {
            if (item.status == 0) {
              return {
                text: item.s_name,
                id: item.id,
              }
            } else {
              return {
                text: item.s_name + '（占用中）',
                id: item.id,
                disabled: true,
              }
            }
          })
          this.$refs.stationPicker.toggle()
        })
      }
    },
    onSubmit() {
      this.loading = true
      if (this.submitText == '结算') {
        settlementOrder({ order_id: this.station.order_id })
          .then(res => {
            this.loading = false
            if (res.errorCode != '0') {
              this.$notify({ type: 'warning', message: res.errorMsg })
            } else {
              window.location.href = res.result.url
            }
            console.log(res)
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        let params = { order_id: this.station.order_id }
        if (this.station.order_rem.length != 0 && this.station.order_rem.s_id) {
          params.s_id = this.station.order_rem.s_id
        }
        if (this.site) {
          params.s_id = this.site
        }
        commitOrder(params)
          .then(res => {
            this.loading = false
            if (res.errorCode != 0) {
              this.$dialog.alert({
                title: '提示',
                message: res.errorMsg,
              })
              return
            }
            console.log(res)
            this.$dialog
              .alert({
                title: '提示',
                message: res.result.msg,
              })
              .then(() => {
                this.placeOrderList({ s_id: this.station.s_id })
                if (this.station.s_tag == '2') {
                  this.notificationWs()
                }
                if (this.isFirst) {
                  pushStaff(
                    this.station.mer_id,
                    this.station.s_name,
                    this.station.store_id,
                    this.station.uid,
                    res.result.order_no
                  )
                }
              })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.vbbox {
  padding: 0 16px 90px 16px;
}

.package-box {
  margin-top: 15px;
  .goods-name {
    color: @color-text-regular;
  }
  & > div {
    margin-top: 4px;
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .van-row {
      margin: 10px 0;
    }
  }
}

.van-empty {
  /deep/.van-empty__image {
    width: 220px;
    height: 220px;
  }

  .van-button {
    margin-top: 40px;
  }
}

.technician-box {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  font-size: @font-size-xs;

  .van-icon {
    font-size: 18px;
    color: @primary-deep;
    margin-top: 4px;
  }
}

.green {
  .van-tag--danger {
    background: @color-success;
  }
}

.yellow {
  .van-tag--danger {
    background: @primary-deep;
  }
}

.goodsEditor {
  .title {
    margin-top: 10px;
    padding: 0 10px;
  }

  .price-box {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  .price {
    color: @primary-deep;
    margin-top: 10px;
  }

  .origin-price {
    color: @color-text-secondary;
    font-size: @font-size-xs;
    text-decoration: line-through;
  }

  .opa {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
    padding-right: 10px;

    .van-button {
      margin-left: 4px;
    }
  }
}

.loading {
  text-align: center;
  margin-top: 50%;
}

.flex {
  padding: 0 16px 100px 16px;
}
</style>
