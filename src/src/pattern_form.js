import React, { Component } from 'react'
import {
 StyleSheet,
 Text,
 View,
 Switch,
} from 'react-native'
import ModalPicker from 'react-native-modal-picker'
import NativePicker from './native_picker'

export default ({
  title,
  pattern,
  onPatternChange,
}) => {
  const onInputChange = key => value => {
    const nextPattern = { ...pattern, [key]: value }
    if (nextPattern.petals < 3 && nextPattern.antispin) nextPattern.petals = 3
    onPatternChange(nextPattern)
  }

  return <View>
    <Text style={styles.title}>
      {title}
    </Text>
    {/* Flower Petals */}
    <NativePicker
      title="Flower"
      value={pattern.petals}
      description={
        `${pattern.petals} Petal ${pattern.antispin ? 'Antispin' : 'Inspin'}`
      }
      onValueChange={onInputChange('petals')}
      data={
        [
          ...(pattern.antispin ? [] : [1, 2]),
          3, 4, 5,
        ].map(i => ({
          label: `${i} Petals`,
          key: i,
          section: pattern.petals === i
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
        onValueChange={onInputChange('antispin')}
        value={pattern.antispin}
      />
    </View>

  </View>
}


const styles = StyleSheet.create({
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
  title: {
    fontSize: 11,
    color: "rgb(0, 148, 133)",
    marginTop: 15,
    paddingLeft: 10,
  },
})
