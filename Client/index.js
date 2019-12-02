import {
  AppRegistry
} from 'react-native';
import React from 'react';
import {
  Provider
} from 'react-redux';
import App from './App';
import {
  name as appName
} from './app.json';
import {
  setSeizureDetection,
  store
} from './store';
import Bluetooth from './Bluetooth';
import {
  Device
} from 'react-native-ble-plx';

console.log('Start');

const MyHeadlessTask = async () => {

  stopProcessing = false

  var bl = new Bluetooth(["98:07:2D:26:6D:02", "54:6C:0E:52:CF:DC"])

  await bl.requestPermission()
  var devices = await bl.startDeviceScan()
  bl.connectDevices()


  zeroData = []
  oneData = []

  setInterval(function () {

    var datetime = new Date();
    var timestamp = datetime.toISOString();
    zeroData = bl.zeroData
    oneData = bl.oneData

    fetch('http://192.168.0.1:3000/api/data', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ZeroId: "98:07:2D:26:6D:02",
        ZeroData: zeroData,
        OneId: "54:6C:0E:52:CF:DC",
        OneData: oneData,
        Timestamp: timestamp
      })
    });    
  }, 1000)

};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);