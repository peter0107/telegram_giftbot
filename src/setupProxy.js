// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://3.144.239.116:4000', // 백엔드 서버 URL (서버의 실제 URL로 변경해야 함)
            changeOrigin: true
        })
    );
};
