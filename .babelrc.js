module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions',
        useBuiltIns: 'usage', // 这个属性决定是否引入 polyfill 默认为 false  usage 为按需引入
        corejs: 3 // core-js 解决浏览器兼容
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ...(process.env.NODE_ENV !== 'production' ? ['react-hot-loader/babel'] : []),
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
}
