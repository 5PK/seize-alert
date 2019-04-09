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

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import { WebBrowser } from 'expo';

import { Button, Icon } from 'react-native-elements';

import { MonoText } from '../components/StyledText';

import SeizureDetectionTrue from '../SeizureEngine/SeizureDetectionTrue.js';

import SeizureDetectionFalse from '../SeizureEngine/SeizureDetectionFalse.js';

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerLeft: (
      <Button
        icon={
          <Icon
            name="menu"
          />
        }
        title=""
        onPress={() => navigation.toggleDrawer()}
        type="clear"
        buttonStyle={{ marginLeft: 10 }}
      />)
  });


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>DashBoard</Text>
          </View>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/graph.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View>
            <Button

              onPress={this._contactCallButton}
              title="Quick Call"
              color="#841584"
              accessibilityLabel="Quick Contact Call"
            />
            <Button

                onPress={() => RunSeizureDetect()}
                title="Seizure Example"
                color="#841584"
                accessibilityLabel="Seizure Example"
/>            
          </View>
        </ScrollView>

      </View>
    );

  }

  onPressLearnMore() {
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

function _openDrawer() {
  this.props.navigation.openDrawer()
}


function RunSeizureDetect() {

    const seizureDetectionTrue = new SeizureDetectionTrue();

    const seizureDetectionFalse = new SeizureDetectionFalse();

    var result = seizureDetectionTrue.determine();
  
    if(result){
      RNImmediatePhoneCall.immediatePhoneCall('9053794729');
  
      alert('Seizure Detected!');
  
    }
  
    return result;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  Button: {
    marginLeft: 5,
  }
});
