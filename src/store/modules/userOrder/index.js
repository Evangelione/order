import UserOrderApi from '@/api/user_order'
import router from '@/router'
import { SET_STATION, SET_ORDER_LIST, SET_WS, SET_RECOMMEND_LIST } from './types'
// initial state
const state = {
  ws: null,
  station: {},
  orderList: [],
  recommendList: [],
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
    console.log(total)
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
  connWs({ commit, state, dispatch }) {
    const ws = new WebSocket(`ws://192.168.110.174:8906/ws/conn/${state.station.s_id}/${state.station.uid}`)
    //连接打开时触发
    ws.onopen = function() {
      console.log('Connection open ...')
      // ws.send("ping")
    }
    //接收到消息时触发
    ws.onmessage = evt => {
      console.log('Received Message: ' + evt.data)
      const data = JSON.parse(evt.data)
      if (data.action === 'update') {
        dispatch('placeOrderList', { s_id: state.station.s_id })
      }
    }
    //连接关闭时触发
    ws.onclose = function() {
      console.log('Connection closed.')
    }
    commit(SET_WS, ws)
  },
  placeOrderList({ commit, state, dispatch }, payload) {
    UserOrderApi.placeOrderList(payload).then(res => {
      console.log(res)
      commit(SET_STATION, res.result.info)
      commit(SET_ORDER_LIST, res.result.list)
      if (!state.ws) {
        dispatch('connWs')
      }
      router.getMatchedComponents().forEach(item => {
        console.log(item)
        switch (item.name) {
          case 'PlaceOrder':
            dispatch('recommendGoods')
            break
        }
      })
    })
  },
  recommendGoods({ state, commit, getters }) {
    console.log(Array.from(getters.goodsSet))
    UserOrderApi.recommendGoods({
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
          if (r[j]) {
            arr.push(r[j])
          }
        }
        result.push(arr)
      }
      commit(SET_RECOMMEND_LIST, result)
    })
  },
  notificationWs({ state }) {
    UserOrderApi.notificationWs({
      sid: state.station.s_id,
      uid: state.station.uid,
    })
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
