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

  Alert,
  ImageBackground,
  Dimensions

} from 'react-native';
import { WebBrowser } from 'expo';

import { Button, Icon, Avatar } from 'react-native-elements';

const windowwidth = Dimensions.get('window').width

export default class ContactProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
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
        buttonStyle={{ marginLeft: 10 }}
      />
    )

  });

  render() {
    const { navigate } = this.props.navigation;

    var isQuickContact = 'Not Quick Call Contact';

    if (this.props.navigation.state.params.isQuickContact === true) {
      isQuickContact = 'Current Quick Call Contact';
    }
    return (

      <View style={containerStyle.container} >
        <View>
          
            <ImageBackground source={require('../assets/images/download.jpeg')} style={{  width: windowwidth, height: 250 }}>
              <Button
                style={{ width: 50, alignSelf: 'flex-end' }}
                icon={
                  <Icon
                    name="delete"
                    color='red'
                  />
                }
                title=""
                onPress={() => this.deleteContact()}
                type="clear"
                buttonStyle={{ marginLeft: 10 }}
              />
              <Avatar
                size='large'
                rounded
                source={{
                  uri: this.props.navigation.state.params.avatarUrl
                }}
                containerStyle={{ alignSelf: "center", marginVertical: 50 }}
              />
            </ImageBackground>
          
          <Text style={{ alignSelf: "center", fontSize: 30 }}>{this.props.navigation.state.params.name}</Text>
          <Text style={{ alignSelf: "center" }}>{this.props.navigation.state.params.nickName}</Text>
          <Text style={{ alignSelf: "center" }}>Phone Number: {this.props.navigation.state.params.phoneNumber}</Text>
          <Text style={{ alignSelf: "center" }}>{this.props.navigation.state.params.email}</Text>
          <Text style={{ alignSelf: "center" }}>{isQuickContact}</Text>
        </View>
        <View style={containerStyle.bottom}>
          <Button
            title="Make Quick Call Contact"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>

    );

  }

  goBack() {
    this.props.navigation.goBack();
  }

  deleteContact() {
    fetch(
      getEnvVars.apiUrl + '/contacts/' + this.props.navigation.state.params.contactId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response) => {
        console.log('response:', response.status);

        if (response.status == 200) {
          Alert.alert("Contact Deleted Successfully!");
          this.goBack();
        } else {
          Alert.alert("There's been an error, please try again.");
        }
      });
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

  contentContainer: {
    paddingTop: 30,
  },

  avatarSize: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: "center",
    height: 300
  },
  Button: {
    marginLeft: 5,
    marginBottom: 50
  }
});

const containerStyle = StyleSheet.create({
  container: {
    
    backgroundColor: "#ffffff",
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  }


});


