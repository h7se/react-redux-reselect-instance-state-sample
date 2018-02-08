

import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import { createSelector } from 'reselect'

const istate = {
  inst: {
    a: {
      count: 0
    },
    b: {
      count: 1
    }
  }
}

const reducer = (state = istate, action) => {
  const ns = { ...state }

  switch (action.type) {
    case 'INC': {
      ns.inst[action.id].count = ns.inst[action.id].count + 1
      return ns
    }

    default:
      return state
  }
}

const store = createStore(reducer)

class Counter extends Component {
  render() {
    const { count, onClick } = this.props
    return (
      <button onClick={onClick}>{count}</button>
    )
  }
}

const getCount = (state, props) => {
  return state.inst[props.id].count
}

const getCountSelector = () => {
  return createSelector(
    [getCount],
    (count) => {
      return count
    }
  )
}

const makeMapStateToProps = () => (state, props) => {
  return {
    count: getCountSelector()(state, props)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: () => dispatch({ type: 'INC', id: props.id })
  }
}

const CounterNew = connect(makeMapStateToProps, mapDispatchToProps)(Counter)

class App extends Component {
  render() {
    return (
      <div>
        <CounterNew id='a' />
        {'    '}
        <CounterNew id='b' />
      </div>
    )
  }
}


render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)





