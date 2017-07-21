/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  Text,
  TouchableHighlight,
} from 'react-native'
import DashboardScreen from './src/dashboard_screen'
import EditScreen from './src/edit_screen'
import ViewScreen from './src/view_screen'

export default class AwesomeProject extends Component {
  render() {
    const routes = {
      dashboard: {title: 'Dashboard'},
      edit: {title: 'Edit'},
      random: {title: 'Random'},
    }
    return (
      <Navigator
        initialRoute={{screen: "dashboard"}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                {
                  if (route.screen === 'dasboard') {
                    return null
                  } else {
                    return (
                      <TouchableHighlight onPress={() => navigator.pop()}>
                        <Text>Back</Text>
                      </TouchableHighlight>
                    );
                  }
                },
              RightButton: (route, navigator, index, navState) =>
                { return null },
              Title: (route, navigator, index, navState) =>
                { return (<Text>{routes[route.screen].title}</Text>) },
            }}
            style={{backgroundColor: 'gray'}}
          />
        }
        renderScene={(route, navigator) => (
          <View style={styles.container}>
            {(route.screen === 'dashboard') ?
              <DashboardScreen navigator={navigator}/>
              :
              null
            }
            {(route.screen === 'edit') ? <EditScreen/> : null}
            {(route.screen === 'random') ? <ViewScreen/> : null}
          </View>
        )}
      />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: 'stretch',
    alignSelf: "stretch",
    flexDirection: "column",
  },
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
