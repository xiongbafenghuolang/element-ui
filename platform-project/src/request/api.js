/**   
 * api接口统一管理
 */
import { get } from './http'

const apiAddress = (params) => get('./demo.json', params)

export default {
    apiAddress
}