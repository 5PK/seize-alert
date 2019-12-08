import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import SeizureAlert from './SeizureAlert';
import logo from './logo.png';

// Style sheets.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 25,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

// Rendering for Seizure alert.
const App = ({ heartBeat }) => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={logo} style={{ width: 250, height: 250 }} resizeMode="contain" />
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button} onPress={() => SeizureAlert.startService()}>
          <Text style={styles.instructions}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => SeizureAlert.stopService()}>
          <Text style={styles.instructions}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
});

export default connect(mapStateToProps)(App);
