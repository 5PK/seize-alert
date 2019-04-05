import React from 'react';

import {
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
                      avatarUrl: '', 
                      nickName: '', 
                      email: '', 
                      phoneNumber: '', 
                      isQuickContact: false,
                      selectedIndex: 0
                    };
      this.updateIndex = this.updateIndex.bind(this)
      } 

    static navigationOptions = ({navigation}) => ({
      title: "Contact Profile Create",
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
          <TextInput 
              placeholder='Full Name' 
              style={{ marginBottom:10, textAlign: 'left', alignSelf: 'stretch', marginLeft:90}} 
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
          />
          <TextInput 
              placeholder='ImageURL' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:90}} 
              onChangeText={(avatarUrl) => this.setState({avatarUrl})}
              value={this.state.avatarUrl}
          />
          <TextInput 
              placeholder='Nickname' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:90}} 
              onChangeText={(nickName) => this.setState({nickName})}
              value={this.state.nickName}
          />
          <TextInput 
              placeholder='Email' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:90}} 
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
          />   
          <TextInput 
              placeholder='Phone Number' 
              style={{ textAlign: 'left'  , alignSelf: 'stretch', marginLeft:90}} 
              onChangeText={(phoneNumber) => this.setState({phoneNumber})}
              value={this.state.phoneNumber}
          />           
          <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 100}}
          />                  
          <Button
              title="Create Contact"
              onPress={() => createContact()}
            />
          
          <Button
              title="Go Back"
              onPress={ () => this.props.navigation.goBack() }
            />

        </View>
        
      );
    }
    createContact(){
      
      fetch('http://10.128.53.21:3030/contacts', {
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
          isQuickContact: this.state.isQuickContact
         })
      }).then((response) => {
        console.log('response:', response.status);

        if(response.status == 200){
          Alert.alert("Contact Created Successfully!");
        }else{
          Alert.alert("There's been an error, please try again.");
        }


      });
    }
    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }

    onPressLearnMore(){
      //TODO
    }
    _maybeRenderDevelopmentModeWarning() {
      if (__DEV__) {
        const learnMoreButton = (
          <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
            Learn more
          </Text>
        );
  
        return (
          <Text style={styles.developmentModeText}>
            Development mode is enabled, your app will be slower but you can use useful development
            tools. {learnMoreButton}
          </Text>
        );
      } else {
        return (
          <Text style={styles.developmentModeText}>
            You are not in development mode, your app will run at full speed.
          </Text>
        );
      }
    }
  
    _handleLearnMorePress = () => {
      WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };
  
    _handleHelpPress = () => {
      WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
      );
    };
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
  



