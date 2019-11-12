/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import go from 'gojs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import createRouter from './router' // 导入路由文件
import creatStore from './store' // 导入vuex文件
import api from './request/api.js' // 导入api接口


Vue.config.productionTip = false


Vue.prototype.$go = go // 将go挂载到vue的原型上
Vue.prototype.$api = api; // 将api挂载到vue的原型上


Vue.use(Vuex)
Vue.use(ElementUI);

const store = creatStore()
const router = createRouter()

// vuex新增模块
store.registerModule('c', {
  state: {
    text: 333333333333333
  }
})
// 解绑vuex模块
// store.unregisterModule('c');

// watch
// store.watch((state) => state.count+1, (newCount)=> {
//  window.console.log('new count watched',newCount)
// })

// eslint-disable-next-line no-unused-vars
store.subscribe((mutation, state) => {
  window.console.log(mutation.type)
  window.console.log(mutation.payload)
})

// eslint-disable-next-line no-unused-vars
store.subscribeAction((action, state) => {
  window.console.log(action.type)
  window.console.log(action.payload)
})


 // 路由守卫
 router.beforeEach((to,from,next) => {
  window.console.log(to +  '======' + from)
  window.console.log('before each invoked')
  next()
  // if(to.fullPath === '/app') {
  //   next({path: '/login'})
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  window.console.log(to +  '======' + from)
  window.console.log('before resolve invoked')
  next()
})

router.afterEach( (to, from) => {
  window.console.log('after invoked'+ to)
  window.console.log('after invoked' + from)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
