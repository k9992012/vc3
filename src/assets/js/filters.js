import BaseFun from './base'

const filters = {
  percent (val) { // 小数转化为百分数
    if (val !== '' && val !== undefined && val !== null) {
      return val * 100
    } else {
      return val
    }
  },
  toFixTwo (val) { // 四舍五入保留两位小数
    if (val !== '' && val !== undefined && val !== null) {
      return val.toFixed(2)
    } else {
      return val
    }
  },
  nullValue (val) { // 空值转化为'--'
    if (val === '' || val === undefined || val === null) {
      return '--'
    } else {
      return val
    }
  },
  wanToYiTwo (val) { // 万转化为亿并四舍五入保留两位小数
    if (val !== '' && val !== undefined && val !== null) {
      return (val / 10000).toFixed(2)
    } else {
      return val
    }
  },
  wanToYiFour (val) { // 万转化为亿并四舍五入保留4位小数
    if (val !== '' && val !== undefined && val !== null) {
      return (val / 10000).toFixed(4)
    } else {
      return val
    }
  },
  dividedWan (val) { // 万转化为亿
    if (val === '' || val === undefined || val === null) {
      return '--'
    } else {
      return val / 10000
    }
  },
  dividedWanZero (val) { // 万转化为亿
    if (val !== '' && val !== undefined && val !== null) {
      return (val / 10000).toFixed(0)
    } else {
      return val
    }
  },
  time (val) { // 时间转化
    if (val === '' || val === undefined || val === null) {
      return '--'
    } else {
      return BaseFun.formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
export default filters
