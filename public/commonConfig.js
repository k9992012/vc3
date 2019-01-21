const serverName = 'MonitoringDisplay'
const path = 'http://10.100.9.43:8081' // 开发环境代理接口
const mapPath = 'http://10.100.9.168/gdswearth/'
const changeOrigin = false// 开发环境服务是否不同ip
let commonConfig = {
  api: `/${serverName}/`,
  proxy: {},
  mapPath
}
commonConfig.proxy['/' + serverName] = {
  target: path,
  changeOrigin,
  pathRewrite: {}
}
commonConfig.proxy['/' + serverName].pathRewrite['^/' + serverName] = '/' + serverName
module.exports = commonConfig
