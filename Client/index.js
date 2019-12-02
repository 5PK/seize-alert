import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setSeizureDetection, store } from './store';
import Bluetooth from './Bluetooth';
import { Device } from 'react-native-ble-plx';
import RNFS from 'react-native-fs';
console.log('Start');

var path = RNFS.ExternalDirectoryPath + '/data.txt';

RNFS.writeFile(path, 'Data Collection SeizeAlert', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });

console.log(path);
const MyHeadlessTask = async () => {

  stopProcessing = false

  // var bl = new Bluetooth(["98:07:2D:26:6D:02","54:6C:0E:52:CF:DC"])

  // await bl.requestPermission()
  // var devices = await bl.startDeviceScan()

  // bl.connectDevices()

  // zeroData = []
  // oneData = []

  while (!stopProcessing) {
    console.log("Test")
    //if(devices[0].isDeviceConnected && devices[1].isDeviceConnected ){
    //if(bl.oneIsProcessing && bl.zeroIsProcessing){
    setTimeout(function () {

      RNFS.write(path, 'Test', 'utf8')
        .then((success) => {
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });

      // var datetime = new Date();
      // var timestamp = datetime.toISOString();
      // zeroData = bl.zeroData
      // oneData = bl.oneData

      // fetch(`http://localhost:3000/api/data`, {
      //     method: "POST",
      //     headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //         ZeroId: "98:07:2D:26:6D:02",
      //         ZeroData: zeroData,
      //         OneId: "54:6C:0E:52:CF:DC",
      //         OneData: oneData,
      //         Timestamp: timestamp
      //     })
      // });
    }, 1000)
  }
  //}
  //}

};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
