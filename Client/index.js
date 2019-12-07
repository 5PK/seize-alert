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
import getEnvVars from './env.js'


var path = RNFS.ExternalDirectoryPath + '/data.csv';

RNFS.writeFile(path, 'Data Collection SeizeAlert', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });

var counter = 0;
const MyHeadlessTask = async () => {
  console.log("Headless Task Entry")
  stopProcessing = false

  var bl = new Bluetooth(["98:07:2D:26:6D:02", "54:6C:0E:52:CF:DC"])

  var seizureDetection = new SeizureDetection()

  await bl.requestPermission()

  await bl.startDeviceScan()

  bl.connectDevices()
  var dataJson = []

  var rightArmWindow = [];
  var rightAnkleWindow = [];

  setInterval(function () {
    var datetime = new Date();
    var timestamp = datetime.toISOString();

    rightArmData = bl.zeroData
    rightAnkleData = bl.oneData

    // console.log(rightArmData)
    // console.log(rightAnkleData)

    if (typeof rightArmData !== 'undefined' && rightArmData.length > 0
      && typeof rightAnkleData !== 'undefined' && rightAnkleData.length > 0) {

      var rightArmString = timestamp + "," + "Right Arm" + "," + rightArmData.toString();
      var rightAnkleString = timestamp + "," + "Right Ankle" + "," + rightAnkleData.toString();

      dataJson.push({ limb: 'RA', data: rightArmData.toString(), timestamp: timestamp })
      dataJson.push({ limb: 'RL', data: rightAnkleData.toString(), timestamp: timestamp })

      rightArmWindow.push(rightArmData)
      rightAnkleWindow.push(rightAnkleData)

      counter++;

      RNFS.write(path, '\n' + rightArmString + '\n' + rightAnkleString, -1, 'utf8')
        .then((success) => {
          //console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });

      if (counter === 60) {
        
        counter = 0;
        var isSeizure = seizureDetection.determine(rightArmWindow, rightAnkleWindow)
        console.log('Seizure Detection Result: ' + isSeizure)

        fetch(getEnvVars.apiUrl + `/data`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            array: dataJson
          })
        });

        dataJson = []
        rightArmWindow = [];
        rightAnkleWindow = [];
      }
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