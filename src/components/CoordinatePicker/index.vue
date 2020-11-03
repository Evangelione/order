<template>
  <van-popup position="bottom" safe-area-inset-bottom v-model="show">
    <div class="container">
      <div class="cur-adress">
        <van-search @search="_searchAddress" placeholder="请输入搜索关键词" show-action v-model="address">
          <template #action>
            <div @click="_searchAddress">搜索</div>
          </template>
          <template #left-icon>
            <van-icon name="search" />
          </template>
        </van-search>
      </div>
      <van-icon name="location" class="pointer" />
      <baidu-map
        :zoom="15"
        @ready="_mapReady"
        ak="PnrYhOtqMcvwyLsv0F0ln4hUFQ00NWMY"
        center="杭州"
        class="map"
      ></baidu-map>
      <van-row>
        <van-col span="12">
          <van-button @click="cancel" native-type="button">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_confirm" native-type="button" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </div>
  </van-popup>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

export default {
  name: '',

  mixins: [],

  components: {
    BaiduMap,
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    confirm: {
      type: Function,
      required: true,
    },
    cancel: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      lng: '',
      lat: '',
      address: '',
      map: '',
      geoc: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _mapReady({ BMap, map }) {
      // Geolocation类用于获取获取用户当前位置
      const geolocation = new BMap.Geolocation()
      // Geocoder类用于用户地址解析
      const geoc = new BMap.Geocoder()
      this.geoc = geoc
      this.map = map
      geolocation.getCurrentPosition(
        r => {
          if (geolocation.getStatus() === 0) {
            map.panTo(r.point)
            this.lng = r.point.lng
            this.lat = r.point.lat
            geoc.getLocation(r.point, rs => {
              const addComp = rs.addressComponents
              this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
            })
          } else {
            alert(`failed ${geolocation.getStatus()}`)
          }
        },
        { enableHighAccuracy: true }
      )
      // 拖拽监听并保存坐标位置
      map.addEventListener('dragend', () => {
        const point = map.getCenter()
        this.lng = point.lng
        this.lat = point.lat
        geoc.getLocation(point, rs => {
          const addComp = rs.addressComponents
          this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
        })
      })
    },
    _confirm() {
      this.confirm(this.lng, this.lat, this.address)
    },
    _searchAddress() {
      let that = this
      this.geoc.getPoint(
        that.address,
        function(point) {
          if (point) {
            that.map.centerAndZoom(point, 16)
          } else {
            alert('您选择地址没有解析到结果!')
          }
        },
        '杭州市'
      )
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .cur-adress {
    position: absolute;
    top: 15px;
    width: 90vw;
    height: 35px;
    margin: 0 5vw;
    background-color: #fff;
    border-radius: 8px;
    z-index: 999;
    justify-content: center;
    padding: 0 5px;
    box-sizing: border-box;
    align-items: center;
    box-shadow: 0 0 5px 1px #ccc;
    color: #888;

    .van-search {
      height: 100%;
      padding: 0;
      .van-search__content {
        background: #fff;
      }
    }
  }

  .pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    color: red;
    font-size: 24px;
    z-index: 999;
    transform: translate(-13px, -13px);
  }

  .map {
    flex: 1;
  }
  .van-button {
    width: 100%;
  }
}
</style>
