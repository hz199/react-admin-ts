const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const Webpack = require('webpack')
const chalk = require('chalk')

const webpackConfig = require('../webpack.config')

const PORT = process.env.HOST_PORT || 8080

const compiler = Webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, '../dist'),
  clientLogLevel: 'warning',
  historyApiFallback: true,
  compress: true,
  hot: true, // 热加载
  inline: true,
  progress: true, // 打包进度
  open: true, //自动打开浏览器
  overlay: { // 报错信息
    warnings: true,
    errors: false
  },
  noInfo: false,
  proxy: {}, // 代理接口转发
  quiet: true, // 日志信息
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  // before (app, server) {

  // },
  // setup: function(app) {
  //webpack-dev-server 本身是 Express 服务器可以添加自己的路由
  // app.get('/some/path', function(req, res) {
  //   res.json({ custom: 'response' })
  // })
  // },
  //配置 https 需要的证书等
  // https: {
  //   cert: fs.readFileSync("path-to-cert-file.pem"),
  //   key: fs.readFileSync("path-to-key-file.pem"),
  //   cacert: fs.readFileSync("path-to-cacert-file.pem")
  // }
})

server.listen(PORT, '0.0.0.0', function () {
  console.log('\n')
  console.log(chalk.cyan(`🔥  server is running at: http://localhost:${PORT}/\n`))
})