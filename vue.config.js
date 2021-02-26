'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    devServer: {
      open: true,
      hot: true,
      overlay: {
        warnings: false,
        errors: true
      },
      proxy: {  //配置跨域
        '/api': {
          target: 'http://api.vikingship.xyz',  //这里后台的地址模拟的;应该填写你们真实的后台接口
          changOrigin: true,  //允许跨域
          pathRewrite: {
            /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
              实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
             */
            '^/api': '' 
          }
        },
      }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
          alias: {
            '@': resolve('src')
          }
        }
    }
}