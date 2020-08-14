import Vue from 'vue'
import Vuex from 'vuex'
import order from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    order,
  },
})
