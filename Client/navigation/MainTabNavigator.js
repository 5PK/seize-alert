import React from 'react';
import { Platform, View, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

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
 
};

const Contacts = createStackNavigator({
  Contact: ContactsListScreen,
  ContactProfile: ContactProfileScreen,
  ContactProfileCreate: ContactProfileCreateScreen,
  ContactProfileUpdate: ContactProfileUpdateScreen
});

Contacts.navigationOptions = {
  tabBarLabel: 'Contacts',
 

};

const ContactProfile = createStackNavigator({
  ContactProfile: ContactProfileScreen,
});

ContactProfile.navigationOptions = {
  tabBarLabel: 'ContactProfile',
 
};

const History = createStackNavigator({
  History: SeizureHistoryScreen,
});

History.navigationOptions = {
  tabBarLabel: 'Example',

};

export default createDrawerNavigator({
  Home,
  Contacts,
  History
}, {
    contentComponent: (props) => (
      <SafeAreaView >
        <View style={{ height: 220, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: 180, height: 180,marginTop:40 }}
            source={require('../assets/images/alerts.png')}
          />
          <Text style={{ fontSize: 32 }}>Seize Alert</Text>
        </View>
        <ScrollView style={{ marginTop:40}}>
          <DrawerItems {...props} />
        </ScrollView>
      </SafeAreaView>
    )

  });
