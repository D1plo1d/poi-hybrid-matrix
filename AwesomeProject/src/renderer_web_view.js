import React, { Component } from 'react'
import {
  WebView,
} from 'react-native'
import CanvasRenderer from './canvas_renderer'

const debugHTML = false

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
