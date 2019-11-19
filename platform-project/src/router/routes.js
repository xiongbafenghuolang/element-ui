const Login = () => import('@/views/login/login')
const NotFound = () => import('@/views/error-page/404')
const Forbidden = () => import('@/views/error-page/401')
const Layout = () => import('@/layout/index')
const Home = () => import('@/views/home/index')
const Diagram = () => import('@/views/diagram/diagram')

/**
 * constantR
 * 没有权限的基本页面
 * 所有角色可以访问
 */

const constantR = [{
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    hidden: true
  },
  {
    path: '/401',
    component: Forbidden,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }]
  },
  {
    path: '/diagram',
    component: Layout,
    children: [{
      path: 'index',
      name: 'diagram',
      component: Diagram,
      meta: {
        title: 'diagram',
        icon: 'form'
      }
    }]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: 'Menu1'
        },
        children: [{
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: 'Menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: 'Menu1-2'
            },
            children: [{
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'Menu1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'Menu1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: 'Menu1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: 'menu2'
        }
      }
    ]
  },
  {
    path: '/error-page',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    alwaysShow: true,
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [{
      path: '401',
      component: NotFound,
      name: 'Page401',
      meta: {
        title: '401',
        noCache: true
      }
    }]
  },
  // 404 页面必须放置在末尾
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * asyncR
 * 需要根据用户角色动态加载的路由
 */
const asyncR = [

]

export {
  constantR,
  asyncR
}
