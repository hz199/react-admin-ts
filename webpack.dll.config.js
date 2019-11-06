/* eslint-disable @typescript-eslint/no-var-requires */
// 不知道咋用啊~~~~感觉速度没有变化~~
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'antd']
  },
  output: {
    path: path.resolve(__dirname, './manifest'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader?cacheDirectory'
      }
    ]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.resolve(__dirname, './manifest', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}
