#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const npmGlobalList = require('npm-global-list')
const shoutSuccess = require('shout-success')
const { bold, underline } = require('chalk')

const cli = meow(
  `
  Usage:
    $ ngl
    $ ngl -l=100

  Options:
    -l, --limit                 Limit
    -h, --help                  Show help options
    -v, --version               Show version
`,
  {
    alias: {
      l: 'limit',
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

npmGlobalList().then(pkgs => {
  shoutSuccess(
    `You have ${bold(pkgs.length + ' packages')} installed ${underline(
      'globally'
    )}.\n`
  )
  const l = cli.flags.limit || 11
  const limit = l > pkgs.length ? pkgs.length : l

  for (let index = 0; index <= limit; index++) {
    if (index === limit) {
      return false
    }

    console.log(`⇢ ${pkgs[index]}`)
  }
})
