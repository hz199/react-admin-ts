const Mock = require('mockjs')

module.exports = function(app) {
  // 首页数据
  app.get('/api/home', function(req, res) {
    const mock = Mock.mock({
      data: {
        numberCards: [
          {
            icon: 'pay-circle-o',
            color: '@color',
            title: '@name',
            'number|100-9999': 100
          },
          {
            icon: 'team',
            color: '@color',
            title: '@name',
            'number|100-9999': 100
          },
          {
            icon: 'message',
            color: '@color',
            title: '@name',
            'number|100-9999': 100
          },
          {
            icon: 'shopping-cart',
            color: '@color',
            title: '@name',
            'number|100-9999': 100
          }
        ],
        LineBarChartOption: {
          title: '@ctitle(5)',
          'series|2-3': [
            {
              name: '@ctitle(5)',
              type: function() {
                return Math.random() > 0.5 ? 'line' : 'bar'
              },
              'data|7': ['@float(60, 300, 1, 2)']
            }
          ],
          'xAxisData|7': ['@ctitle(2)']
        },
        pieOptions: {
          name: '@ctitle(5)',
          'datas|5-8': [
            {
              'value|10-100': 50,
              name: '@cname'
            }
          ]
        },
        'orderTable|10': [
          {
            name: '@cname',
            'status|1-3': 1,
            timer: "@datetime('yyyy-MM-dd HH:mm:ss')",
            'prize|1000-10000': 5000,
            key: '@string(7, 10)'
          }
        ],
        'CommentList|3-4': [
          {
            actions: '@ctitle(2)',
            author: '@cname',
            content: '@cparagraph',
            datetime: "@datetime('yyyy-MM-dd HH:mm:ss')"
          }
        ]
      },
      code: 0,
      message: 'success'
    })

    res.json(mock)
  })
}
