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

import { Button,Icon } from 'react-native-elements';

export default class ContactProfile extends React.Component {
    static navigationOptions = ({navigation}) => ({
      title: "ContactProfile",
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
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {/*<View style={styles.welcomeContainer}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/robot-dev.png')
                    : require('../assets/images/robot-prod.png')
                }
                style={styles.welcomeImage}
              />
            </View>
  
            <View style={styles.getStartedContainer}>
              {this._maybeRenderDevelopmentModeWarning()}
  
              <Text style={styles.getStartedText}>Get started by opening</Text>
  
              <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
              </View>
  
              <Text style={styles.getStartedText}>
                Change this text and your app will automatically reload!.
              </Text>
            </View>
  
            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
                <Text style={styles.helpLinkText}>Help, it didn’t automatically reload?</Text>
              </TouchableOpacity>
            </View> */}
            <View style = {styles.welcomeContainer}>
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
            </View>
          </ScrollView>
  
        </View>
      );
    }
}