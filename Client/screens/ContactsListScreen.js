import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';

import { Button, Icon, ListItem } from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Mom'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Doctor'
  }
];

export default class ContactsListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  
  /*
  componentDidMount() {
    var test = this.getContactList();
    console.log(test);
  }
  */
  getContactList() {
    return fetch('http://192.168.0.12:3030/contacts/',
      {
        method: 'GET', headers:
        {
        }
      });

  }
  static navigationOptions = ({ navigation }) => ({
    title: "Contacts",
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

  alertItemName = (item) => {
    alert(item)
  }
  render() {

    /*
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    */

    const fucker = this.getContactList();

    return (

      
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={fucker}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }


  /** 
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
         
            <View>
            {
              this.state.dataSource.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}                 
                  onPress = {() => navigate('ContactProfile', {name: l.name , uri: l.avatar_url})}
                />
              ))
            }
            </View>

        </View>
      );
    }
    */
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


