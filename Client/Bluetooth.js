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

/**
 * Bluetooth connectivity, functionality, and seizure detection class for the
 * sensor tags.
 */
export default class Bluetooth {

    /**
     * Create an instance of bluetooth class with id of a sensor tag.
     * @param {any} id id of a sensor tag 
     */
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

    /**
     * Asynchronously requests permission of the owner of the android device to access user's location information.
     * @returns
     * true: Permission granted by the user.
     * false: permission denied by the user.
     */
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

    /**
     * Returns the service UUID of the sensor tag?
     * @param {*} num UUID of the tag.
     * @returns serivceUUID
     */
    serviceUUID(num) {
        return this.prefixUUID + num + "0" + this.suffixUUID
    }

    /**
     * Returns the prefix UUID of the sensor tag.
     * @param {*} num UUID of the tag.
     * @returns prefixUUID
     */
    notifyUUID(num) {
        return this.prefixUUID + num + "1" + this.suffixUUID
    }

    /**
     * Returns write UUID of the sensor tag.
     * @param {*} num UUID of the tag.
     * @returns writeUUID
     */
    writeUUID(num) {
        return this.prefixUUID + num + "2" + this.suffixUUID
    }

    /**
     * Stores the state of the bluetooth connectivity between the phone and sensor tag.
     * @param {*} message message recieved from bluetooth connectivity of the phone.
     */
    info(message) {
        this.state.info = message
    }

    /**
     * Stores error message into state.
     * @param {*} message Error receieved during bluetooth connectivity between phone and sensor tag.
     */
    error(message) {
        this.state.info = "ERROR: " + message
    }

    /**
     * Converts a byte array to an unsigned 16 bit integer.
     * @param {any} byteArray byte array received from sensor data.
     * @param {any} startPosition Starting position of a byte array.
     * @returns an unsigned 16 bit integer.
     */
    byteArrayToInteger(byteArray, startPosition) {
        var int16_Num = new Int16Array(1)
        int16_Num[0] = 0
        var Multiplier = 1

        for (i = 0; i < 2; i++) {
            var valueToCalculate = (int16_Num[0] + byteArray[startPosition + i]) * Multiplier
            int16_Num[0] = valueToCalculate
            Multiplier = Multiplier * 256
        }
        return int16_Num[0]
    }

    /**
     * Checks if a seizure has been data based of the data received from the sensor.
     * @param {any} data data receieved from sensor tag.
     */
    detectSeizure(data) {
        var seizureDetected = this.seizureDetector.determine(data)

        // Was a seizure detected?
        if (seizureDetected) {
            this.state.seizureDetected = true
        }
    }
    
    /**
     * Add to the window id of the sensor tag (currently hard coded) and the converted acceleration data.
     * @param {any} id id of the sensor tag.
     * @param {any} convertedAccelerationData Converted acceleration data
     */
    addToWindow(id, convertedAccelerationData) {

        if (id == "98:07:2D:26:6D:02") {
            this.zeroIsProcessing = true
            this.zeroData = convertedAccelerationData
        }
        else if (id == "54:6C:0E:52:CF:DC") {
            this.oneIsProcessing = true
            this.oneData = convertedAccelerationData
        }

    }

    /**
     * Update value received from the sensor tag and convert it to acceleration data that is to be added to the window.
     * @param {any} key key of the sensor tag.
     * @param {any} value data received from sensor tag.
     * @param {any} id id of the sensor tag
     */
    updateValue(key, value, id) {

        var byteArray = base64js.toByteArray(value)
        var accelerationX = this.byteArrayToInteger(byteArray, 5)
        var accelerationY = this.byteArrayToInteger(byteArray, 7)
        var accelerationZ = this.byteArrayToInteger(byteArray, 9)

        var convertedX = ((accelerationX * 1.0) / (32768 / 2))
        var convertedY = ((accelerationY * 1.0) / (32768 / 2))
        var convertedZ = ((accelerationZ * 1.0) / (32768 / 2))
        var convertedAccelerationData = [convertedX, convertedY, convertedZ]

        this.addToWindow(id, convertedAccelerationData)
    }

    /**
     * Run a connection to check if the android device is still connected to the sensor tag through bluetooth.
     * @param {any} device sensor tag that is connected to the android device.
     * @returns a promise that checks for the device and sets up notifications
     */
    RunConnection(device) {
        console.log('device', device.id)
        
        // Promise: When the device is connected to the android phone.
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

    /**
     * Asynchronously connect the sensor tags into the android device.
     */
    async connectDevices() {
        var devices = this.devices

        this.RunConnection(devices[0])
        this.RunConnection(devices[1])

    }
    
    /**
     * Scan for sensor tags from the android device and return a promise that searches for an sensor tag.
     * Based off the length of sensor tag's id
     * 
     * @returns a promise that scans and adds sensor tags nearby.
     */
    startDeviceScan() {
        return new Promise((resolve, reject) => {
            this.manager.startDeviceScan(null, null, (err, device) => {
                if (err) {
                    reject(err.message)
                }
                
                // Does the sensor tag contain a device id?
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

    /**
     * Set up notification from the sensor tag.
     * @param {any} device sensor tag connected to the android device via bluetooth.
     * @returns null
     */
    async setupNotifications(device)    {
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
