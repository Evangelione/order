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
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </template>
  </base-layout>
</template>

<script>
import api from '@/api/login'
import BaseLayout from '@/components/BaseLayout'
import SinglePicker from '@/components/SinglePicker'
import VButton from '@/components/VButton'
import ImageCropper from '@/components/ImageCropper'

export default {
  name: 'Index',
  mixins: [],

  components: {
    BaseLayout,
    SinglePicker,
    VButton,
    ImageCropper,
  },

  props: {},

  data() {
    return {
      title: '测试',
      col: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      active: 0,
      uploader: [],
      img: '',
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
      return new Promise(resolve => {
        this.$http.post(api.login).then(response => {
          console.log(response.data)
          resolve()
          this._toast('获取成功')
        })
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

<style lang="less" scoped></style>
