# util-components

This is a collection of helpful React components that I end up using fairly frequently in many different projects.

## API

```js
import {
  Toggle,
  RefManager,
  FocusManager,
} from 'util-components'

render(
  <Toggle>
    {({ toggle, on }) => (
      <RefManager>
        {({ assignRef, someRef, target }) => (
          <div ref={assignRef('someRef')}>
            <button
              onClick={toggle}
              ref={assignRef('target')}
            >
              Toggle
            </button>
          </div>
        )}
      </RefManager>
    )}
  </Toggle>,
)
```
