<template>
  <div class="box">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img v-lazy="data.pic1" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell :title="data.imax_name" :label="data.address">
        <div>
          <div>{{ data.imax_status_name }}</div>
          <van-icon name="delete" class="del-icon" @click="deleteArea" />
        </div>
      </van-cell>
      <van-cell class="small">
        <template #title>
          <div>
            {{ data.contact }} -
            <a :href="`tel:${data.tel}`" class="tel">{{ data.tel }}</a>
          </div>
        </template>
        <template #label>
          <van-row>
            <van-col span="8">客流量</van-col>
            <van-col span="8">本月累计：{{ data.month_people }}</van-col>
            <van-col span="8">上月累计：{{ data.last_month_people }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">浏览次数</van-col>
            <van-col span="8">本月累计：{{ data.month_play }}</van-col>
            <van-col span="8">上月累计：{{ data.last_month_play }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">扫码次数</van-col>
            <van-col span="8">本月累计：{{ data.month_scan }}</van-col>
            <van-col span="8">上月累计：{{ data.last_month_scan }}</van-col>
          </van-row>
        </template>
      </van-cell>
      <div class="opa">
        <van-button size="small" type="primary" @click="modityArea">修改</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'AreaItem',

  mixins: [],

  components: {},

  props: {
    data: {
      type: Object,
      required: true,
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
    modityArea() {
      console.log(11)
    },
    deleteArea() {
      this.$dialog
        .confirm({
          title: '删除地区',
          message: '删除后数据无法恢复，是否删除？',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  margin: 4px 0 6px 0;
  box-shadow: 0 1px 5px #000;
}
.van-swipe-item {
  color: #fff;
  font-size: 0;
  text-align: center;
}

img {
  width: 100%;
  height: 100%;
}

.small {
  font-size: 12px;
  color: @color-text-regular;
}

.tel {
  text-decoration: underline;
  color: @color-text-regular;
}

.van-row {
  margin-top: 4px;
}

.del-icon {
  color: @color-danger;
}

.opa {
  text-align: right;
  padding: 8px 14px;
}
</style>
