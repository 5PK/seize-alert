import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'

import { Button } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import AppNavigator from '../navigation/AppNavigator'

class AppEntry extends AppNavigator {
  static navigationOptions = {
    header: null
  }

}

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput placeholder='Username' />
        <TextInput placeholder='Password' />
        <View style={{ margin: 7 }} />
        <Button 
          onPress={() => this.props.navigation.navigate('AppEntry')}
          title='Submit' />
        <Button
          buttonStyle={{ marginTop: 10 }}
          onPress={() => this.props.navigation.navigate('Register')}
          title='Register'
        />
      </ScrollView>
    )
  }
}

class RegistrationScreen extends React.Component {
  render () {
    return (
      <ScrollView style={{padding: 20}}>
      <Text 
          style={{fontSize: 27}}>
          Registration
      </Text>
      <TextInput placeholder='Username' title='Username'/>
      <TextInput placeholder='Email' title='Email' />
      <TextInput placeholder='Password' title='Password' />
      <View style={{margin:7}} />
      <Button 
          onPress={() => this.props.navigation.navigate('Login')}
          title="Register"
      />
  </ScrollView>
    )
  }
}

const LandingStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegistrationScreen,
    AppEntry: AppEntry
  },
  {
    initialRouteName: 'Login'
  }
)

const LandinPageContainer = createAppContainer(LandingStack)

export default class LandingPage extends React.Component {
  render () {
    return <LandinPageContainer />
  }
}
