const Mock = require('mockjs')

module.exports = function(app) {
  app.post('/api/login', function(req, res) {
    const mock = Mock.mock({
      data: {
        userName: 'HZ',
        avatar: 'http://study.closeeyes.cn/zhuhe3958.jpg'
      },
      code: 0,
      message: 'success'
    })

    res.json(mock)
  })
}
