import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default () => {
  return new VueRouter({
    routes: routes,
    mode: 'history',
    base: '/',
    linkActiveClass: 'active-link', //自定义全局样式，部分匹配
    linkExactActiveClass: 'extract-active-link', //自定义全局样式，全局匹配
    // scrollBehavior(to,from,savedPosition) {
    //   if(savedPosition) {
    //     return savedPosition;
    //   } else {
    //     return {x:0,y:0}
    //   }
    // },
    // fallback: true,
    // parseQuery(query) {
    //   // 将字符串转换为对象
    // },
    // stringifyQuery(obj) {
    //   //将对象转换为字符串
    // }
  })
}
