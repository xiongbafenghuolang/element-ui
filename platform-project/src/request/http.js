import axios from 'axios' //Axios 是一个基于 promise 的 HTTP 库
import Qs from 'qs'  // Vue中，序列化字符串，处理发送请求的参数
import { Message } from 'element-ui'

/**
 *  环境的切换
 *  
 * */
window.console.log(process.env.NODE_ENV)
// axios.defaults.baseURL = '/api';
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = '/api';} 
else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://www.ceshi.com';
} 
else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'https://www.production.com';
}

/**
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 * 
 * */
const errorHanding = (status, msg) => {
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
 * 设置请求超时 
 * 
 * */
axios.defaults.timeout = 10000;

/**
 * post请求头的设置
 * 
 * */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 请求拦截器 
 * 
 * */
axios.interceptors.request.use(    
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;        
        // token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    })


/**
 * 响应拦截器 
 * 
 * */
axios.interceptors.response.use(
    res => {        
        if (res.status === 200) {            
            return Promise.resolve(res);        
        } else {            
            return Promise.reject(res);        
        }    
    },
    error => {
      const { response } = error
      if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHanding(response.status, response.data.message)
        return Promise.reject(response)
      } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      }
    }
  )


  /** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, Qs.stringify(params))        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}