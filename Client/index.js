import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setSeizureDetection, store } from './store';
import Bluetooth from './Bluetooth';
import { Device } from 'react-native-ble-plx';

console.log('Start');

function isArray(value) {
  return Array.isArray(value);
}
const MyHeadlessTask = async () => {

    var bl = new Bluetooth(["98:07:2D:26:6D:02","54:6C:0E:52:CF:DC"])


    console.log('test1', )
    var devices = await bl.startDeviceScan()
    console.log('devices', devices)
    
    bl.connectDevices()
    
    // device.connect()
    // .then((device) => {
    //   bl.info("Discovering services and characteristics")
    //     return device.discoverAllServicesAndCharacteristics()
    // })
    // .then((device) => {
    //   bl.info("Setting notifications")
    //     return bl.setupNotifications(device)
    // })
    // .then(() => {
    //   bl.info("Listening...")
    // }, (error) => {
    //   bl.error(error.message)
    // })
    
      
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
