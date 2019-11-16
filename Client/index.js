import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setSeizureDetection, store } from './store';
import Bluetooth from './Bluetooth';

const MyHeadlessTask = async () => {
    console.log('Start');
    var bl = new Bluetooth("98:07:2D:26:6D:02")
    bl.requestPermission()
    bl.scanAndConnect()
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
