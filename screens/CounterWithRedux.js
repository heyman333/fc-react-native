import React, { Component } from "react"
import Counter from "../components/Counter"
import store from "../store/configureStore"
import { increment, decrement } from "../actions"
import { connect } from "react-redux"

class CounterExample extends Component {
  constructor(props) {
    super(props)
  }

  _onIncrement = () => {
    this.props.increment()
  }

  _onDecrement = () => {
    this.props.decrement()
  }

  render() {
    return (
      <Counter
        value={this.props.count}
        increment={this._onIncrement}
        decrement={this._onDecrement}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.counter.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterExample)
