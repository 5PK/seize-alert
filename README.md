# Prototype Seizure Alert Mobile Application

Using previous research completed by a different team, this is the next step in creating a solution for epilepsy patients. This application was developed with the goal of providing the following functionality:

- Contact Management
- Seizure History Logging
- Writing extensible code for the future integration of sensor wearables
- Automatic emergency calling

Of the above goals, only automatic emergency calling is incomplete. However, this is because of the need for Native Code for development. Ejecting from Expo is required.

## SeizeAlert

### Client

The Client is written in Javascript using React Native.

#### Intallation

Prerequisites:

- Have Git installed.
- Access to a UNIX terminal. Git Bash on Windows.
- NPM installed https://www.npmjs.com/get-npm
- Expo installed 'npm install -g expo-cli'
- Have a mobile emulator installed. This comes default with the Android SDK when installing Android Studio if you're debugging on an Android Device.

1. Clone the repo
2. Enter the client directory
3. Change the correct local IP address in env.js. This is a User generated file that is currently ignored by git.
4. Run 'npm install'
5. Start the mobile device emulation. You can do this through Android Studio's AVD manager.    
6. Run 'npm start' This will start the app. Notice the 'Run on Android device' button. 
7. Click 'Run on Android device' on the app, this will start the app on the emulation


### Server

The server uses a MYSQL database, and is a node, express and sequelize deployment

#### Intallation

1. Enter the server directory
2. Run 'npm install'
3. Run 'npm start'



## Notes

### Setting up Env.js
Refer to this comment: https://github.com/CarlaSS1/SeizeAlert/pull/42#issuecomment-479645604
