import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Modal,
  ScrollView,
} from 'react-native';


export default class NativePicker extends Component {
  state = {
    modalVisible: false
  }

  render() {
    const {title, value, data, description} = this.props
    return (
      <View>
        <TouchableHighlight onPress={() => {
          this.setState({modalVisible: true})
        }}>
          <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>
              {
                description ||
                (data.find(entry => entry.key === value )||{}).label
              }
            </Text>
          </View>
        </TouchableHighlight>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setState({modalVisible: false})}}
        >
          <ScrollView>
            {data.map(({key, label, selection}) =>
              <TouchableHighlight
                key={key}
                onPress={() => {
                  this.setState({modalVisible: false})
                  this.props.onValueChange(key)
                }}
              >
                <View style={styles.row}>
                  <Text>{label}</Text>
                </View>
              </TouchableHighlight>
            )}
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: 'center',
    height: 50,
    paddingLeft: 10,
  },
  title: {
    color: "#333",
    // fontSize: 11,
  },
  description: {
    color: "#999",
    fontSize: 11,
  },
});
