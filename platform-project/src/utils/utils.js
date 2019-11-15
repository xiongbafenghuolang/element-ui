
// 时间格式的转换
const formatDate = (time, fmt) => {
  var date = new Date(parseInt(time));

  if (fmt == 0) {
    fmt = "yyyy-MM-dd hh:mm:ss"
  } else if (fmt == 1) {
    fmt = "yyyy-MM-dd"
  } else if (fmt == 2) {
    fmt = "hh:mm:ss"
  } else if (fmt == 3) {
    fmt = "yyyy年MM月dd日 hh时mm分ss秒"
  } else if (fmt == 4) {
    fmt = "yyyy年MM月dd日"
  } else if (fmt == 5) {
    fmt = "hh时mm分ss秒"
  } else if (fmt == 6) {
    fmt = "yyyy年MM月"
  } else if (fmt == 7) {
    fmt = "yyyy"
  } else if (fmt == 8) {
    fmt = "yyyy/MM/dd"
  } else if (fmt == 9) {
    fmt = "hh:mm"
  } else if (fmt == 10) {
    fmt = "MM-dd hh:mm"
  } else if (fmt == 11) {
    fmt = "yyyy.MM.dd"
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

/* 一位数两位数转换 */
let padLeftZero = (str) => {
  return ('00' + str).substr(str.length);
};
export default{
  formatDate
}
