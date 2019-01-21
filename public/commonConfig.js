const serverName = 'MonitoringDisplay' // 后台服务名称
const path = 'http://10.100.9.43:8081' // 开发环境代理接口
const mapPath = 'http://10.100.9.168/gdswearth/'// 三维服务接口
const changeOrigin = false// 开发环境服务是否不同ip
const refreshTime = 1000 * 60 * 5// 请求刷新时间
let timer = {}// 请求定时器
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
