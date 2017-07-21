import React from 'react'
import _ from 'lodash'
import canvasRenderer from '../canvas_renderer'

export default class AnimatedFlowDiagram extends React.Component {
  renderer: null
  nextFrame: null

  static defaultProps = {
    trailLength: Math.PI * 2/3,
    trailResolution: 0.01,
    decayLinearity: 2,
    showArms: true,
  }

  componentDidMount() {
    this.createRenderer()
    this.drawFrame(this.props.radians)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isMatch(this.props, _.omit(nextProps, ['radians']))) {
      this.createRenderer(nextProps)
    }
    this.drawFrame(nextProps.radians)
  }

  componentWillUnmount() {
     this.changeEventListeners('removeEventListener')
  }

  createRenderer(props = this.props) {
    this.renderer = canvasRenderer({
      canvas: this.refs.canvas,
      leftPattern: props.leftPattern,
      rightPattern: props.rightPattern,
      trailLength: props.trailLength,
      trailResolution: props.trailResolution,
      decayLinearity: props.decayLinearity,
      showArms: props.showArms,
    })

    this.changeEventListeners('addEventListener')
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
