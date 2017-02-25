import React from 'react'
import ReactDOM from 'react-dom'
import FlowDiagram from '../src/components/flow_diagram.jsx'
import flower from '../src/patterns/flower.js'
import 'font-awesome-webpack'

class TimeSliderFlowDiagram extends React.Component {
  state = {
    radians: 0,
    paused: false,
  }

  componentWillMount() {
    this.startAnimation()
  }

  componentWillUnmount() {
     this.stopAnimation()
     this.changeEventListeners('removeEventListener')
  }

  startAnimation() {
    this.previousFrameTime = null
    window.requestAnimationFrame(this.animate)
  }

  animate = (time = Date.now()) => {
    const delta = time - (this.previousFrameTime || time)
    this.previousFrameTime = time
    this.setState({
      radians: ((this.state.radians||0) + delta * 0.001) % (Math.PI * 2),
    })
    this.nextFrame = window.requestAnimationFrame(this.animate)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.paused !== this.state.paused) {
      if (nextState.paused) {
        window.cancelAnimationFrame(this.nextFrame)
      } else {
        this.startAnimation()
      }
    }
  }

  onSliderChange = (event) => {
    this.setState({
      radians: parseFloat(event.target.value),
    })
  }

  togglePaused = () => {
    this.setState({
      paused: !this.state.paused
    })
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        ...this.props.style,
      }}>
        <FlowDiagram
          leftPattern={this.props.leftPattern}
          rightPattern={this.props.rightPattern}
          radians={this.state.radians}
          style={{flexGrow: 1}}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <div
            onClick={this.togglePaused}
            style={{
              marginTop: -5,
              color: '#555',
            }}
          >
            <i
              className={`fa ${this.state.paused ? 'fa-play' : 'fa-pause'}`}
            />
          </div>
          <input
            ref="slider"
            type="range"
            min={0}
            max={Math.PI*2}
            step={Math.PI/360}
            value={this.state.radians}
            onChange={this.onSliderChange}
            style={{
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 10,
              flexGrow: 1,
            }}
          />
        </div>
      </div>
    )
  }
}

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

const App = () => (
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

const mountNode = document.getElementById("app")
ReactDOM.render(<App/>, mountNode);
