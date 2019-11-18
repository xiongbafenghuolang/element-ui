/* eslint-disable no-console */
import Vue from 'vue'
import App from '@/App.vue'
import go from 'gojs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import router from '@/router' // 导入路由文件
import store from '@/store' // 导入vuex文件
import api from '@/api/api.js' // 导入api接口
import * as globalFilter from '@/filters/filters.js' //全局过滤器
import '@/icons' //svg-icon图标

Vue.config.productionTip = false

// if (process.env.NODE_ENV === 'development') {
//   require('@/mock')
// }

Vue.prototype.$go = go // 将go挂载到vue的原型上
Vue.prototype.$api = api; // 将api挂载到vue的原型上

Vue.use(ElementUI);

// 定义全局过滤器
Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key])
})

// 解决vue-router版本是3.1.0报错问题
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
