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

    stopProcessing = false

    var bl = new Bluetooth(["98:07:2D:26:6D:02","54:6C:0E:52:CF:DC"])

    await bl.requestPermission()
    var devices = await bl.startDeviceScan()
    
    bl.connectDevices()

    zeroData = []
    oneData = []

    while(!stopProcessing){      
      if(bl.devices[0].isDeviceConnected() && bl.devices[1].isDeviceConnected() ){
        if(bl.oneIsProcessing && bl.zeroIsProcessing){
          setTimeout(function(){

            zeroData = bl.zeroData
            oneData = bl.oneData
            
            fetch(`http://192.168.0.19:6969/data`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    zeroId: "98:07:2D:26:6D:02",
                    zeroData: zeroData,
                    oneId: "54:6C:0E:52:CF:DC",
                    oneData: oneData
                })
            });
          },1000)
        }
      }
    }
      
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('SeizureAlert', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
