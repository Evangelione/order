<template>
  <base-layout header="测试">
    <van-button @click="togglePopup">打开picker</van-button>
    <v-button :promise="confrim">按钮</v-button>
    <single-picker :col="col" @confirm="pickCol" ref="col" />

    <van-tabs animated swipeable v-model="active">
      <van-tab title="标签 1">
        <van-form @submit="onSubmit">
          <van-field :rules="[{ required: true, message: '请上传文件' }]" label="文件上传" name="uploader">
            <template #input>
              <image-cropper :after-read="afterRead" v-model="uploader" />
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button block native-type="submit" round type="primary">提交</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>

    <template #footer>
      <van-tabbar :fixed="false" v-model="active">
        <van-tabbar-item>
          首页
          <template #icon="props">
            <img :src="props.active ? icons.home.active : icons.home.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          发现
          <template #icon="props">
            <img :src="props.active ? icons.find.active : icons.find.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          订单
          <template #icon="props">
            <img :src="props.active ? icons.order.active : icons.order.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          我的
          <template #icon="props">
            <img :src="props.active ? icons.mine.active : icons.mine.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </template>
  </base-layout>
</template>

<script>
export default {
  name: 'Index',
  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      title: '测试',
      col: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      active: 0,
      uploader: [],
      img: '',
      icons: {
        home: {
          active: require('@/assets/images/home-active.png'),
          inactive: require('@/assets/images/home.png'),
        },
        find: {
          active: require('@/assets/images/find-active.png'),
          inactive: require('@/assets/images/find.png'),
        },
        order: {
          active: require('@/assets/images/order-active.png'),
          inactive: require('@/assets/images/order.png'),
        },
        mine: {
          active: require('@/assets/images/mine-active.png'),
          inactive: require('@/assets/images/mine.png'),
        },
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    togglePopup() {
      this.$refs.col.toggle()
    },
    pickCol(data) {
      console.log(data)
    },
    confrim() {
      return new Promise(() => {
        // this.$http.post(api.login).then(response => {
        //   console.log(response.data)
        //   resolve()
        //   this._toast('获取成功')
        // })
      })
    },
    afterRead(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      this.img = file.content
      return true
    },
    onSubmit(values) {
      console.log(values)
      console.log(this.uploader)
    },
  },
}
</script>

<style lang="less" scoped>
.van-tabbar-item__icon img {
  height: 24px;
}
</style>
