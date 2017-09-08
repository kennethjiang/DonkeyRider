/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter
} from 'react-native';
import { SensorManager } from 'NativeModules';

export default class DonkeyRider extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {azimuth: 0}};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.data.azimuth}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Button
          onPress={() => {
            DeviceEventEmitter.addListener('Accelerometer', function (data) {
              this.setState({data});
            });
            SensorManager.startAccelerometer(100);
          }}
          title="Press Me"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DonkeyRider', () => DonkeyRider);
