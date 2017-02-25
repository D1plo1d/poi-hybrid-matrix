import React from 'react'
import ReactDOM from 'react-dom'
import FlowDiagram from './flow_diagram.jsx'
import 'font-awesome-webpack'

export default class TimeSliderFlowDiagram extends React.Component {
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
