import axios from 'axios'
import qs from 'qs'

// 获取logo
const getLogo = () => axios.get('/xcxapi.php?c=Config&a=get_bgimage&type=login_bgimg_wx_staff')

// 获取短信验证码
const smsCode = payload => {
  let formData = qs.stringify({ ...payload, ...{ source: 'scan' } })
  return axios.post('/wap.php?g=Wap&c=Login&a=SmsCodeverify', formData)
}

// 登录
const login = payload => {
  let formData = qs.stringify({ ...payload })
  return axios.post('/wap.php?g=Wap&c=Login&a=login_scan', formData)
}

// 注册
const registerAcc = payload => {
  let formData = qs.stringify({ ...payload })
  return axios.post('/wap.php?g=Wap&c=Login&a=verifyReg', formData)
}

// 上传图片到oss
const uploadImage = payload =>
  axios.post(`/appapi.php?c=Merchantapp&a=base64change`, {
    ...payload,
    ticket: localStorage.getItem(process.env.VUE_APP_TOKEN),
  })

export { getLogo, smsCode, login, registerAcc, uploadImage }
