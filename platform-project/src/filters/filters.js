import util from '@/utils/utils.js'
/*
	毫秒转为正常格式时间过滤器
	编写过滤器传入需要的时间格式，例如：yyyy-MM-dd hh:mm:ss或者yyyy年MM月dd日
	注意：月MM必须大写，目的为了区分月与分，其他都为小写
	时间格式定义：
		参数为0格式：yyyy-MM-dd hh:mm:ss
		参数为1格式：yyyy-MM-dd
		参数为2格式：hh:mm:ss
		参数为3格式：yyyy年MM月dd日 hh时mm分ss秒
		参数为4格式：yyyy年MM月dd日
		参数为5格式：hh时mm分ss秒
		参数为6格式：yyyy年MM月
		参数为7格式：yyyy
		参数为8格式：yyyy/MM/dd
		参数为9格式： hh:mm
		参数为10格式： MM-dd hh-mm
		参数为10格式： yyyy.MM.dd
*/
let formatDate = (date, fmt) => {
	return util.formatDate(date,fmt)
};

export {
  formatDate
}
