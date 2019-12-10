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

// Promise: Write Seizure data into a csv file.
RNFS.writeFile(path, 'Data Collection SeizeAlert', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });

var counter = 0;

// (Async) Start Headless task for the sensor tag that is connected to the android device.
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

  // Set the interval for detecting seizure data.
  setInterval(function () {
    var datetime = new Date();
    var timestamp = datetime.toISOString();

    rightArmData = bl.zeroData
    rightAnkleData = bl.oneData

    // Display arm and ankle data for debugging purposes.
    // console.log(rightArmData)
    // console.log(rightAnkleData)

    // Is the data undefined?
    if (typeof rightArmData !== 'undefined' && rightArmData.length > 0
      && typeof rightAnkleData !== 'undefined' && rightAnkleData.length > 0) {

      var rightArmString = timestamp + "," + "Right Arm" + "," + rightArmData.toString();
      var rightAnkleString = timestamp + "," + "Right Ankle" + "," + rightAnkleData.toString();

      dataJson.push({ limb: 'RA', x: rightArmData[0], y: rightArmData[1], z: rightArmData[2], timestamp: timestamp })
      dataJson.push({ limb: 'RL', x: rightAnkleData[0], y: rightAnkleData[1], z: rightAnkleData[2], timestamp: timestamp })
      rightArmWindow.push(rightArmData)
      rightAnkleWindow.push(rightAnkleData)

      counter++;

      // Promise: Write it to the CSV file.
      RNFS.write(path, '\n' + rightArmString + '\n' + rightAnkleString, -1, 'utf8')
        .then((success) => {
          //console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });

      if (counter === 15) {

        counter = 0;
        var isSeizure = seizureDetection.determine(rightArmWindow, rightAnkleWindow)
        console.log('Seizure Detection Result: ' + isSeizure)

        if (isSeizure) {
          fetch(getEnvVars.apiUrl + `/sms`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })

          fetch(getEnvVars.apiUrl + `/seizure`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              dateOccured: timestamp,
            })
          });
  
        }

        fetch(getEnvVars.apiUrl + `/data`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            array: dataJson,
            isSeizure: isSeizure,
            dateOccurred: Date.now()
          })
        });

        dataJson = []
        rightArmWindow = [];
        rightAnkleWindow = [];
      }
    }
  }, 1000)
}

// Revisit, be sure to ask what this is.
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);