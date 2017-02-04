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
        <View style={styles.settings}>
          {/*
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>
              Split Time
            </Text>
            <Switch
              style={styles.settingsControl}
              onValueChange={(splitTime) => this.setState({splitTime})}
              value={this.state.splitTime}
            />
          </View>
          */}
          {[
            {k: 'leftPattern', title: 'Left Hand'},
            {k: 'rightPattern', title: 'Right Hand'},
          ].map(({k, title}) =>
            <PatternForm
              key={k}
              title={title}
              pattern={this.state[k]}
              onPatternChange={(pattern) => this.setState({[k]: pattern})}
            />
          )}
        </View>
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
  settings: {
    flexDirection: "column",
    flex: 1,
  },
})
