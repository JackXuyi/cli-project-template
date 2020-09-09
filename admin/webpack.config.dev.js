const merge = require('webpack-merge')
const webpack = require('webpack')

const config = require('./webpack.config.base.js')

module.exports = merge(config, {
  devtool: 'inline-source-map', // 开发工具
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热替换
  ],
})
