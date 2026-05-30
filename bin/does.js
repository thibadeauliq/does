#!/usr/bin/env node
'use strict'
const minimist = require('minimist')
const { findConfig, loadConfig } = require('../src/config')
const { runTask } = require('../src/runner')

const argv = minimist(process.argv.slice(2))
const [taskName, ...rest] = argv._

if (!taskName) {
  console.error('Usage: does <task> [args...]')
  process.exit(1)
}

const configPath = findConfig()
if (!configPath) {
  console.error('No .does.yaml found in current or parent directories')
  process.exit(1)
}

const config = loadConfig(configPath)
runTask(taskName, config, rest)
