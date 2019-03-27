import React from 'react'
import { ScrollView, Text, TextInput, View, StyleSheet, Image } from 'react-native'

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
      <View style=
      
      {{ padding: 20 , flex: 1,
        
        alignItems: 'center'}} >

        <Image style = {{ marginTop:50}} source={require('../assets/images/loading.gif')} />
        <Text style={{ fontSize: 30, marginBottom:10  }}>SeizeAlert.io</Text>
        <TextInput placeholder='Username' style={{ marginBottom:10, textAlign: 'left', alignSelf: 'stretch', marginLeft:90}} />
        <TextInput placeholder='Password' style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:90}} />
        <View style={{ margin: 7 }} />
        <Button 
          onPress={() => this.props.navigation.navigate('AppEntry')}
          title='Login'
          buttonStyle={{ margin: 7, width: 200 }}
          />
        <Button
          buttonStyle={{ marginTop: 10, width: 200 }}
          onPress={() => this.props.navigation.navigate('Register')}
          title='Register'
        />
        <Button
          buttonStyle={{ marginTop: 10, width: 200 }}
          onPress={() => this.props.navigation.navigate('ResetPassword')}
          title='Reset Password'
        />
      </View>
    )
  }
}

class RegistrationScreen extends React.Component {
  render () {
    return (
      <ScrollView style={{padding: 20}}>
      <Text 
          style={{fontSize: 27, textAlign: "center"}}>
          Registration
      </Text>
      <TextInput placeholder='Username' title='Username'/>
      <TextInput placeholder='Email' title='Email' />
      <TextInput placeholder='Password' title='Password' />
      <View style={{margin:20}} />
      <Button 
          onPress={() => this.props.navigation.navigate('Login')}
          title="Register"
      />
  </ScrollView>
    )
  }
}

class ResetPasswordScreen extends React.Component {
  render () {
    return (
      <ScrollView style={{padding: 20}}>
      <Text 
          style={{fontSize: 27}}>
          Reset Password
      </Text>
      <TextInput placeholder='Email' title='Email' />
      <TextInput placeholder='Password' title='Password' />
      <View style={{margin:7}} />
      <Button 
          onPress={() => this.props.navigation.navigate('Login')}
          title="ResetPassword"
      />
  </ScrollView>
    )
  }
}

const LandingStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegistrationScreen,
    ResetPassword: ResetPasswordScreen,
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

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    fontSize: 18
  },
  welcomeImage: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  Button: {
    marginLeft:5,
  }
});
*/