//vue.config.js
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  // 部署应用包时的基本 URL。
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/',

  // 输出文件目录
  outputDir: 'dist',

  //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的 Vue 构建版本。
  //设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
  //如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  //Vue-ECharts 默认在 webpack 环境下会引入未编译的源码版本，
  //官方的 Vue CLI 来创建项目，可能会遇到默认配置把 node_modules 中的文件排除在 Babel 转译范围以外的问题
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],

  //是否需要生产环境的 source map
  productionSourceMap: true,

  // webpack配置
  //是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
  //允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 为src下文件配别名，不使用相对路径
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("utils", resolve("src/utils"))
  },
  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  //如果这个值是一个函数，则会接收被解析的配置作为参数。
  //该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  //configureWebpack: () => {},

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //Default: 生产环境下是 true，开发环境下是 false
    extract: true,
    // 开启 CSS source maps?设置为 true 之后可能会影响构建的性能。
    sourceMap: false,
    // css预设器配置项
    //loaderOptions: {},
  },

  // webpack-dev-server 相关配置
  // 开发环境代理
  devServer: {
    host: '0.0.0.0', // 地址
    port: 8080, // 端口
    //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
    //这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    //devServer.proxy 可以是一个指向开发环境 API 服务器的字符串：
    proxy: 'http://220.248.243.122:11812'
  },

  //这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
  pluginOptions: {
    // ...
  },

};
