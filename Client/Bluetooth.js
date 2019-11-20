import {
  PermissionsAndroid
} from 'react-native';
import {
  BleManager
} from 'react-native-ble-plx';
import base64js from 'base64-js';
import SeizureDetection from './SeizureDetection';

export default class Bluetooth {

  constructor(id) {
      console.log(id)
      this.manager = new BleManager()
      this.state = {
          info: "",
          values: {},
          permissionStatus: 'denied',
          bluetoothStatus: 'disabled',
          seizureDetected: false
      }
      this.id = id
      this.prefixUUID = "f000aa"
      this.suffixUUID = "-0451-4000-b000-000000000000"
      this.sensors = {
          8: "Accelerometer"
      }
      this.seizureDetector = new SeizureDetection();
  }
  async requestPermission() {
      try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              return true;
          } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
              return false;
          } else {
              //console.log('never-ask-again');
          }
      } catch (err) {
          console.error(err)
      }
  }

  serviceUUID(num) {
      return this.prefixUUID + num + "0" + this.suffixUUID
  }
  notifyUUID(num) {
      return this.prefixUUID + num + "1" + this.suffixUUID
  }
  writeUUID(num) {
      return this.prefixUUID + num + "2" + this.suffixUUID
  }
  info(message) {
      this.state.info = message
  }
  error(message) {
      this.state.info = "ERROR: " + message
  }
  byteArrayToInteger(byteArray, startPosition) {
      var Uint16_Num = new Uint16Array(1)
      Uint16_Num[0] = 0
      var Multiplier = 1

      for (i = 0; i < 2; i++) {
          var valueToCalculate = (Uint16_Num[0] + byteArray[startPosition + i]) * Multiplier
          Uint16_Num[0] = valueToCalculate
          Multiplier = Multiplier * 256
      }
      return Uint16_Num[0]
  }
  detectSeizure(data) {
      var seizureDetected = this.seizureDetector.determine(data)
      if (seizureDetected) {
          this.state.seizureDetected = true
      }
  }
  updateValue(key, value) {
      var byteArray = base64js.toByteArray(value)
      var accelerationX = this.byteArrayToInteger(byteArray, 5)
      var accelerationY = this.byteArrayToInteger(byteArray, 7)
      var accelerationZ = this.byteArrayToInteger(byteArray, 9)

      var accelerationData = [accelerationX, accelerationY, accelerationZ]
      
      fetch(`http://192.168.0.24:6969/data`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          x: accelerationX,
          y: accelerationY,
          z: accelerationZ,
          mac: this.id
        })
      });
      
      this.detectSeizure(accelerationData)
  }
  scanAndConnect() {

      this.manager.startDeviceScan(null, null, (error, device) => {
          this.info("Scanning...")
          console.log(device)

          if (error) {
              this.error(error.message)
              return
          }
          console.log(this.id + " TEST")
          if (device.id == this.id) {
              console.log(device.localName)
              console.log(device.id)
              this.info("Connecting to TI Sensor")
              this.manager.stopDeviceScan()
              device.connect()
                  .then((device) => {
                      this.info("Discovering services and characteristics")
                      return device.discoverAllServicesAndCharacteristics()
                  })
                  .then((device) => {
                      this.info("Setting notifications")
                      return this.setupNotifications(device)
                  })
                  .then(() => {
                      this.info("Listening...")
                  }, (error) => {
                      this.error(error.message)
                  })
          }
      });
  }
  async setupNotifications(device) {
      for (const id in this.sensors) {
          const service = this.serviceUUID(id)
          const characteristicW = this.writeUUID(id)
          const characteristicN = this.notifyUUID(id)
          const hexCode = "";
          if (id != 8 && id != 5) {
              hexCode = "AQ=="
          } else {
              hexCode = "MDE="
          }
          const characteristic = await device.writeCharacteristicWithResponseForService(
              service, characteristicW, hexCode /* 0x01 in hex */
          )
          device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
              if (error) {
                  this.error(error.message)
                  return
              }
              this.updateValue(characteristic.uuid, characteristic.value)
          })
      }
  }
}
