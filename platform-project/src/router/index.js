import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'



Vue.use(VueRouter)

export const constantRoutes = routes;

const createRouter = () => new VueRouter({
  // mode: 'history', // 需要服务的支持
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
