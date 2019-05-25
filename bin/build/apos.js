#!/usr/bin/env node

const Bundler = require('parcel-bundler')
const { promisify } = require('util')
const { resolve } = require('path')

const bundler = new Bundler(
  [
    './src/app.js',
    './src/lib/modules/*/index.js',
    './src/lib/modules/*/lib/**/*.js',
    './src/lib/modules/*/universal/**/*.js',
    './src/lib/modules/*/vue/*.vue'
  ],
  {
    target: 'node',
    watch: true
  }
)

let apos
/*
let clearing = false
bundler.on('buildStart', (entries) => {
  clearing = true
  for (const entry of entries) {
    if (/\.js$/.test(entry)) {
      delete require.cache[require.resolve(entry.replace('/src/', '/dist/'))]
    }
  }
  clearing = false
})

bundler.on('buildEnd', async () => {
  while (clearing);
  if (apos) {
    await promisify(apos.destroy)
      .apply(apos)
      .catch(() => process.exit(1))
  }

  apos = require(resolve('dist', 'app'))
})
*/

bundler.bundle()
