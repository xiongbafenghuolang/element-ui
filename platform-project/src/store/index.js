
import Vue from 'vue'
import Vuex from 'vuex'
import defaultState  from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex)
// export default store
export default () => {
  const store =  new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      app,
      settings
    }
  })
  // vue新增热更替功能
  if(module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ],() => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }

  return store
}
