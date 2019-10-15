const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const Webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

console.log()
const spinner = ora(chalk.cyan('building code for production...')).start()
rm(path.join(__dirname, '../dist'), err => {
  if (err) throw err
  Webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      warnings: false,
      // entrypoints: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
