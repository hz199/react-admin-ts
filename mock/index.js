const homeMock = require('./home')
const tableMock = require('./table')

const server = function(app) {
  homeMock(app)
  tableMock(app)
}

module.exports = server
