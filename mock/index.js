const homeMock = require('./home')
const tableMock = require('./table')
const authMock = require('./auth')

const server = function(app) {
  homeMock(app)
  tableMock(app)
  authMock(app)
}

module.exports = server
