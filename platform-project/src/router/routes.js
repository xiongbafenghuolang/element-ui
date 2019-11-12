// 正常的加载方式
// import Login from '../views/Login.vue'
// import Register from '../views/Register.vue'
export default [
  {
    path: '/login',
    redirect: '/app'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'), //异步加载，懒加载
    props: true,
    // props: {
    //   id: '0000'
    // },

  },
  {
    path: '/Register',
    name: 'register',
    component: () => import('../views/Register.vue'), //异步加载，懒加载
    props: (route) => ({
      id: route.query.id
    }),
    beforeEnter: (to, from, next) => {
      window.console.log(to+ '======' + from +'app before enter')
      next()
    },
    meta: { // 保存路由里边的一些信息，有利于处理SEO
      title: 'this is Register',
      discription: 'this is Register page'
    },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  }
]
