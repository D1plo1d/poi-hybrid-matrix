import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import FlowDiagram from '../src/components/flow_diagram.jsx'
import TimeSliderFlowDiagram from '../src/components/time_slider_flow_diagram.jsx'
import Hybrid from '../src/components/hybrids/show.jsx'
import HybridIndex from '../src/components/hybrids/index.jsx'

import flower from '../src/patterns/flower.js'
import 'font-awesome-webpack'

const patterns = {
  leftPattern: flower({
    inspin: true,
    petals: 3,
    invert: false,
    horizontal: false,
    position: 'bottom',
    boxPattern: true,
    offset: 0,
    forward: true,
  }),
  rightPattern: flower({
    inspin: true,
    petals: 3,
    invert: true,
    horizontal: false,
    position: 'bottom',
    boxPattern: true,
    offset: 0,
    forward: false,
  }),
}

const HybridFromRouteParams = ({match}) => {
  const json = JSON.parse(atob(match.params.id))
  return (
    <Hybrid
      leftPattern={flower(json.leftPattern.params)}
      rightPattern={flower(json.rightPattern.params)}
    />
  )
}

const App = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        component={HybridIndex}
      />
      <Route
        exact
        path="/hybrids/:id"
        component={HybridFromRouteParams}
      />
    </div>
  </Router>

)

const mountNode = document.getElementById("app")
ReactDOM.render(<App/>, mountNode);
