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
        console.log(id)
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
        this.zeroWindow = []
        this.oneWindow = []
        this.singleBuffer = []
        this.windowBufferCount = 0
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
            this.zeroWindow.push(convertedAccelerationData)
        }
        else if(id == "54:6C:0E:52:CF:DC"){
            this.oneWindow.push(convertedAccelerationData)
        }

        console.log('oneWindow',this.oneWindow.length )
        console.log('zeroWindow',this.zeroWindow.length )

        console.log(this.zeroWindow.length == 2 && this.oneWindow.length == 2 )
        if ( this.zeroWindow.length == 2 && this.oneWindow.length == 2 ) {
            console.log('idss', id)
            this.seizureDetector.determine(this.zeroWindow,this.oneWindow)
            this.zeroWindow = []
            this.oneWindow = []
            
        }
    }
    updateValue(key,value, id) {
        console.log("Reading Values: " + id)
        var byteArray = base64js.toByteArray(value)
        var accelerationX = this.byteArrayToInteger(byteArray, 5)
        var accelerationY = this.byteArrayToInteger(byteArray, 7)
        var accelerationZ = this.byteArrayToInteger(byteArray, 9)

        var accelerationData = [accelerationX, accelerationY, accelerationZ]
        /*
        Raw values 0-65535
        Convert to 0-2 range
        
        cx = (rv/65536.0) * 2 -2/20
        */

        var convertedX = ((accelerationX / 65536.0) * 2) - (2 / 20)
        var convertedY = ((accelerationY / 65536.0) * 2) - (2 / 20)
        var convertedZ = ((accelerationZ / 65536.0) * 2) - (2 / 20)
        var convertedAccelerationData = [convertedX, convertedY, convertedZ]
        
        this.addToWindow(id,convertedAccelerationData)

        // fetch(`http://192.168.0.19:6969/data`, {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         x: convertedX,
        //         y: convertedY,
        //         z: convertedZ,
        //         mac: id
        //     })
        // });

    }
    RunConnection(device) {
        console.log('device', device.id)

        device.connect()
            .then((device) => {
                //this.info("Discovering services and characteristics")
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
                //this.info("Setting notifications")
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
