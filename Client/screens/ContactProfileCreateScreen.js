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

/* import Icon from 'react-native-vector-icons/MaterialIcons'; */
export default class ContactProfileCreateScreen extends React.Component {

      constructor(props) {
      super(props);
      this.state = { 
                      name: '', 
                      avatarUrl: 'https://picsum.photos/200/300/?random', 
                      nickName: '', 
                      email: '', 
                      phoneNumber: '', 
                      isQuickContact: false,
                      selectedIndex: 0
                    };
      this.updateIndex = this.updateIndex.bind(this)
      } 

    static navigationOptions = ({navigation}) => ({
      title: "Contact Create",
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
      const { selectedIndex } = this.state.selectedIndex;
    
      return (
        <View style={styles.avatarSize}>
          <Text style={{alignSelf:"flex-start",fontSize:20}}>Name: </Text>
          <TextInput
              placeholder='Full Name' 
              style={{ marginBottom:10, textAlign: 'left', alignSelf: 'stretch', marginLeft:5}} 
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
          />
          <Text style={{alignSelf:"flex-start",fontSize:20}}>Image Url: </Text>
          <TextInput 
              placeholder='Image URL' 
              style={{ marginBottom:10,textAlign: 'left'  , alignSelf: 'stretch', marginLeft:5}} 
              onChangeText={(avatarUrl) => this.setState({avatarUrl})}
              value={this.state.avatarUrl}
          />
          <Text style={{alignSelf:"flex-start",fontSize:20}}>Nick Name: </Text>
          <TextInput 
              placeholder='Nickname' 
              style={{ marginBottom:10,textAlign: 'left'  , alignSelf: 'stretch', marginLeft:5}} 
              onChangeText={(nickName) => this.setState({nickName})}
              value={this.state.nickName}
          />
          <Text style={{alignSelf:"flex-start",fontSize:20}}>Email: </Text>
          <TextInput 
              placeholder='Email' 
              style={{ marginBottom:10,textAlign: 'left'  , alignSelf: 'stretch', marginLeft:5}} 
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
          />   
          <Text style={{alignSelf:"flex-start",fontSize:20}}>Phone Number: </Text>
          <TextInput 
              placeholder='Phone Number' 
              style={{ marginBottom:10,textAlign: 'left'  , alignSelf: 'stretch', marginLeft:5}} 
              onChangeText={(phoneNumber) => this.setState({phoneNumber})}
              value={this.state.phoneNumber}
          />      
          <Text style={{alignSelf:"flex-start",fontSize:20}}>Make Quick Contact: </Text>     
          <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 75}}
          />                  
          <Button
              title="Create Contact"
              onPress={() => this.createContact()}
            />

        </View>
        
      );
    }
    goBack(){
      this.props.navigation.goBack();
    }
    createContact(){      
      fetch(
        getEnvVars.apiUrl + '/contacts', 
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name, 
          avatarUrl: this.state.avatarUrl, 
          nickName: this.state.nickName, 
          email: this.state.email, 
          phoneNumber: this.state.phoneNumber, 
          isQuickContact: this.state.isQuickContact,
          contactId: 1
         })
      }).then((response) => {
        console.log('response:', response.status);

        if(response.status == 200){
          Alert.alert("Contact Created Successfully!");
          this.goBack();
        }else{
          Alert.alert("There's been an error, please try again.");
        }
      });
    }
    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
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
      textAlign: 'left',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'flex-start',
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
      alignItems: 'flex-start',
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
      textAlign: 'left',
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
      alignItems: 'flex-start',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'left',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'flex-start',
    },
    helpLink: {
      paddingVertical: 15,
    },
    avatarSize: {
      fontSize: 14,
      color: '#2e78b7',
      textAlign: "left"
    },
    Button: {
      marginLeft:5,
    }
  });
  



