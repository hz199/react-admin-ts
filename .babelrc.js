module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions',
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ...(process.env.NODE_ENV !== 'production' ? ['react-hot-loader/babel'] : []),
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
