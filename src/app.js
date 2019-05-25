const apos = require('apostrophe')
const { resolve } = require('path')
const config = require('config')

module.exports = apos({
  shortName: 'apos-vue-ts',
  rootDir: __dirname,
  modules: {
    'apostrophe-db': {
      uri: `${config.mongo.uri}/${config.mongo.db}`
    },
    'apostrophe-templates': {
      viewsFolderFallback: resolve(__dirname, 'views'),
      minify: false
    },
    dealers: {},
    'vue-ssr-widgets': {},
    'dealer-locator-widgets': {}
  }
})
