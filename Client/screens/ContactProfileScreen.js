import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';

import { Button,Icon,Avatar } from 'react-native-elements';

/* import Icon from 'react-native-vector-icons/MaterialIcons'; */
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
        />)
      
    });
  
    render() {
      const {navigate} = this.props.navigation;
      
      const isQuickContact = 'Not Quick Call Contact';

      if( this.props.navigation.state.params.isQuickContact === 1 ){
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
          <Text style={{alignSelf:"center"}}>{ this.props.navigation.state.params.name }</Text>
          <Text style={{alignSelf:"center"}}>{ this.props.navigation.state.params.nickName }</Text>
          <Text style={{alignSelf:"center"}}>{ this.props.navigation.state.params.phoneNumber }</Text>
          <Text style={{alignSelf:"center"}}>{ this.props.navigation.state.params.email }</Text>      
          <Text style={{alignSelf:"center"}}>{ isQuickContact }</Text>     
          <Button
              title="Go Back"
              onPress={ () => this.props.navigation.goBack() }
            />
          <Button
              title="Make Quick Call Contact"
              onPress={ () => this.props.navigation.goBack() }
            />
        </View>
        
      );
    }
    onPressLearnMore(){
      //TODO
    }
    makeQuickCallContact(){
      
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
      marginBottom:50   
    }
  });
  



