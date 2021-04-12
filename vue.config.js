const isProd = process.env.NODE_ENV === 'production'

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
  publicPath: `/${process.env.VUE_APP_CONTEXT}`,
  assetsDir: process.env.VUE_APP_ASSETS,
  runtimeCompiler: true,
  lintOnSave: true,

  devServer: {
    overlay: {
      warnings: false, //不显示警告
      // errors: false	//不显示错误
    }
  },

  //关闭eslint检查
  lintOnSave: false,

  configureWebpack () {
    if (isProd) {
      return {
        // 避免源码泄露
        devtool: 'nosources-source-map'
      }
    }
  },

  // 默认babel-loader会忽略node_modules中的文件
  // 但是dolphin-plugin-tools用了es6的语法, 配置对其显示转译
  // 配合babel sourceType: 'unambiguous'来使用 https://github.com/babel/babel/issues/9187,
  transpileDependencies: [
    'dolphin-plugin-tools',
    /@hui-pro/
  ],

  chainWebpack: (config) => {
    if (isProd) {
      // 打包的css如有必要加上@charset
      config.plugin('optimize-css').tap(args => {
        try {
          args[0].cssnanoOptions.preset[1].normalizeCharset = true
          return args
        } catch (_) {
          return args
        }
      })
    }
  },

  // 用于开发环境下与后端联调
  // 如有需要, 还可以配合easy-proxy进行使用
  devServer: {
    // 如果改动node_modules内的代码, 不会触发热重载, 则取消下面的注释
    // watchOptions: {
    //   ignored: []
    // },
    proxy: {
      '^/hmap2.3.0': {    // 获取聚合模拟数据
        target: 'http://10.19.154.61:1709',  // 后台 
        changeOrigin: true
      },
      '^/hmap-server/': {  // 公司 hmap 数据后台
        target: 'http://10.194.98.123:1709',  // 后台 
        changeOrigin: true
      },
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}

// http://10.194.98.123:1709/hmap-server/hvt/9/428/82.hvt
