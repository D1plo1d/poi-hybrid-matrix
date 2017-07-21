import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  WebView,
} from 'react-native'
import ModalPicker from 'react-native-modal-picker'
import NativePicker from './native_picker'
import RendererWebView from './renderer_web_view'
import PatternForm from './pattern_form'

export default class EditScreen extends Component {
  state = {
    // oppositeDirections: true,
    splitTime: true,
    leftPattern: {
      antispin: false,
      petals: 3,
    },
    rightPattern: {
      antispin: false,
      petals: 3,
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <RendererWebView
          {...this.state}
          style={styles.webview}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: "stretch",
    flexDirection: "row",
  },
  webview: {
    margin: 0,
    alignSelf: "stretch",
    flex: 1,
  },
})
