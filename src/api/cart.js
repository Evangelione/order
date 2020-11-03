import axios from 'axios'
import qs from 'qs'

function getFormData(payload) {
  payload.ticket = localStorage.getItem('ticket')
  return qs.stringify(payload)
}

const { protocol } = window.location

let url = 'go.9youke.com/robot'
if (process.env.VUE_APP_ENV == 'prod') {
  url = 'go.91gzt.com/robot'
}

// 获取用户订单内商品
export const placeOrderList = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=placeOrderList', getFormData(payload))
}
// 获取技师列表
export const technicianList = payload => {
  return axios.post('/wap.php?g=wap&c=ScanOrder&a=getFreeServiceWorker', getFormData(payload))
}
// 指定技师
export const appointTechnician = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=remStaff', getFormData(payload))
}
// 获取标识列表
export const stationList = payload => {
  return axios.post('/wap.php?g=wap&c=ScanOrder&a=getFreeStation', getFormData(payload))
}
// 修改商品数量
export const modifyGoods = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=changeOrder', getFormData(payload))
}
// 添加商品
export const addGoods = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=placeOrderAdd', getFormData(payload))
}
// 结算订单
export const settlementOrder = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=payOrder', getFormData(payload))
}
// 提交订单
export const commitOrder = payload => {
  return axios.post('/wap.php?g=wap&c=ScanOrder&a=order', getFormData(payload))
}

// // ws通知(除了自己)
// export const notificationWs = ({ sid, uid }) => {
//   return axios.get(`${protocol}//${url}/ws/update/${sid}/${uid}`)
// }

// // ws通知(只有自己)
// export const notificationWsUid = ({ sid, uid }) => {
//   return axios.get(`${protocol}//${url}/ws/updateUid/${sid}/${uid}`)
// }

export const pushStaff = (mer_id, s_name, store_id, uid, order_no) => {
  return axios.post(`${protocol}//${url}/staff/orderNotice`, {
    mer_id,
    s_name,
    store_id,
    uid,
    order_no,
  })
}
// 推荐商品
export const recommendGoods = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=orderRecommend', getFormData(payload))
}
// 获取零售商品列表
export const retailGoodsList = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=getGoodsListNew', getFormData(payload))
}
// 获取服务商品列表
export const serviceGoodsList = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=getProjectListNew', getFormData(payload))
}
// 获取套餐商品列表
export const packageGoodsList = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=getPackageListNew', getFormData(payload))
}
// 商品加入购物车
export const addGoodsList = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=placeOrder', getFormData(payload))
}
// 用户绑定订单
export const bindOrder = payload => {
  return axios.post('/wap.php?g=Wap&c=ScanOrder&a=scanImaxOrder', getFormData(payload))
}
