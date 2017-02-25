import React from 'react'
import ReactDOM from 'react-dom'
import AnimatedFlowDiagram from '../src/components/animated_flow_diagram.jsx'

const App = () => (
  <AnimatedFlowDiagram radians={Math.PI}/>
)

const mountNode = document.getElementById("app")
ReactDOM.render(<App/>, mountNode);
