import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  constantR,
  asyncR
} from './routes'

Vue.use(VueRouter)

/**
 * constantRoutes
 * 没有权限的基本页面
 * 所有角色可以访问
 */

export const constantRoutes = constantR;

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = asyncR;

const createRouter = () => new VueRouter({
  // mode: 'history', // 需要服务的支持
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
