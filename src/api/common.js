import axios from 'axios'

export default {
  // 上传图片到oss
  uploadImage: payload =>
    axios.post(`/appapi.php?c=Merchantapp&a=base64change`, {
      ...payload,
      ticket: localStorage.getItem(process.env.VUE_APP_TOKEN),
    }),
}
