const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const compressionWebpackPlugin = require('compression-webpack-plugin')

const lessTheme = require('./config/lessTheme')

const isEnvProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',
  devtool: isEnvProduction ? 'none' : 'inline-cheap-module-source-map',
  entry: [...(isEnvProduction ? [] : ['react-hot-loader/patch']), './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ...(isEnvProduction
        ? {}
        : {
            'react-dom': '@hot-loader/react-dom'
          })
    }
  },
  optimization: {
    // 是否开启压缩
    minimize: isEnvProduction,
    // production mode 才会使用
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // Terser minify options.
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false, // 是否保留注释
            ascii_only: true
          }
        },
        parallel: true, // 使用多进程并行运行来提高构建速度
        cache: true, // 启动文件缓存
        sourceMap: !isEnvProduction
      }),
      // 用于优化或者压缩CSS资源
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: !isEnvProduction
            ? {
                inline: false,
                annotation: true
              }
            : false
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        // 缓存组
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          priority: 10
        },
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        }
      }
    }
  },
  module: {
    rules: [
      !isEnvProduction && {
        test: /\.(tsx|ts)/,
        loader: 'eslint-loader',
        enforce: 'pre', // 编译前检查
        exclude: /node_modules/, // 不检测的文件
        include: [path.resolve(__dirname, './src')], // 指定检查的目录
        options: {
          // formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.(tsx|ts)/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: !isEnvProduction
          ? ['style-loader', 'css-loader', 'postcss-loader']
          : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: !isEnvProduction
          ? [
              'style-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: require.resolve('less-loader'),
                options: lessTheme || {}
              }
            ]
          : [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              {
                loader: require.resolve('less-loader'),
                options: lessTheme || {}
              }
            ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024,
              outputPath: 'static/images'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/fonts'
        }
      }
    ].filter(Boolean)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV
    }),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'index.html'),
          filename: 'index.html'
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : null
      )
    ),
    isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash:8].css',
        chunkFilename: 'static/css/[id].[hash:8].chunk.css'
      }),
    isEnvProduction &&
      new compressionWebpackPlugin({
        test: /\.(js|css)$/,
        threshold: 10240,
        deleteOriginalAssets: false // 压缩后是否删除原文件
      })
  ].filter(Boolean)
}
