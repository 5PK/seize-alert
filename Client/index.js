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
import { Device } from 'react-native-ble-plx';
import RNFS from 'react-native-fs';
import SeizureDetection from './SeizureDetection';
console.log('Start');

var path = RNFS.ExternalDirectoryPath + '/data.csv';

var header = "Sensor Data Collection +\n"


RNFS.writeFile(path, 'Data Collection SeizeAlert', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });

var counter = 0;
const MyHeadlessTask = async () => {

  stopProcessing = false

  var bl = new Bluetooth(["98:07:2D:26:6D:02", "54:6C:0E:52:CF:DC"])

  var seizureDetection = new SeizureDetection()

  await bl.requestPermission()
  var devices = await bl.startDeviceScan()

  bl.connectDevices()
  var dataJson = []

  setInterval(function () {

    var datetime = new Date();
    var timestamp = datetime.toISOString();

    rightArmData = bl.zeroData
    rightAnkleData = bl.oneData

    if (typeof rightArmData !== 'undefined' && rightArmData.length > 0
      && typeof rightAnkleData !== 'undefined' && rightAnkleData.length > 0) {

      var rightArmString = timestamp + "," + "98:07:2D:26:6D:02" + "," + rightArmData.toString();
      var rightAnkleString = timestamp + "," + "54:6C:0E:52:CF:DC" + "," + rightAnkleData.toString();

      dataJson.push({ limb: 'RA', data: rightArmData.toString(), timestamp: timestamp })
      dataJson.push({ limb: 'RL', data: rightAnkleData.toString(), timestamp: timestamp })

      counter++;
      RNFS.write(path, '\n' + rightArmString + '\n' + rightAnkleString, -1, 'utf8')
        .then((success) => {
          //console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });

      if (counter === 60) {
        console.log("FETCH")
        fetch(`http://192.168.0.19:6969/data`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            array: dataJson
          })
        });

        console.log("Suprise")
        counter = 0;
        dataJson = []
      }

      var isSeizure = seizureDetection.determine(rightArmData, rightAnkleData)
      console.log(isSeizure)

    }
  }, 1000)
}

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);