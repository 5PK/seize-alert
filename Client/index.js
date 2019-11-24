import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setSeizureDetection, store } from './store';
import Bluetooth from './Bluetooth';

console.log('Start');


const MyHeadlessTask = async () => {
  bluetoothOne = new Bluetooth("98:07:2D:26:6D:02")
  bluetoothTwo = new Bluetooth("54:6C:0E:52:CF:DC")
  
  bluetoothOne.requestPermission()
  bluetoothOne.scanAndConnect()

  bluetoothTwo.requestPermission()
  bluetoothTwo.scanAndConnect()
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
