const proxy = require('http-proxy-middleware')

const pkg = require('../package.json')

module.exports = function expressMiddleware (router) {
  router.use('/graphql', proxy({
    target: pkg.proxy,
    changeOrigin: true
  }))
}