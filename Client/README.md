## Client

The Client is written in Javascript using React Native.

### Prerequisites

- Have Git installed.
- Access to a UNIX terminal. Git Bash on Windows.
- NPM installed https://www.npmjs.com/get-npm
- Have a mobile emulator installed. This comes default with the Android SDK when installing Android Studio if you're debugging on an Android Device.

### Installation

1. Clone the repo
2. Enter the Client directory
3. Create local.properties file in the android directory.
4. In local.poperties add the location of your android SDK as shown below. 
   sdk.dir=C\:\\Users\\UserName\\AppData\\Local\\Android\\sdk
5. Set up Client/env.js **Refer to this comment: https://github.com/CarlaSS1/SeizeAlert/pull/42#issuecomment-479645604**
5. Run 'npm install'
6. Start the mobile device emulation. You can do this through Android Studio's AVD manager.    
7. Run 'npm start' This will start the app. Notice the 'Run on Android device' button. 
8. Click 'Run on Android device' on the app, this will start the app on the emulation
