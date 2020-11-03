<template>
  <div class="container">
    <van-nav-bar left-text="返回" right-text="保存" left-arrow />
    <div class="flex">
      <van-form>
        <van-field readonly clickable value="" name="province" placeholder="点击选择省份" label="省份" />
        <van-field readonly clickable value="" name="province" placeholder="点击选择市" label="市" />
        <van-field readonly clickable value="" name="province" placeholder="点击选择区" label="区" />
        <van-field readonly clickable value="" name="province" placeholder="点击选择商圈" label="商圈" />
        <van-field readonly clickable value="" name="province" placeholder="点击选择商盟" label="商盟" />
        <van-field v-model="form.address" label="详细地址" placeholder="请输入详细地址" />
        <van-field
          readonly
          clickable
          value=""
          name="province"
          placeholder="点击拾取坐标"
          label="坐标选取"
          @click="showCoordinatePicker = true"
        />
        <van-field v-model="form.contact" name="contact" label="联系人" placeholder="请输入联系人" />
        <van-field v-model="form.tel" name="tel" label="联系电话" placeholder="请输入联系电话" />
        <van-field name="pic1" label="外立面">
          <template #input>
            <image-cropper-php :after-read="afterRead1" />
          </template>
        </van-field>
        <van-field name="pic2" label="环境图1">
          <template #input>
            <image-cropper-php :after-read="afterRead2" />
          </template>
        </van-field>
        <van-field name="pic3" label="环境图2">
          <template #input>
            <image-cropper-php :after-read="afterRead3" />
          </template>
        </van-field>
        <van-field name="pic4" label="环境图3">
          <template #input>
            <image-cropper-php :after-read="afterRead4" />
          </template>
        </van-field>
        <van-field name="pic5" label="屏位置">
          <template #input>
            <image-cropper-php :after-read="afterRead5" />
          </template>
        </van-field>
      </van-form>
      <single-picker :col="provinceList" @confirm="pickProvince" ref="provincePicker" />
      <single-picker :col="cityList" @confirm="pickCity" ref="cityPicker" />
      <single-picker :col="areaList" @confirm="pickArea" ref="areaPicker" />
      <single-picker :col="circleList" @confirm="pickCircle" ref="circlePicker" />
      <single-picker :col="marketList" @confirm="pickMarket" ref="marketPicker" />
      <coordinate-picker :cancel="hideCoordinatePicker" :confirm="pickCoordinate" :show="showCoordinatePicker" />
    </div>
  </div>
</template>

<script>
import CoordinatePicker from '@/components/CoordinatePicker'
export default {
  name: 'AreaCRUD',

  mixins: [],

  components: {
    CoordinatePicker,
  },

  props: {},

  data() {
    return {
      showCoordinatePicker: false,
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
      provinceList: [],
      cityList: [],
      areaList: [],
      circleList: [],
      marketList: [],
      form: {
        province: '',
        city: '',
        area: '',
        circle: '',
        market: '',
        address: '',
        contact: '',
        tel: '',
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: '',
        pic5: '',
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    hideCoordinatePicker() {
      this.showCoordinatePicker = false
    },
    pickCoordinate() {},
    afterRead1(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      this.img1 = file.content
      return true
    },
    afterRead2(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      this.img2 = file.content
      return true
    },
    afterRead3(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      this.img3 = file.content
      return true
    },
    afterRead4(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      this.img4 = file.content
      return true
    },
    afterRead5(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      this.img5 = file.content
      return true
    },
    pickProvince() {},
    pickCity() {},
    pickArea() {},
    pickCircle() {},
    pickMarket() {},
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .flex {
    flex: 1;
    overflow: scroll;
  }
}
</style>
