'use strict'
const { execSync } = require('child_process')
const chalk = require('chalk')

/**
 * Run a task by name from the loaded config.
 * @param {string} taskName  - e.g. "deploy:staging"
 * @param {object} config    - parsed .does.yaml content
 * @param {string[]} args    - extra CLI args forwarded to the script
 */
function runTask(taskName, config, args = []) {
  const task = config.tasks?.[taskName]
  if (!task) {
    console.error(chalk.red(`Task not found: ${taskName}`))
    process.exit(1)
  }

  const cmds = Array.isArray(task.run) ? task.run : [task.run]
  const env = { ...process.env, ...(task.env || {}) }

  if (task.description) {
    console.log(chalk.cyan(`▸ ${task.description}`))
  }

  for (const cmd of cmds) {
    const full = args.length ? `${cmd} ${args.join(' ')}` : cmd
    console.log(chalk.dim(`$ ${full}`))
    try {
      execSync(full, { stdio: 'inherit', env })
    } catch (err) {
      console.error(chalk.red(`✖ Task failed: ${taskName}`))
      process.exit(err.status ?? 1)
    }
  }

  console.log(chalk.green(`✔ ${taskName} done`))
}

module.exports = { runTask }
