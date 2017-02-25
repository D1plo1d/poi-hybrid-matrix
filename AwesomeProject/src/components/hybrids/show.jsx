import React from 'react'
import ReactDOM from 'react-dom'
import FlowDiagram from '../flow_diagram.jsx'
import TimeSliderFlowDiagram from '../time_slider_flow_diagram.jsx'

export default (patterns) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      height: 'calc(100vh - 10px)',
      width: 'calc(100vw - 40px)',
      paddingTop: 5,
      paddingLeft: 20,
    }}
  >
    <TimeSliderFlowDiagram
      {...patterns}
      style={{
        flexGrow: 1,
        marginRight: 10,
      }}
    />
    <div
      style={{
        width: '20vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {
        [0, .5, 1, 1.5].map((i) => (
          <div key={i}>
            <FlowDiagram
              {...patterns}
              radians={i * Math.PI}
            />
          </div>
        ))
      }
    </div>
  </div>

)
