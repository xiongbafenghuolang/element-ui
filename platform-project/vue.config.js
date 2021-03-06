// vue.config.js
const path = require('path')
// 将传入的相对路径转换为绝对路径
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
// const bodyParser = require("body-parser")
const port = 9999
const title = '项目实战'
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
  // 输出文件目录：在npm run build时，生成文件的目录名称
  outputDir: process.env.outputDir, // 默认dist
  // 用于嵌套生成的静态资产（js,css,img,fonts）目录
  assetsDir: "assets",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: 'index.html', // Default: 'index.html'
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: true,
  // 构建多页时使用
  pages: undefined,
  // eslint-loader是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  // eslint-disable-next-line no-unused-vars
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  // eslint-disable-next-line no-unused-vars
  chainWebpack: config => {
     // 移除 prefetch 插件
     config.plugins.delete('prefetch')
     // 移除 preload 插件
     config.plugins.delete('preload');
    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule('svgIcon')
      .test(/\.svg$/) // 设置test选项
      .include.add(resolve('src/icons')) // 加入include选项
      .end() // add完上下文进入数组，使用end进行回退
      .use('svg-sprite-loader') // 添加loader选项
      .loader('svg-sprite-loader') // 切换上下文到loader
      .tap(options => {
        options = {
          symbolId: 'icon-[name]' // 指定选项
        }
        return options
      })

    // 原有的svg图像处理loader添加exclude
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
  },
  // css相关配置
  css: {
    // 启用 CSS modules
    requireModuleExtension: true,
    // 是否使用css分离插件 css热更新，将extract: true,注释掉 或者 改成false 就可以了
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
  },
  // webpack-dev-server 相关配置
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    historyApiFallback: {
      rewrites: [{
        from: /.*/g,
        to: '/public/index.html' //设置了无论是啥都匹配我自己设置的首页
      }]
    },
    host: '0.0.0.0',
    port: port,
    https: false,
    open: true, // 是否打开浏览器
    hot: true, // 热更新
    proxy: { // 设置代理
      [process.env.VUE_APP_BASE_API]: {
        // 目标代理服务器地址
        target: `http://localhost:${port}`,
        // 允许跨域，开启代理，在本地创建一个虚拟服务端
        changeOrigin: true,
        // 是否启用websockets
        // ws: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      },
      // '/api': {
      //   // 目标代理服务器地址
      //   target: `http://localhost:${port}`,
      //   // 允许跨域，开启代理，在本地创建一个虚拟服务端
      //   changeOrigin: true,
      //   // 是否启用websockets
      //   // ws: true,
      //   pathRewrite: {
      //     '^/api': '/mock'
      //   }
      // }
    },
    // eslint-disable-next-line no-unused-vars
    // 配置mock数据
    // app 是express的实例
    // before: app => {
      // 处理post参数
      // app.use(bodyParser.json());
      // app.post("/dev-api/user/login", (req, res) => {
      //   const {
      //     username
      //   } = req.body;
      //   if (username === "admin" || username === "jerry") {
      //     res.json({
      //       code: 1,
      //       data: username
      //     });
      //   } else {
      //     res.json({
      //       code: 10204,
      //       message: "⽤户名或密码错误"
      //     });
      //   }
      // });
      // app.get("/dev-api/user/info", (req, res) => {
      //   const auth = req.headers["authorization"];
      //   const roles = auth.split(' ')[1] === "admin" ? ["admin"] : ["editor"];
      //   res.json({
      //     code: 1,
      //     data: roles
      //   })
      // })
    // },
  },
  configureWebpack: {
    name:title
  },
  // PWA 插件相关配置
  pwa: {},
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
