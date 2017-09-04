import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import common from './common/mutations'
import micropage from './micropage/mutations'

export default new Vuex.Store({
  modules: {
    common,
    micropage
  }
})
