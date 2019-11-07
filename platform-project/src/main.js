import Vue from 'vue'
import router from './router' // 导入路由文件
import App from './App.vue'
import store from './store' // 导入vuex文件
import api from './request/api.js' // 导入api接口
import go from 'gojs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.prototype.$go = go // 将go挂载到vue的原型上
Vue.prototype.$api = api; // 将api挂载到vue的原型上

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
