const {
  createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://whois.pconline.com.cn",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};