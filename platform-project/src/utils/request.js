import axios from 'axios' //Axios 是一个基于 promise 的 HTTP 库
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 *
 * */
const errorHandle = (status, msg) => {
    // 状态码判断
    switch (status) {
       // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
            break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
            break;
        // 404请求不存在
        case 404:
        Message.error('找不到请求路径')
            break;
        // 其他错误，直接抛出错误提示
        default:
            Message.error({
                message: msg
            })
    }
  }

/**
 *  环境的切换
 *
 * */
  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // 环境的切换 url = base url + request url
    timeout: 5000 // 请求超时时间
  })

  // 请求拦截器
  service.interceptors.request.use(
    config => {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      if (store.getters.token) {
        // 让每个请求携带 token
        // ['X-Token'] 是自定义头密钥
        // 请根据实际情况修改
        config.headers['X-Token'] = getToken()
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
axios.interceptors.response.use(
    // 通过⾃定义code判定响应状态，也可以通过HTTP状态码判定
    response => {
      // 仅返回数据部分
      const res = response.data
      // code不为1则判定为⼀个错误
      if (res.code !== 1) {
         Message({
           message: res.message,
           type: 'error',
           duration: 5 * 1000
         })
        // 假设：10008-⾮法令牌; 10012-其他客户端已登录; 10014-令牌过期;
        if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
          // 重新登录
          MessageBox.confirm(
            "登录状态异常，请重新登录",
            "确认登录信息", {
              confirmButtonText: "重新登录",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            store.dispatch("user/resetToken").then(() => {
              location.reload();
            });
          });
        }
        return Promise.reject(new Error(res.message || "Error"));
      } else {
        return Promise.resolve(res)
      }
    },
    error => {
      const {
        response
      } = error
      if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.data.message)
        return Promise.reject(response)
      } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      }
    }

  )

  export default service
