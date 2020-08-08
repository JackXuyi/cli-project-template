const merge = require('webpack-merge')

const config = require('./webpack.config.dev.js')

module.exports = merge(config, {
  devServer: {
    // 开发模式下服务器配置
    contentBase: './dist', // 编译后文件路径
    hot: true, // 是否开启热替换
    host: 'localhost', // 主机
    port: 8000,
  },
})
