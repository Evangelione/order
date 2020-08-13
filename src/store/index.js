import Vue from 'vue'
import Vuex from 'vuex'
import userOrder from './modules/userOrder'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userOrder,
  },
})
