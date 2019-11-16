import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setSeizureDetection, store } from './store';
import Bluetooth from './Bluetooth';

console.log('Start');
const bl = new Bluetooth("98:07:2D:26:6D:02")

const MyHeadlessTask = async blu => {
    blu.requestPermission()
    blu.scanAndConnect()
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('SeizureAlert', bl => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
