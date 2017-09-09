/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';

import {
  DeviceEventEmitter,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var {
   DeviceMotion
} = require('NativeModules');

export default class DonkeyRider extends Component {

  constructor(props) {
    super(props);
    this.state = {x: 0};
  }

  componentDidMount() {
	DeviceMotion.setDeviceMotionUpdateInterval(0.1);
    DeviceEventEmitter.addListener('DeviceMotionData', function (data) {
	  if (!data) {
		return;
      }
      this.setState({
        x: data.attitude.roll.toFixed(5),
      });
    }.bind(this));
	DeviceMotion.startDeviceMotionUpdates(function (data) {
	  if (!data) {
		return;
      }
      this.setState({
        x: data.attitude.roll.toFixed(5),
      });
    }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
            {this.state.x}
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
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
