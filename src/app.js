process.chdir(__dirname)

const apos = require('apostrophe')
const { resolve } = require('path')
const config = require('config')

module.exports = apos({
  shortName: 'apos-vue-ts',
  rootDir: process.cwd(),
  modules: {
    'apostrophe-db': {
      uri: `${config.get('mongo.uri')}/${config.get('mongo.db')}`
    },
    'apostrophe-templates': {
      viewsFolderFallback: resolve('views'),
      minify: false,
    },
    'vue-ssr-widgets': {},
    'dealer-locator-widgets': {}
  }
})
