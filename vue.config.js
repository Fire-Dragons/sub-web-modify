const path = require('path')
const dev = process.env.NODE_ENV === 'development'
ASSET_PATH = dev ? '/' : `/subweb`
process.env.VUE_APP_ASSET_PATH = ASSET_PATH
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    publicPath: ASSET_PATH,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('./src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
};