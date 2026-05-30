'use strict'
const chalk = require('chalk')

/**
 * Print all available tasks from a loaded config.
 */
function listTasks(config) {
  const tasks = config.tasks || {}
  const names = Object.keys(tasks)
  if (!names.length) {
    console.log(chalk.yellow('No tasks defined in .does.yaml'))
    return
  }
  console.log(chalk.bold('Available tasks:'))
  for (const name of names.sort()) {
    const desc = tasks[name]?.description || ''
    console.log(`  ${chalk.cyan(name.padEnd(24))} ${chalk.dim(desc)}`)
  }
}

module.exports = { listTasks }
