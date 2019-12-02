import {
    PermissionsAndroid
} from 'react-native';
import {
    BleManager
} from 'react-native-ble-plx';
import base64js from 'base64-js';
import SeizureDetection from './SeizureDetection';
import {
    arrayExpression
} from '@babel/types';

export default class Bluetooth {

    constructor(id) {

        this.manager = new BleManager()
        this.state = {
            info: "",
            values: {},
            permissionStatus: 'denied',
            bluetoothStatus: 'disabled',
            seizureDetected: false
        }
        this.ids = id
        this.prefixUUID = "f000aa"
        this.suffixUUID = "-0451-4000-b000-000000000000"
        this.sensors = {
            8: "Accelerometer"
        }
        this.seizureDetector = new SeizureDetection();
        this.devices = []
        this.zeroData = []
        this.oneData = []
        this.singleBuffer = []
        this.zeroIsProcessing = false
        this.oneIsProcessing = false
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
    addToWindow(id, convertedAccelerationData) {

        if (id == "98:07:2D:26:6D:02"){
            this.zeroIsProcessing = true
            this.zeroData = convertedAccelerationData
        }
        else if(id == "54:6C:0E:52:CF:DC"){
            this.oneIsProcessing = true
            this.oneData = convertedAccelerationData
        }

    }
    updateValue(key,value, id) {

        var byteArray = base64js.toByteArray(value)
        var accelerationX = this.byteArrayToInteger(byteArray, 5)
        var accelerationY = this.byteArrayToInteger(byteArray, 7)
        var accelerationZ = this.byteArrayToInteger(byteArray, 9)

        var convertedX = ((accelerationX * 1.0 ) / (32768 / 2))
        var convertedY = ((accelerationY * 1.0 ) / (32768 / 2))
        var convertedZ = ((accelerationZ * 1.0 ) / (32768 / 2))
        var convertedAccelerationData = [convertedX, convertedY, convertedZ]
        
        this.addToWindow(id,convertedAccelerationData)
    }
    RunConnection(device) {
        console.log('device', device.id)

        device.connect()
            .then((device) => {
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
                return this.setupNotifications(device)
            })
            .then(() => {
                //this.info("Listening...")
                
            }, (error) => {
                this.error(error.message)
            })
    }
    async connectDevices() {
        var devices = this.devices

        this.RunConnection(devices[0])
        this.RunConnection(devices[1])

    }
    startDeviceScan() {
        return new Promise((resolve, reject) => {
            this.manager.startDeviceScan(null, null, (err, device) => {
                if (err) {
                    reject(err.message)
                }
                if (this.ids.includes(device.id)) {
                    this.devices.push(device)
                    if (this.devices.length === this.ids.length) {
                        this.manager.stopDeviceScan()
                        resolve(this.devices)
                    }
                }
            })
        })
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
                this.updateValue(characteristic.uuid, characteristic.value, device.id)
            })
        }
    }
}
