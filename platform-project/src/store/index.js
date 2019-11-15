
import Vuex from 'vuex'
import defaultState  from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
// export default store
export default () => {
  const store =  new Vuex.Store({
    strict: isDev, //禁止在外部修改state值，建议在开发环境中使用。不建议在生产环境下使用
    state: defaultState,
    mutations,
    getters,
    actions,
    // plugins:[
    //   (store) => {
    //     window.console.log('my plugin invoked' + store)
    //   }
    // ],
    modules: {
      a: {
        namespaced: true, //默认vuex将mutatios挂载到全局上。强制增加命名空间，可以书写相同的mutaitons
        state: {
          text: 1
        },
        mutations: {
          updateText(state,text) {
            // window.console.log('a.state',state);
            state.text = text
          }
        },
        getters: {
          textPlus(state,getters,rootState) { //state为当前命名空间内的state,getters为全部getters,rootState为全局下的state
            return state.text + rootState.b.text
          }
        },
        actions: {
          // eslint-disable-next-line no-unused-vars
          add({state, commit, rootState}) {
            // window.console.log(state)
            // commit('updateText',rootState.count); //当前区间找
            commit('updateCount',{num:56789},{root: true}); //全局找mutation
          }
        }
      },
      b: {
        namespaced:true,
        state: {
          text: 20
        },
        actions: {
          textAction ({commit}) {
            commit('a/updateText','test text lalalalla',{root: true})
          }
        }
      }
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
