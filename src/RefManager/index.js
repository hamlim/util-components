import { Component } from 'react'

export default class RefManager extends Component {
  assignRef = name => ref => {
    this.setState(
      state => (!state[name] ? { [name]: ref } : null),
    )
  }
  state = {
    assignRef: this.assignRef,
  }
  render() {
    return this.props.children(this.state)
  }
}
