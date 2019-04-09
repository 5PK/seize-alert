import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ContactsListScreen from '../screens/ContactsListScreen';
import ContactProfileScreen from '../screens/ContactProfileScreen';

import ContactProfileCreateScreen from '../screens/ContactProfileCreateScreen';
import ContactProfileUpdateScreen from '../screens/ContactProfileUpdateScreen';
import SeizureHistoryScreen from '../screens/SeizureHistory';


const Home = createStackNavigator({
  Home: HomeScreen,
});

Home.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const Contacts = createStackNavigator({
  Contact: ContactsListScreen,
  ContactProfile: ContactProfileScreen,
  ContactProfileCreate: ContactProfileCreateScreen,
  ContactProfileUpdate: ContactProfileUpdateScreen
});

Contacts.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),

};

const ContactProfile = createStackNavigator({
  ContactProfile: ContactProfileScreen,
});

ContactProfile.navigationOptions = {
  tabBarLabel: 'ContactProfile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};  

const History = createStackNavigator({
  History: SeizureHistoryScreen,
});

History.navigationOptions = {
  tabBarLabel: 'Example',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};
 
export default createDrawerNavigator({
  Home,
  Contacts,
  History
});
