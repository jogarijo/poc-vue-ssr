#!/usr/bin/env node

const Bundler = require('parcel-bundler')
const { resolve } = require('path')
const cpx = require('cpx')
const rimraf = require('rimraf')

const bundler = new Bundler(
  [
    // './src/lib/modules/*/vue/*.vue',
    './src/lib/modules/*/public/js/*.js',
    './src/lib/modules/*/public/css/*.scss'
  ],
  {
    outDir: './dist/lib/modules',
    watch: true,
    target: 'browser',

  }
)

bundler.on('buildStart', (entries) => {})

bundler.on('buildEnd', async () => {
  // cpx.copySync(resolve('.front', '**', '*.{js,css}'), resolve('dist', 'lib', 'modules'))
  // rimraf.sync(resolve('.front'))
})

bundler.bundle()
