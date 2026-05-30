'use strict'
const { runTask } = require('../runner')

describe('runTask', () => {
  it('exits 1 when task is not found', () => {
    const exit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit') })
    expect(() => runTask('nonexistent', { tasks: {} })).toThrow('exit')
    expect(exit).toHaveBeenCalledWith(1)
    exit.mockRestore()
  })
})
