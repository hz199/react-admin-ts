const Mock = require('mockjs')

module.exports = function(app) {
  app.get('/api/table1', function(req, res) {
    const mock = Mock.mock({
      data: {
        'list|10': [
          {
            nameEN: '@name',
            nameCN: '@cname',
            county: '@county(true)',
            timer: "@datetime('yyyy-MM-dd HH:mm:ss')",
            key: '@string(7, 10)'
          }
        ],
        totalPage: 200
      },
      code: 0,
      message: 'success'
    })

    res.json(mock)
  })
}
