import React, { Component } from 'react';
import getEnvVars from '../env.js'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  AsyncStorage
} from 'react-native';

import { Button, Icon, ListItem } from 'react-native-elements';




export default class ContactsListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, refreshing: false, };
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
      />),
    headerRight: (
      <Button
        icon={
          <Icon
            name="person-add"
          />
        }
        title=""
        onPress={() => navigation.navigate('ContactProfileCreate')}
        type="clear"
        buttonStyle={{ marginRight: 10 }}
      />)

  });



  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetch(getEnvVars.apiUrl + '/contacts?userid=' + this.state.userid)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          refreshing: false,
          dataSource: responseJson,
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {



    await this._retrieveData();

    console.log('userid' + this.state.userid);

    fetch(getEnvVars.apiUrl + '/contacts?userid=' + this.state.userid)

      .then((response) => response.json())
      .then((responseJson) => {
        console.log()
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  async _retrieveData () {
    try {
      const value = await AsyncStorage.getItem('userid');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState({
          userid: value
        });

      }
    } catch (error) {
      // Error retrieving data
    }
  };



  alertItemName = (item) => {
    alert(item)
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >

        <View>
          {
            this.state.dataSource.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatarUrl } }}
                title={l.name}
                onPress={() => navigate('ContactProfile', {
                  name: l.name,
                  avatarUrl: l.avatarUrl,
                  nickName: l.nickName,
                  phoneNumber: l.phoneNumber,
                  email: l.email,
                  isQuickContact: l.isQuickContact,
                  contactId: l.id
                })}
              />
            ))
          }
        </View>

      </ScrollView>

    );
  }

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


