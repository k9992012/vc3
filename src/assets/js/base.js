// 公共方法
const BaseFun = {
  // 日期格式化
  formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    // 遍历这个对象
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = `${o[k]}`
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },
  // 时间补零
  padLeftZero (str) {
    return (`00${str}`).substr(str.length)
  },
  // 年份下拉列表数组
  yearArr () {
    let year = new Date().getFullYear()
    let yearArr = []
    for (let i = 0; i < 31; i++) {
      yearArr.push({
        value: year - i,
        label: year - i
      })
    }
    return yearArr
  },
  // 对象数组排序
  compare (property) {
    return (obj1, obj2) => {
      let value1 = obj1[property]
      let value2 = obj2[property]
      return value1 - value2 // 升序
    }
  },
  mapPath: 'http://10.100.9.168/gdswearth/'
}
export default BaseFun
