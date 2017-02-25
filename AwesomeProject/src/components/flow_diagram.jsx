import React from 'react'
import canvasRenderer from '../canvas_renderer'

export default class AnimatedFlowDiagram extends React.Component {
  renderer: null
  nextFrame: null

  componentDidMount() {
    this.renderer = canvasRenderer({
      canvas: this.refs.canvas,
      leftPattern: this.props.leftPattern,
      rightPattern: this.props.rightPattern,
    })

    this.drawFrame(this.props.radians)

    this.changeEventListeners('addEventListener')
  }

  componentWillReceiveProps(nextProps) {
    this.drawFrame(nextProps.radians)
  }

  componentWillUnmount() {
     this.changeEventListeners('removeEventListener')
  }

  changeEventListeners(action) {
    window[action]("resize", this.renderer.onResize)
    window[action]("orientationchange", this.renderer.onResize)
  }

  drawFrame(radians) {
    this.renderer.render(radians)
  }

  render() {
    return (
      <div style={this.props.style}>
        <canvas ref='canvas' />
      </div>
    )
  }

}
