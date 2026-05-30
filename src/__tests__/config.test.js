'use strict'
const { findConfig } = require('../config')
const path = require('path')
const os = require('os')
const fs = require('fs')

describe('findConfig', () => {
  it('returns null when no config exists', () => {
    expect(findConfig(os.tmpdir())).toBeNull()
  })

  it('finds .does.yaml in the given directory', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'does-test-'))
    const configPath = path.join(tmp, '.does.yaml')
    fs.writeFileSync(configPath, 'tasks: {}')
    expect(findConfig(tmp)).toBe(configPath)
    fs.rmSync(tmp, { recursive: true })
  })
})
