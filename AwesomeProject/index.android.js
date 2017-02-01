/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  Switch,
  Picker,
  TouchableHighlight,
} from 'react-native';
import ModalPicker from 'react-native-modal-picker'
import NativePicker from './src/native_picker'
import CanvasRenderer from './src/canvas_renderer'

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

export default class AwesomeProject extends Component {
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

  componentWillUpdate(nextProps, nextState) {
    this.webview.postMessage(JSON.stringify(nextState))
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={webview => { this.webview = webview }}
          style={styles.webview}
          source={ { html, baseUrl: "https://d1plo1d.com/poi?test=5" } }
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
            <View key={k}>
              <Text style={styles.settingsHeader}>
                {title}
              </Text>
              {/* Flower Petals */}
              <NativePicker
                title="Flower"
                value={this.state[k].petals}
                description={
                  `${this.state[k].petals} Petal ${
                    this.state[k].antispin ? 'Antispin' : 'Inspin'
                  }`
                }
                onValueChange={(petals) => this.setState({
                  [k]: {
                    ...this.state[k],
                    petals,
                  },
                })}
                data={
                  [
                    ...(this.state[k].antispin ? [] : [1, 2]),
                    3, 4, 5, 6, 7, 8
                  ].map(i => ({
                    label: `${i} Petals`,
                    key: i,
                    section: this.state[k].petals === i
                  }))
                }
              />
              {/* Antispin */}
              <View style={styles.settingsRow}>
                <View style={styles.settingsLabelContainer}>
                  <Text style={styles.settingsLabel}>Antispin</Text>
                </View>
                <Switch
                  style={styles.settingsControl}
                  onValueChange={(antispin) => this.setState({
                    [k]: {
                      ...this.state[k],
                      antispin,
                    },
                  })}
                  value={this.state[k].antispin}
                />
              </View>
              {/* End of settings */}
            </View>
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
  settingsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
  },
  settingsControl: {
    flex: 1,
  },
  settingsLabelContainer: {
    flexGrow: 1,
    flexDirection: "column",
  },
  settingsLabel: {
    color: "#333",
    // fontSize: 11,
  },
  settingsDescription: {
    color: "#999",
    fontSize: 11,
  },
  settingsHeader: {
    fontSize: 11,
    color: "rgb(0, 148, 133)",
    marginTop: 15,
    paddingLeft: 10,
  },
  picker: {
    flexDirection: "column",
  },
  pickerValue: {
    color: "#999",
    fontSize: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
