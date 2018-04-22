import { Component } from 'react'
import PropTypes from 'prop-types'

export default class FocusManager extends Component {
  static propTypes = {
    containerRef: PropTypes.object.isRequired,
    targetRef: PropTypes.object.isRequired,
    focusContainer: PropTypes.bool.isRequired,
    children: PropTypes.func.isRequired,
    // DI
    onTabLastElement: PropTypes.func,
    onTabFirstElement: PropTypes.func,
    focus: PropTypes.func,
  }

  static defaultProps = {
    onTabLastElement({ event, focus, container }) {
      event.stopPropagation()
      event.preventDefault()
      focus(container)
    },
    onTabFirstElement({ event, focus, lastTabbableRef }) {
      event.stopPropagation()
      event.preventDefault()
      focus(lastTabbableRef)
    },
    focus(ref) {
      if (ref && typeof ref.focus === 'function') {
        ref.focus()
      }
    },
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.focusContainer &&
      !prevProps.focusContainer
    ) {
      this.props.focus(this.props.containerRef)
    } else if (
      !this.props.focusContainer &&
      prevProps.focusContainer
    ) {
      this.props.focus(this.props.targetRef)
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      'keydown',
      this.handleKeyDown,
    )
  }

  handleKeyDown = event => {
    if (!this.props.focusContainer) {
      return
    }

    if (!event.key === 'Tab') {
      return
    }

    if (
      event.target === this.lastTabbableRef &&
      !event.shiftKey
    ) {
      this.props.onTabLastElement({
        event,
        focus: this.props.focus,
        container: this.props.containerRef,
        target: this.props.targetRef,
        lastTabbableRef: this.lastTabbableRef,
      })
    } else if (
      event.target === this.props.containerRef &&
      event.shiftKey
    ) {
      this.props.onTabFirstElement({
        event,
        focus: this.props.focus,
        container: this.props.containerRef,
        target: this.props.targetRef,
        lastTabbableRef: this.lastTabbableRef,
      })
    }
  }

  assignLastTabbableRef = ref => {
    this.lastTabbableRef = ref
  }

  render() {
    return this.props.children({
      assignLastTabbableRef: this.assignLastTabbableRef,
    })
  }
}
