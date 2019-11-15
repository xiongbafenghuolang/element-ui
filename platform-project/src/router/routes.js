// 正常的加载方式
const Login = () => import('@/views/login/login')
const Diagram = () => import('@/views/diagram/diagram')
const Register = () => import('@/views/register/register')


export default [
  {
    path: '/login',
    redirect: '/app'
  },
  {
    path: '/login',
    name: 'login',
    component: Login, //异步加载，懒加载
    props: true,
    // props: {
    //   id: '0000'
    // },

  },
  {
    path: '/register',
    name: 'register',
    component: Register, //异步加载，懒加载
    props: (route) => ({
      id: route.query.id
    }),
    beforeEnter: (to, from, next) => {
      window.console.log(to+ '======' + from +'app before enter')
      next()
    },
    meta: { // 保存路由里边的一些信息，有利于处理SEO
      title: 'this is Register',
      discription: 'this is Register page',
      name: '注册页面',
      icon: 'example'
    },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/diagram',
    name: 'diagram',
    component: Diagram, //异步加载，懒加载
    props: {
      id: '0000'
    },

  },
]
