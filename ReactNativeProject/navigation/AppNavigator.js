import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';

import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native'

import getEnvVars from '../env.js'

import { Button } from 'react-native-elements'

import SeizeAlertAnim from '../components/landingLoader'

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      windowwidth: Dimensions.get('window').width,
      windowheight: Dimensions.get('window').height
    };
  }

  render() {
    return (

      <KeyboardAvoidingView
        style=
        {{
          padding: 20, flex: 1,
          flexDirection: 'column',
          alignItems: 'center'
        }}
        behavior="padding" enabled
      >
        <View style={{ flex: 1, justifyContent: 'center' }} >
          <View style={{ height: this.state.windowheight , width: this.state.windowwidth , alignSelf: 'center' }} >
            <SeizeAlertAnim />
          </View>
          <View style={{ height: this.state.windowheight , alignSelf: 'center' }} >
            <Text style={{ fontSize: 30, marginBottom: 15, alignSelf: 'center' }}>SeizeAlert.io</Text>
            <TextInput
              placeholder='Email'
              style={{ width: 200, textAlign: 'left', alignSelf: 'flex-start', borderBottomWidth: 1, borderBottomColor: 'grey', marginBottom: 10 }}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              placeholder='Password'
              style={{ width: 200, textAlign: 'left', alignSelf: 'flex-start', borderBottomWidth: 1, borderBottomColor: 'grey', marginBottom: 15, }}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={true}
            />
            <Button
              onPress={this._signInAsync}
              title='Login'
              buttonStyle={{ marginTop: 7, width: this.state.windowwidth  }}
            />
            <Button
              buttonStyle={{ marginTop: 10, width: this.state.windowwidth  }}
              onPress={() => this.props.navigation.navigate('Register')}
              title='Register'
            />
            <Button
              buttonStyle={{ marginTop: 10, width: this.state.windowwidth  }}
              onPress={() => this.props.navigation.navigate('ResetPassword')}
              title='I forgot my password!'
              type="clear"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }

  _signInAsync = async () => {

    var responseStatus = null;
    var userid = null

    if (this.state.email === undefined || this.state.email === null || this.state.email === '' ||
      this.state.password === undefined || this.state.password === null || this.state.password === '') {

      Alert.alert("User not found");

    } else {
      var loginResponse = await fetch(
        getEnvVars.apiUrl + '/session',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        }).then((response) => {
          //console.log('response:', response.status);

          if (response.status == 200) {
            console.log('login 200');
            return response._bodyInit;

          } else {
            Alert.alert("User not found");
            return null;
          }
        });
    }
    console.log(loginResponse);
    if (loginResponse !== null && loginResponse !== undefined) {
      console.log('login success');
      console.log(loginResponse[0]);

     // test = JSON.stringify(loginResponse);

      console.log(JSON.parse(loginResponse)[0].id.toString());
      AsyncStorage.setItem('userid', (JSON.parse(loginResponse)[0].id.toString()));
      this.props.navigation.navigate('App');


    }

  };
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

        if (response.status == 200) {
          Alert.alert("You've been registered successfully, please login!");
        } else {
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

      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }}   behavior="padding" enabled>
        <Text style={{ fontSize: 27, textAlign: "center", marginBottom: 100 }}>Welcome to SeizeAlert.io!</Text>

        <TextInput
          style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: 'grey', width: 200 }}
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
        <View style={{ marginTop: 10, marginBottom: 10 }} />
        <TextInput
          style={{ textAlign: 'left', alignSelf: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'grey', width: 200 }}
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
          buttonStyle={{ width: 200, alignSelf: 'center' }}
        />
      </KeyboardAvoidingView>
    )
  }
}

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userid = await AsyncStorage.getItem('userid');

    console.log(userid);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userid ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthStack = createStackNavigator({ Login: LoginScreen, Register: RegistrationScreen });

export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: MainDrawerNavigator,
},
  {
    initialRouteName: 'AuthLoading',
  }
));