import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon'// svg组件
// 图标自动导入
// 利用webpack 的require.context自动导入
// 返回的req只是去加载svg目录中的模块函数

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
// console.log(req)
requireAll(req)
