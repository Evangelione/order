<template>
  <div class="container">
    <van-nav-bar
      title="区域管理"
      left-text="返回"
      right-text="创建地址"
      left-arrow
      @click-right="goCRUD"
      @click-left="router.go(-1)"
    />
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="changeArea" />
      <van-dropdown-item v-model="value2" :options="option2" @change="changeCircle" />
      <van-dropdown-item v-model="value3" :options="option3" @change="changeMarket" />
    </van-dropdown-menu>
    <div class="flex">
      <AreaItem v-for="(item, index) in list" :key="index" :data="item" />
    </div>
  </div>
</template>

<script>
import { getAreaAuth, getAreaList, getCircleList, getMarketList, getRobotList } from '@/api/copartner'
import AreaItem from './components/AreaItem'
export default {
  name: 'AreaManager',

  mixins: [],

  components: {
    AreaItem,
  },

  props: {},

  data() {
    return {
      value1: '0',
      value2: '0',
      value3: '0',
      option1: [{ text: '全部区', value: '0' }],
      option2: [{ text: '全部商圈', value: '0' }],
      option3: [{ text: '全部商盟', value: '0' }],
      list: [],
      auth: {},
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    getAreaAuth().then(res => {
      console.log(res)
      if (res.code == 0) {
        if (res.datas.area_type == 2) {
          this.auth = res.datas
          this.getArea({ id: res.datas.area_id, name: res.datas.area_name })
          this.getCircle({
            id: 0,
            name: '全部区',
          })
          this.getMarket({
            id: 0,
            name: '全部商圈',
          })
          this.getRobotList({
            id: res.datas.area_id,
            type: 2,
          })
        }
      }
    })
  },

  destroyed() {},

  methods: {
    getArea(data) {
      getAreaList({
        id: data.id,
        name: data.name,
      }).then(res => {
        if (res.error == 0) {
          this.option1 = [{ text: '全部区', value: '0' }]
          res.list.forEach(item => {
            this.option1.push({ text: item.name, value: item.id })
          })
        }
      })
    },
    getCircle(data) {
      getCircleList({
        id: data.id,
        name: data.name,
      }).then(res => {
        console.log(res)
        this.option2 = [{ text: '全部商圈', value: '0' }]
        if (res.error == 0) {
          res.list.forEach(item => {
            this.option2.push({ text: item.name, value: item.id })
          })
        }
      })
    },
    getMarket(data) {
      getMarketList({
        id: data.id,
        name: data.name,
      }).then(res => {
        console.log(res)
        this.option3 = [{ text: '全部商盟', value: '0' }]
        if (res.error == 0) {
          res.list.forEach(item => {
            this.option3.push({ text: item.name, value: item.id })
          })
        }
      })
    },
    getRobotList(data) {
      getRobotList({
        area_id: data.id,
        area_type: data.type,
      }).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.list = res.datas
        }
      })
    },
    changeArea(value) {
      console.log(value)
      this.getCircle({ id: value, name: '' })
      if (value == 0) {
        this.getRobotList({
          id: this.auth.area_id,
          type: 2,
        })
      } else {
        this.getRobotList({
          id: value,
          type: 3,
        })
      }
    },
    changeCircle(value) {
      console.log(value)
      this.getMarket({ id: value, name: '' })
      if (value == 0) {
        this.getRobotList({
          id: this.value1,
          type: 3,
        })
      } else {
        this.getRobotList({
          id: value,
          type: 4,
        })
      }
    },
    changeMarket(value) {
      console.log(value)
      if (value == 0) {
        this.getRobotList({
          id: this.value2,
          type: 4,
        })
      } else {
        this.getRobotList({
          id: value,
          type: 5,
        })
      }
    },
    goCRUD() {
      this.$router.push({
        path: '/copartner/crud',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .flex {
    margin-top: 2px;
    flex: 1;
    overflow: scroll;
  }
}

.van-panel__content {
  padding: 10px 16px;
}
</style>
