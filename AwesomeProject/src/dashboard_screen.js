import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  WebView,
  Text,
} from 'react-native'
import ModalPicker from 'react-native-modal-picker'
import NativePicker from './native_picker'
import RendererWebView from './renderer_web_view'
import PatternForm from './pattern_form'

export default ({navigator}) => (
  <View style={styles.container}>
    <Text onPress={() => navigator.push({screen: 'edit'})}>
      Create Hybrid
    </Text>
    <Text onPress={() => navigator.push({screen: 'random'})}>
      Random Hybrid
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: "stretch",
    flexDirection: "column",
  },
})
