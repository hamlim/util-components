import React from 'react'
import { render } from 'react-testing-library'
import Toggle from '../index'

describe('Toggle', () => {
  it('calls the children prop with the state containing a toggle function', () => {
    const children = jest.fn()
    render(
      <Toggle>
        {state => {
          children(state)
          return null
        }}
      </Toggle>,
    )
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        toggle: expect.any(Function),
        on: expect.any(Boolean),
      }),
    )
  })

  it('updates the on value provided when toggle is called', () => {
    const children = jest.fn()
    const { container } = render(
      <Toggle>
        {state => {
          children(state)
          return null
        }}
      </Toggle>,
    )
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        toggle: expect.any(Function),
        on: false,
      }),
    )
    let toggle
    render(
      <Toggle>
        {state => {
          toggle = state.toggle
          children(state)
          return null
        }}
      </Toggle>,
      { container },
    )
    // call toggle later
    toggle()
    // on should be true
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        toggle: expect.any(Function),
        on: true,
      }),
    )
  })
})
