const serverName = 'MonitoringDisplay'
const path = 'http://10.100.9.43:8081' // 开发环境代理接口
const mapPath = 'http://10.100.9.168/gdswearth/'
const changeOrigin = false// 开发环境服务是否不同ip
// 请求刷新时间
const refreshTime = 1000 * 60 * 5
// 请求定时器
let timer = {}
let commonConfig = {
  api: `/${serverName}/`,
  proxy: {},
  mapPath,
  refreshTime,
  timer
}
commonConfig.proxy['/' + serverName] = {
  target: path,
  changeOrigin,
  pathRewrite: {}
}
commonConfig.proxy['/' + serverName].pathRewrite['^/' + serverName] = '/' + serverName
module.exports = commonConfig
