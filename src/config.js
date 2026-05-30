'use strict'
const fs = require('fs')
const path = require('path')
const YAML = require('yaml')

const CONFIG_NAMES = ['.does.yaml', '.does.yml', 'does.yaml']

/**
 * Walk up from cwd looking for a .does.yaml config file.
 */
function findConfig(startDir = process.cwd()) {
  let dir = startDir
  while (true) {
    for (const name of CONFIG_NAMES) {
      const candidate = path.join(dir, name)
      if (fs.existsSync(candidate)) return candidate
    }
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

function loadConfig(configPath) {
  const raw = fs.readFileSync(configPath, 'utf8')
  return YAML.parse(raw)
}

module.exports = { findConfig, loadConfig }
