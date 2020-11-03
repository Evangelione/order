import axios from 'axios'
import qs from 'qs'

function getFormData(payload) {
  payload.ticket = localStorage.getItem('ticket')
  return qs.stringify(payload)
}

// 省列表
export const getProvinceList = payload => {
  return axios.post('/wap.php?g=Wap&c=Area&a=ajax_province', getFormData(payload))
}

// 市列表
export const getCityList = payload => {
  return axios.post('/wap.php?g=Wap&c=Area&a=ajax_city', getFormData(payload))
}

// 区列表
export const getAreaList = payload => {
  return axios.post('/wap.php?g=Wap&c=Area&a=ajax_area', getFormData(payload))
}

// 商圈列表
export const getCircleList = payload => {
  return axios.post('/wap.php?g=Wap&c=Area&a=ajax_circle', getFormData(payload))
}

// 商盟列表
export const getMarketList = payload => {
  return axios.post('/wap.php?g=Wap&c=Area&a=ajax_market', getFormData(payload))
}

// 获取用户订单内商品
export const getAreaAuth = () => {
  return axios.post('/wap.php?g=Wap&c=My&a=auth_area')
}

export const getRobotList = payload => {
  return axios.post('/wap.php?g=Wap&c=My&a=robot_list', getFormData(payload))
}
