import axios from 'axios'
import qs from 'qs'

function getFormData(payload) {
  let formData = new FormData()
  for (let item in payload) {
    formData.append(item, payload[item])
  }
  formData.append('ticket', 'jZLb-4wZur9Ug2k7OMpxLE0mx_gIKe3d')
  return formData
}

export default {
  // 获取用户订单内商品
  placeOrderList: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=placeOrderList', formData)
  },
  // 获取技师列表
  technicianList: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=wap&c=ScanOrder&a=getFreeServiceWorker', formData)
  },
  // 指定技师
  appointTechnician: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=remStaff', formData)
  },
  // 获取标识列表
  stationList: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=wap&c=ScanOrder&a=getFreeStation', formData)
  },
  // 修改商品数量
  modifyGoods: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=changeOrder', formData)
  },
  // 添加商品
  addGoods: payload => {
    let formData = new FormData()
    formData.append('order_id', payload.order_id)
    for (let item in payload.list) {
      formData.append(`list[${item}]`, payload.list[item])
    }
    formData.append('ticket', 'jZLb-4wZur9Ug2k7OMpxLE0mx_gIKe3d')
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=placeOrderAdd', formData)
  },
  // 结算订单
  settlementOrder: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=payOrder', formData)
  },
  // 提交订单
  commitOrder: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=wap&c=ScanOrder&a=order', formData)
  },
  // ws通知
  notificationWs: ({ sid, uid }) => {
    return axios.get(`http://127.0.0.1:8906/ws/update/${sid}/${uid}`)
  },
  pushStaff: () => {
    return
  },
  // 推荐商品
  recommendGoods: payload => {
    let formData = new FormData()
    formData.append('store_id', payload.store_id)
    payload.goods_ids.forEach((item, index) => {
      formData.append(`goods_ids[${index}]`, item)
    })
    payload.service_ids.forEach((item, index) => {
      formData.append(`service_ids[${index}]`, item)
    })

    formData.append('ticket', 'jZLb-4wZur9Ug2k7OMpxLE0mx_gIKe3d')
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=orderRecommend', formData)
  },
  // 获取零售商品列表
  retailGoodsList: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=getGoodsListNew', formData)
  },
  // 获取服务商品列表
  serviceGoodsList: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=getProjectListNew', formData)
  },
  // 获取套餐商品列表
  packageGoodsList: payload => {
    let formData = getFormData(payload)
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=getPackageListNew', formData)
  },
  // 商品加入购物车
  addGoodsList: payload => {
    let formData = qs.stringify({ ...payload, ...{ ticket: 'jZLb-4wZur9Ug2k7OMpxLE0mx_gIKe3d' } })
    return axios.post('/wap.php?g=Wap&c=ScanOrder&a=placeOrder', formData)
  },
}
