import React from 'react';
import { Alert, View, Text, ScrollView, Image, AsyncStorage } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
/* import ContactsListScreen from '../screens/ContactsListScreen';
import ContactProfileScreen from '../screens/ContactProfileScreen';

import ContactProfileCreateScreen from '../screens/ContactProfileCreateScreen';
import ContactProfileUpdateScreen from '../screens/ContactProfileUpdateScreen'; */
import SeizureHistoryScreen from '../screens/SeizureHistory';
import { Button, Icon } from 'react-native-elements';


const Home = createStackNavigator({
  Home: HomeScreen
},
  {
    headerLayoutPreset: 'center'
  }
);

Home.navigationOptions = {
  tabBarLabel: 'Home',

};

/* const Contacts = createStackNavigator({
  Contact: ContactsListScreen,
  ContactProfile: ContactProfileScreen,
  ContactProfileCreate: ContactProfileCreateScreen,
  ContactProfileUpdate: ContactProfileUpdateScreen
},
  {
    headerLayoutPreset: 'center'
  });

Contacts.navigationOptions = {
  tabBarLabel: 'Contacts',


}; */


const History = createStackNavigator({
  History: SeizureHistoryScreen,
},
  {
    headerLayoutPreset: 'center'
  });

History.navigationOptions = {
  tabBarLabel: 'Example',

};




export default createDrawerNavigator({
  Home,
  //Contacts,
  //History
}, {


    contentComponent: (props) => (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 220, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: 180, height: 180, marginTop: 40 }}
            source={require('../assets/images/alerts.png')}
          />
          <Text style={{ fontSize: 32 }}>Seize Alert</Text>
        </View>
        <ScrollView style={{ marginTop: 40 }}>
          <DrawerItems {...props} />
        </ScrollView>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
          <Button
            onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.navigate('Auth')
                  }},
                ],
                { cancelable: false }
              )}
            buttonStyle={{ alignSelf: 'center',  backgroundColor: 'red' }}
            title="Logout"
            titleStyle={{ color: 'white' }}
            accessibilityLabel="Seizure Demo"
            type="solid"
            iconRight={true}
            icon={
              <Icon
                name="exit-to-app"
                color="white"
              />
            }
          />
        </View>


      </SafeAreaView>
    )



  });
