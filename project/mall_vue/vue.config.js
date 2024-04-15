const { configure } = require("nprogress");

module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8090,
    proxy: {
      '/api': {
        target: 'https://admin-api.macrozheng.com', // 后端服务的地址
        ws: true,
        changeOrigin: true // 是否改变源地址
      },
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
};

