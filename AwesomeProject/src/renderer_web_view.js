import React, { Component } from 'react'
import {
  WebView,
} from 'react-native'
import CanvasRenderer from './canvas_renderer'

const debugHTML = false


// TODO: figure out how to bring this back into the Android webview
// export const webViewContent = {
//   const canvas = document.getElementById("canvas")
//
//   const {onResize, renderer, render} = Renderer(canvas)
//
//   window.addEventListener("resize", onResize)
//   window.addEventListener("orientationchange", onResize)
//
//   document.addEventListener("message", (event) => {
//     const state = JSON.parse(event.data)
//     renderer.leftPattern = flower({
//       inspin: !state.leftPattern.antispin,
//       petals: state.leftPattern.petals,
//       forward: true,
//       invert: false,
//       horizontal: false,
//       position: 'bottom',
//       boxPattern: true,
//       offset: 0,
//     })
//     renderer.rightPattern = flower({
//       inspin: !state.rightPattern.antispin,
//       petals: state.rightPattern.petals,
//       forward: false,
//       invert: true,
//       horizontal: false,
//       position: 'bottom',
//       boxPattern: true,
//       offset: state.splitTime ? 0 : Math.PI / 2,
//     })
//   })
//
//   window.requestAnimationFrame(render)
// }

const html = `
  <html debug="true">
    <head>
    ${
      debugHTML ?
        `
          <script
            type="text/javascript"
            src="https://getfirebug.com/firebug-lite.js"
          >
          </script>
        `
      : ""
    }
    </head>
    <body style="margin: 0px">
      <canvas id="canvas" style="margin: 0px"></canvas>
      <script> (${CanvasRenderer.toString()})() </script>
    </body>
  </html>
`


export default class RendererWebView extends Component {
  componentWillUpdate(nextProps) {
    this.webview.postMessage(JSON.stringify(nextProps))
  }

  render() {
    return (
      <WebView
        ref={webview => { this.webview = webview }}
        style={this.props.style}
        source={ { html, baseUrl: "https://d1plo1d.com/poi?test=5" } }
      />
    )
  }
}
