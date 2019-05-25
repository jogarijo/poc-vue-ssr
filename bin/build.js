#!/usr/bin/env node

const { fork } = require('child_process')
const { resolve } = require('path')

const apos = fork(resolve(__dirname, 'build', 'apos'))
const front = fork(resolve(__dirname, 'build', 'front'))

const killall = (signal) => {
  apos.kill(signal)
  front.kill(signal)
}

process.on('SIGINT', killall)
process.on('SIGTERM', killall)
process.on('exit', () => killall())
