import { Component } from 'react'

export default class Logger extends Component {
  render() {
    console.log(this.props.children)
    return null
  }
}
