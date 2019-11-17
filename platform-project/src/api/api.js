/**
 * api接口统一管理
 */
import request from '../utils/request'

/*
  登录
  @param {
    String
  }
  username [用户名]
  @param {
    String
  }
  password [密码]
*/
const login = (data) => {
  return request({
    data,
    url: '/login',
    method: 'post'
  })
}

export default {
  login
}
