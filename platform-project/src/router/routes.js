import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
 {
   path: '/app',
   name: 'login',
   component: Login
 },
 {
  path:'/Register',
  name:'register',
  component: Register
 }
]
