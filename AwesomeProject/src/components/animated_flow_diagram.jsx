import React from 'react'
import canvasRenderer from '../canvas_renderer'

export default class AnimatedFlowDiagram extends React.Component {
  renderer: null
  nextFrame: null

  componentDidMount() {
    this.renderer = canvasRenderer(this.refs.canvas)
    if (this.props.radians == null) {
      this.animate()
    } else {
      this.drawFrame(this.props.radians)
    }

    this.changeEventListeners('addEventListener')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.radians !== props.radians) {
      if (nextProps.radians == null) {
        this.animate()
      } else {
        this.stopAnimation()
        this.drawFrame(nextProps.radians)
      }
    }
  }

  componentWillUnmount() {
     this.stopAnimation()
     this.changeEventListeners('removeEventListener')
  }

  changeEventListeners(action) {
    window[action]("resize", this.renderer.onResize)
    window[action]("orientationchange", this.renderer.onResize)
  }

  drawFrame(radians) {
    this.renderer.render(radians)
  }

  animate = (radians = Date.now()) => {
    drawFrame(radians)
    this.nextFrame = window.requestAnimationFrame(this.animate)
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.nextFrame)
  }

  render() {
    return <canvas ref='canvas' />
  }
  // const slider = document.getElementById("timeSlider")
  // slider.addEventListener("input", () => {
  //   renderer(slider.value * Math.PI * 2 / 100 / 0.001)
  // })
  //
  // renderer(slider.value)
  // render = (t) => {
  //   renderer(t)
  //   window.requestAnimationFrame(render)
  // }
}
