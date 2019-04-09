import React from 'react';
import getEnvVars from '../env.js'

import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';

import { Button,Icon,Avatar,ButtonGroup } from 'react-native-elements';

export default class ContactProfileUpdateScreen extends React.Component {

      constructor(props) {
      super(props);
      this.state = { 
                      name: this.props.navigation.state.params.name, 
                      avatarUrl: this.props.navigation.state.params.avatarUrl, 
                      nickName: this.props.navigation.state.params.nickName, 
                      email: this.props.navigation.state.params.email, 
                      phoneNumber: this.props.navigation.state.params.phoneNumber, 
                      isQuickContact: this.props.navigation.state.params.isQuickContact
                    };
      } 

    static navigationOptions = ({navigation}) => ({
      title: "Contact Profile Update",
      headerLeft:(
        <Button
          icon={
            <Icon
              name="menu"
            />
          }
          title=""
          onPress={() => navigation.toggleDrawer()}
          type="clear"
          buttonStyle={{marginLeft: 10}}
        />)      
    });
  
    render() {
      const {navigate} = this.props.navigation;
      const buttons = ['No','Yes'];
    
      return (
        <View style={styles.avatarSize}>
          <TextInput 
              placeholder='Full Name' 
              style={{ marginBottom:10, textAlign: 'left', alignSelf: 'stretch', marginLeft:10}} 
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
          />
          <TextInput 
              placeholder='ImageURL' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:10}} 
              onChangeText={(avatarUrl) => this.setState({avatarUrl})}
              value={this.state.avatarUrl}
          />
          <TextInput 
              placeholder='Nickname' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:10}} 
              onChangeText={(nickName) => this.setState({nickName})}
              value={this.state.nickName}
          />
          <TextInput 
              placeholder='Email' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:10}} 
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
          />   
          <TextInput 
              placeholder='Phone Number' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:10}} 
              onChangeText={(phoneNumber) => this.setState({phoneNumber})}
              value={this.state.phoneNumber}
          />           
          <ButtonGroup
              onPress={ () => this.updateQuickContact() }
              buttons={buttons}
              containerStyle={{height: 100}}
          />                  
          <Button
              title="Update Contact"
              onPress={() => this.updateContact()}
            />
          
          <Button
              title="Go Back"
              onPress={ () => this.props.navigation.goBack() }
            />

        </View>
        
      );
    }

    updateContact(){
      fetch( 
      getEnvVars.apiUrl + '/contacts/'+ this.props.navigation.state.params.contactId, 
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name, 
          avatarUrl: this.state.avatarUrl, 
          nickName: this.state.nickName, 
          email: this.state.email, 
          phoneNumber: this.state.phoneNumber, 
          isQuickContact: this.state.isQuickContact
         })
      }).then((response) => {
        console.log('response:', response.status);

        if(response.status == 200){
          Alert.alert("Contact Updated Successfully!");
        }else{
          Alert.alert("There's been an error, please try again.");
        }
      });
    }
    updateQuickContact () {
      if(this.state.isQuickContact){
        this.state.isQuickContact = false;
      }
      else{
        this.state.isQuickContact = true;
      }
    }
  }

  function _openDrawer(){
    this.props.navigation.openDrawer()
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
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
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
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
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    avatarSize: {
      fontSize: 14,
      color: '#2e78b7',
      textAlign: "center"
    },
    Button: {
      marginLeft:5,
    }
  });
  



