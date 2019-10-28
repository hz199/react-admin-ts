const homeMock = require('./home')

const server = function(app) {
  homeMock(app)
}

module.exports = server
