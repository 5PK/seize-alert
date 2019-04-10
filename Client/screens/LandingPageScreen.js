import React from 'react'
import { ScrollView, Text, TextInput, View, StyleSheet, Image, Link, KeyboardAvoidingView } from 'react-native'
import getEnvVars from '../env.js'

import { Button } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import AppNavigator from '../navigation/AppNavigator'

import AnimatedLoader from 'react-native-animated-loader';

import Alert from '../components/landingLoader'

class AppEntry extends AppNavigator {
  static navigationOptions = {
    header: null
  }

}

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (

      <KeyboardAvoidingView style=

        {{
          padding: 20, flex: 1,
          flexDirection: 'column',
          alignItems: 'center'
        }} >
       <View  style={{width: 400, height: 250}} >
        <Alert />
       </View>
        
        <Text style={{ fontSize: 30, marginBottom: 15 }}>SeizeAlert.io</Text>
        <TextInput placeholder='Username' style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 90 }} />
        <TextInput placeholder='Password' style={{ textAlign: 'left', alignSelf: 'stretch', marginLeft: 90,marginBottom: 15, }} />
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
          title='I forgot my password!'
          type="clear"
        />
      </KeyboardAvoidingView>
    )
  }
}

class RegistrationScreen extends React.Component {
  static navigationOptions = {
    title: "Registration",
  }

  state = {
    email: '',
    password: ''
  };


  handleEmailChange = (text) => {
    this.setState({ email: text })
  }
  handlePasswordChange = (text) => {
    this.setState({ password: text })
  }


  register = (emailInput, passInput) => {

    validatePassword = (password) => {
      var re = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      return re.test(password);
    }

    validateEmail = (email) => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
      
    }
    if (validateEmail(emailInput) && validatePassword(passInput)) {

      fetch(getEnvVars.apiUrl + '/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
          password: passInput,
         })
      }).then((response) => {
        console.log('response:', response.status);

        if(response.status == 200){
          Alert.alert("You've been registered successfully, please login!");
        }else{
          Alert.alert("There's been an error, please try again");
        }


      });


    } else if (!validateEmail(emailInput)) {
      Alert.alert('Your email is invalid');
    } else if (!validatePassword(passInput)) {
      Alert.alert('Your password was invalid, enter a 10 character password with letters and digits');
    }

  }


  render() {
    return (

      <ScrollView style={{ padding: 20 }} >
        <Text style={{ fontSize: 27, textAlign: "center", paddingBottom: 10 }}>Welcome to SeizeAlert.io!</Text>
        <TextInput
          style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'stretch' }}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType="next"
          placeholder='Email'
          placeholderTextColor='rgba(0,0,0,0.4)'
          ref={(el) => { this.email = el; }}
          onChangeText={this.handleEmailChange}
          value={this.state.email}
        />
        <View style={{ marginTop: 10, marginBottom: 10 }}/>
        <TextInput
          style={{ textAlign: 'left', alignSelf: 'stretch', marginBottom: 15 }}
          returnKeyType="go"
          ref={(input) => this.passwordInput = input}
          placeholder='Password'
          placeholderTextColor='rgba(0,0,0,0.4)'
          secureTextEntry
          ref={(el) => { this.password = el; }}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
        />
        <View style={{ margin: 15 }} />
        <Button
          onPress={() => this.register(this.state.email, this.state.password)}
          title="Register"
        />
      </ScrollView>
    )
  }
}

class ResetPasswordScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text
          style={{ fontSize: 27 }}>
          Reset Password
      </Text>
        <TextInput placeholder='Email' title='Email' />
        <TextInput placeholder='Password' title='Password' />
        <View style={{ margin: 7 }} />
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
  render() {
    return <LandinPageContainer />
  }
}