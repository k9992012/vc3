module.exports = {
  // 基本路径(设置为'./'后，所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径)
  baseUrl: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'file',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir),也可以是一个绝对路径
  // indexPath: 'dist',
  // 默认情况下(true)，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  // filenameHashing: false,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让应用额外增加 10kb 左右。
  // runtimeCompiler: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: () => {},
  // configureWebpack: () => {},
  // // vue-loader 配置项
  // // https://vue-loader.vuejs.org/en/options.html
  // // vueLoader: {},
  // // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // // css相关配置
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {},
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },
  // // use thread-loader for babel & TS in production build
  // // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  // // 是否启用dll
  // // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // // dll: false,
  // // PWA 插件相关配置
  // // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  devServer: {
    // 设置主机地址
    host: '10.100.9.43',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/MonitoringDisplay': {
        target: 'http://10.100.9.43:8083', // 代理接口
        changeOrigin: false, // 是否不同ip
        pathRewrite: {
          '^/MonitoringDisplay': '/MonitoringDisplay' // 代理的路径
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
