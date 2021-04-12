import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'

const state = {
  userInfo: null
}

export default createStore({
  getters: {}, 
  state,
  actions,
  mutations,
  modules: {}
})
