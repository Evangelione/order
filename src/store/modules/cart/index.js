import { placeOrderList, recommendGoods } from '@/api/cart'
import router from '@/router'
import {
  SET_STATION,
  SET_ORDER_LIST,
  SET_WS,
  SET_RECOMMEND_LIST,
  START_TIMER,
  RESET_TIMER,
  CLEAR_TIMER,
  CHANGE_LOADING,
} from './types'
// initial state
const state = {
  ws: null,
  station: {},
  orderList: [],
  recommendList: [],
  timer: null,
  heartTime: 55000,
  listLoading: false,
}

// getters
const getters = {
  totalPrice: state => {
    let total = 0
    state.orderList.forEach(item => {
      total += item.pay_price * 100 * item.goods_num
      if (item.type == '1') {
        if (item.supply) {
          item.supply.forEach(ii => {
            total += ii.service_fee * 100
          })
        } else if (
          item.need_service_personnel == '1' &&
          item.remark_service_personnel != '0' &&
          item.remark_service_personnel_price
        ) {
          total += item.remark_service_personnel_price * 100
        }
      } else if (item.type == '4') {
        item.detail.forEach(i => {
          if (i.supply) {
            i.supply.forEach(ii => {
              total += ii.service_fee * 100
            })
          } else if (
            i.type == '1' &&
            i.need_service_personnel == '1' &&
            i.remark_service_personnel != '0' &&
            i.remark_service_personnel_price
          ) {
            total += i.remark_service_personnel_price * 100
          }
        })
      }
    })
    return total
  },
  goodsSet: state => {
    let goodsSet = new Set()
    state.orderList.forEach(item => {
      if (item.type === '2') {
        goodsSet.add(item.goods_appoint_id)
      } else if (item.type === '4') {
        item.detail.forEach(item2 => {
          if (item2.type === '2') {
            goodsSet.add(item2.goods_appoint_id)
          }
        })
      }
    })
    return goodsSet
  },
  serviceSet: state => {
    let serviceSet = new Set()
    state.orderList.forEach(item => {
      if (item.type === '1') {
        serviceSet.add(item.goods_appoint_id)
      } else if (item.type === '4') {
        item.detail.forEach(item2 => {
          if (item2.type === '1') {
            serviceSet.add(item2.goods_appoint_id)
          }
        })
      }
    })
    return serviceSet
  },
}

// actions
const actions = {
  connWs({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      let url = 'go.9youke.com'
      if (process.env.VUE_APP_ENV == 'prod') {
        url = 'go.91gzt.com'
      }
      if (!payload.uid) {
        reject()
        return
      }
      const ws = new WebSocket(`wss://${url}/v2/ws/conn/${payload.s_id}/${payload.uid}`)
      //连接打开时触发
      ws.onopen = function() {
        if (payload.socket) {
          ws.send(`{
            "action": "update_order"
          }`)
          if (payload.socket != payload.s_id) {
            ws.send(`{
              "action": "update_order_sid",
              "data": ${payload.socket}
            }`)
          }
        }
        console.log('Connection open ...')
        // ws.send("ping")
        commit(START_TIMER)
        resolve(ws)
      }
      //接收到消息时触发
      ws.onmessage = evt => {
        console.log('Received Message: ' + evt.data)
        const data = JSON.parse(evt.data)
        commit(RESET_TIMER)
        if (data.action === 'update') {
          dispatch('placeOrderList', { s_id: state.station.s_id })
        }
      }
      //连接关闭时触发
      ws.onclose = function() {
        commit(CLEAR_TIMER)
        console.log('Connection closed.')
      }
      commit(SET_WS, ws)
    })
    // let protocol = 'wss:'
    // if (window.location.protocol == 'https:') {
    //   protocol = 'wss:'
    // }
  },
  placeOrderList({ commit, dispatch }, payload) {
    commit(CHANGE_LOADING, true)
    placeOrderList(payload)
      .then(res => {
        commit(CHANGE_LOADING, false)
        if (res.result.action === 'go_back') {
          router.replace(`/cart/${res.result.s_id}`)
          dispatch('placeOrderList', { s_id: res.result.s_id })
          return
        }
        commit(SET_STATION, res.result.info)
        commit(SET_ORDER_LIST, res.result.list)
        if (!state.ws && state.station.uid) {
          dispatch('connWs', { s_id: res.result.info.s_id, uid: res.result.info.uid }).then(res => {
            console.log(res)
          })
        }
        router.getMatchedComponents().forEach(item => {
          switch (item.name) {
            case 'PlaceOrder':
              dispatch('recommendGoods')
              break
          }
        })
      })
      .catch(() => {
        commit(CHANGE_LOADING, false)
      })
  },
  recommendGoods({ state, commit, getters }) {
    recommendGoods({
      goods_ids: Array.from(getters.goodsSet),
      service_ids: Array.from(getters.serviceSet),
      store_id: state.station.store_id,
    }).then(res => {
      let r = [
        ...res.result.goods.map(item => {
          item.type = '2'
          item.add = true
          return item
        }),
        ...res.result.service.map(item => {
          item.type = '1'
          item.add = true
          return item
        }),
      ]
      let total = r.length
      let result = []
      for (let i = 0; i < Math.ceil(total / 4); i++) {
        let arr = []
        for (let j = 0; j < 4; j++) {
          if (r[i * 4 + j]) {
            arr.push(r[i * 4 + j])
          }
        }
        result.push(arr)
      }
      commit(SET_RECOMMEND_LIST, result)
    })
  },
  notificationWs({ state }) {
    state.ws.send(`{
      "action": "update_order"
    }`)
    // notificationWs({
    //   sid: state.station.s_id,
    //   uid: state.station.uid,
    // })
  },
}

// mutations
const mutations = {
  [SET_STATION](state, payload) {
    state.station = payload
  },
  [SET_ORDER_LIST](state, payload) {
    state.orderList = payload
  },
  [SET_WS](state, payload) {
    state.ws = payload
  },
  [SET_RECOMMEND_LIST](state, payload) {
    state.recommendList = payload
  },
  [START_TIMER](state) {
    state.timer = setInterval(() => {
      if (state.ws.readyState == 1) {
        console.log('连接状态，发送消息保持连接')
        state.ws.send(`{
          "action": "Ping"
        }`)
        this.commit('order/RESET_TIMER') // 如果获取到消息，说明连接是正常的，重置心跳检测
      } else {
        console.log('断开状态，尝试重连')
        // newWebSocket()
      }
    }, state.heartTime)
  },
  [RESET_TIMER](state) {
    clearTimeout(state.timer)
    this.commit('order/START_TIMER')
  },
  [CLEAR_TIMER](state) {
    clearTimeout(state.timer)
  },
  [CHANGE_LOADING](state, payload) {
    state.listLoading = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
