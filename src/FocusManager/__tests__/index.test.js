import React from 'react'
import { render } from 'react-testing-library'
import FocusManager from '../index'

const mockRef = { focus: () => {} }

describe('FocusManager', () => {
  it('calls the children prop with a ref assignment function', () => {
    const children = jest.fn()
    render(
      <FocusManager
        containerRef={mockRef}
        targetRef={mockRef}
        focusContainer={false}
      >
        {refAssignment => {
          children(refAssignment)
          return null
        }}
      </FocusManager>,
    )
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        assignLastTabbableRef: expect.any(Function),
      }),
    )
  })
  it('calls the focus method of the containerRef if focusContainer updates to true', () => {
    const mockFocusMethod = jest.fn()
    const mockContainerRef = {
      focus: mockFocusMethod,
    }
    const { container } = render(
      <FocusManager
        containerRef={mockContainerRef}
        targetRef={mockRef}
        focusContainer={false}
      >
        {() => null}
      </FocusManager>,
    )
    expect(mockFocusMethod).not.toHaveBeenCalled()
    render(
      <FocusManager
        containerRef={mockContainerRef}
        targetRef={mockRef}
        focusContainer
      >
        {() => null}
      </FocusManager>,
      { container },
    )
    expect(mockFocusMethod).toHaveBeenCalled()
  })
})
