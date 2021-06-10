const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function(app) {
  app.use(proxy('/api/f/wmts', { target: "http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts", changeOrigin: true } ));
};
