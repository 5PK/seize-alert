import React from 'react';
import getEnvVars from '../env.js'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';

import { Button,Icon,Avatar } from 'react-native-elements';

export default class ContactProfileScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
      title: navigation.state.params.name,
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
        />),
      headerRight:(
          <Button
          icon={
            <Icon
              name="edit"
            />
          }
          title=""
          onPress={() => navigation.navigate('ContactProfileUpdate', {
            name: navigation.state.params.name,
            avatarUrl: navigation.state.params.avatarUrl,
            nickName: navigation.state.params.nickName,
            phoneNumber: navigation.state.params.phoneNumber,
            email: navigation.state.params.email,
            isQuickContact: navigation.state.params.isQuickContact,
            contactId: navigation.state.params.contactId
          })}
          type="clear"
          buttonStyle={{marginLeft: 10}}
          />          
          ) 
      
    });
  
    render() {
      const {navigate} = this.props.navigation;
      
      var isQuickContact = 'Not Quick Call Contact';

      if( this.props.navigation.state.params.isQuickContact === true ){
        isQuickContact = 'Current Quick Call Contact';
      }
      return (

        <View style={styles.avatarSize}>
          <Avatar
            size = 'large'
            rounded
            source={{
            uri: this.props.navigation.state.params.avatarUrl
            }}
            containerStyle={{ alignSelf: "center", marginVertical:50}}            
          />
          <Text style={{alignSelf:"center",fontSize:20}}>Name: { this.props.navigation.state.params.name }</Text>
          <Text style={{alignSelf:"center"}}>NickName: { this.props.navigation.state.params.nickName }</Text>
          <Text style={{alignSelf:"center"}}>Phone Number: { this.props.navigation.state.params.phoneNumber }</Text>
          <Text style={{alignSelf:"center"}}>Email: { this.props.navigation.state.params.email }</Text>      
          <Text style={{alignSelf:"center"}}>{ isQuickContact }</Text>     
          <Button
              title="Make Quick Call Contact"
              onPress={ () => this.props.navigation.goBack() }
            />
          <Button
              icon={
                <Icon
                  name="delete"
                />
              }
              title=""
              onPress={() => this.deleteContact()}
              type="clear"
              buttonStyle={{marginLeft: 10}}
          />            
        </View>
        
      );
    }

    goBack(){
      this.props.navigation.goBack();
    }

    deleteContact(){      
      fetch(
        getEnvVars.apiUrl + '/contacts/' + this.props.navigation.state.params.contactId, 
        {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }        
      }).then((response) => {
        console.log('response:', response.status);

        if(response.status == 200){
          Alert.alert("Contact Deleted Successfully!");
          this.goBack();
        }else{
          Alert.alert("There's been an error, please try again.");
        }
      });
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
      marginBottom:50   
    }
  });
  



