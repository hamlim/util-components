import { Component } from 'react'

export default class Toggle extends Component {
  static defaultProps = {
    defaultOn: false,
  }
  toggle = () => this.setState(s => ({ on: !s.on }))
  state = {
    on: this.props.defaultOn,
    toggle: this.toggle,
  }
  render() {
    return this.props.children(this.state)
  }
}
