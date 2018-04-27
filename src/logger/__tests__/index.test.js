import React from 'react'
import { render } from 'react-testing-library'
import Logger from '../index'

describe('Logger', () => {
  it('logs the value of children', () => {
    const oldConsole = window.console
    window.console.log = jest.fn()
    render(<Logger>{5}</Logger>)
    expect(window.console.log).toHaveBeenLastCalledWith(5)
    window.console = oldConsole
  })
})
