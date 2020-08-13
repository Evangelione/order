<template>
  <div>
    <van-uploader :after-read="afterRead" :before-read="beforeRead" @delete="handleDelete" v-model="fileList" />
    <VPopup height="100vh" ref="popup">
      <vue-cropper
        :canMove="false"
        :canScale="true"
        :fixed="true"
        :img="base64"
        autoCrop
        autoCropHeight="500"
        autoCropWidth="500"
        centerBox
        ref="cropper"
      ></vue-cropper>
      <template #footer>
        <van-row class="btn-group" gutter="1">
          <van-col span="12">
            <van-button @click="cancelCrop">取消</van-button>
          </van-col>
          <van-col span="12">
            <v-button :promise="cropper">裁剪</v-button>
          </van-col>
        </van-row>
      </template>
    </VPopup>
  </div>
</template>

<script>
import commonApi from '@/api/common'
import Compressor from 'compressorjs'
import VPopup from '@/components/VPopup'
import VButton from '@/components/VButton'
import { VueCropper } from 'vue-cropper'
export default {
  name: 'ImageCropper',

  mixins: [],

  components: {
    VPopup,
    VueCropper,
    VButton,
  },

  model: {
    prop: 'value',
    event: 'valueChange',
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fileList: [],
      visible: false,
      base64: '',
      file: null,
      detail: null,
    }
  },

  computed: {},

  watch: {
    value() {
      this.fileList = this.value
    },
  },

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    beforeRead(file) {
      console.log(file)
      return true
    },
    afterRead(file, detail) {
      file.status = 'uploading'
      file.message = '上传中...'
      this.base64 = file.content
      this.file = file
      this.detail = detail
      this.$refs.popup.toggle()
    },
    handleDelete() {
      this.$emit('valueChange', this.fileList)
    },
    cancelCrop() {
      this.fileList = this.value
      this.$refs.popup.toggle()
    },
    cropper() {
      return new Promise((resolve, reject) => {
        this.$refs.cropper.getCropBlob(blob => {
          new Compressor(blob, {
            quality: 0.5,
            success: result => {
              const reader = new window.FileReader()
              reader.readAsDataURL(result)
              reader.onloadend = () => {
                // Send the compressed image file to server with XMLHttpRequest.
                commonApi
                  .uploadImage({
                    imgBase: reader.result,
                  })
                  .then(response => {
                    if (response.error === 0) {
                      console.log(response)
                      this.file.status = 'done'
                      this.file.message = '上传成功'
                      this.fileList[this.detail.index].url = response.msg
                      this.fileList[this.detail.index].content = reader.result
                      this.$emit('valueChange', this.fileList)
                      this.$refs.popup.toggle()
                    }
                    resolve()
                  })
                  .catch(e => {
                    console.log(e)
                    this.file.status = 'failed'
                    this.file.message = '上传失败'
                    this.$emit('valueChange', this.fileList)
                    this.$refs.popup.toggle()
                    reject()
                  })
              }
            },
            error: err => {
              alert(`压缩错误：${err}`)
              reject()
            },
          })
        })
      })
    },
  },
}
</script>

<style lang="less">
.btn-group {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .van-button {
    width: 100%;
  }
}
</style>
