const proxy = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'https://movie.douban.com/',
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    }
  }))
}