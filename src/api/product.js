import axios from 'axios'
import qs from 'qs'

function getFormData(payload) {
  payload.ticket = localStorage.getItem('ticket')
  return qs.stringify(payload)
}

// const { protocol } = window.location

// let url = 'go.9youke.com/robot'
// if (process.env.VUE_APP_ENV == 'prod') {
//     url = 'go.91gzt.com/robot'
// }

// 获取用户订单内商品
export const getGoodsInfo = payload => axios.post('/wap.php?g=Wap&c=ScanOrder&a=commodityScan', getFormData(payload))

export const payGoods = payload => axios.post('/wap.php?g=Wap&c=ScanOrder&a=savePromotionOrder', getFormData(payload))
