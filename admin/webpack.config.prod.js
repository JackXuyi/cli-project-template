const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // 精简输出

process.env.NODE_ENV = 'production'

const config = require('./webpack.config.base.js')

module.exports = merge(config, {
  mode: 'production', // 定义生产模式
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    // new UglifyJSPlugin({
    //   sourceMap: true, // 调试
    // }),
  ],
})
