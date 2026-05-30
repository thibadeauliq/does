'use strict'
const { spawn } = require('child_process')
const chalk = require('chalk')

/**
 * Run multiple tasks concurrently; resolve when all complete.
 */
async function runParallel(taskNames, config) {
  const tasks = taskNames.map((name) => {
    const task = config.tasks?.[name]
    if (!task) throw new Error(`Task not found: ${name}`)
    const cmds = Array.isArray(task.run) ? task.run : [task.run]
    return { name, cmds, env: { ...process.env, ...(task.env || {}) } }
  })

  console.log(chalk.cyan(`Running ${tasks.length} tasks in parallel...`))

  const promises = tasks.map(({ name, cmds, env }) =>
    new Promise((resolve, reject) => {
      const full = cmds.join(' && ')
      const child = spawn('sh', ['-c', full], { stdio: 'inherit', env })
      child.on('close', (code) => {
        if (code === 0) {
          console.log(chalk.green(`✔ ${name}`))
          resolve()
        } else {
          reject(new Error(`${name} exited with code ${code}`))
        }
      })
    })
  )

  await Promise.all(promises)
  console.log(chalk.bold.green('All tasks completed'))
}

module.exports = { runParallel }
