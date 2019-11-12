/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { setHeartBeat, store } from './store';
import React from 'react';

const MyHeadlessTask = async () => {
    console.log('Receiving HeartBeat!');
    store.dispatch(setHeartBeat(true));
    setTimeout(() => {
      store.dispatch(setHeartBeat(false));
    }, 1000);
  };

const RNRedux = () => (
    <Provider store={store}>
      <App />
    </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
