import React from 'react'
import { render } from 'react-testing-library'
import RefManager from '../index'

describe('RefManager', () => {
  it('calls the children prop with the state containing an assign ref function', () => {
    const children = jest.fn()
    render(
      <RefManager>
        {state => {
          children(state)
          return null
        }}
      </RefManager>,
    )
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        assignRef: expect.any(Function),
      }),
    )
  })
  it('re-renders with the correct references', () => {
    let assign, sampleRef
    const { container } = render(
      <RefManager>
        {({ assignRef, sample }) => {
          sampleRef = sample
          assign = assignRef
          return null
        }}
      </RefManager>,
    )
    expect(sampleRef).toBeUndefined()
    assign('sample')({ value: true })
    render(
      <RefManager>
        {({ assignRef, sample }) => {
          sampleRef = sample
          assign = assignRef
          return null
        }}
      </RefManager>,
      { container },
    )
    expect(sampleRef).toEqual({ value: true })
  })
})
