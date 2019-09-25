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
      isQuickContact = 'Current Primary Contact';
    }
    return (

      <View style={containerStyle.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: this.props.navigation.state.params.avatarUrl }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.props.navigation.state.params.name}</Text>
            <Text style={styles.info}>{this.props.navigation.state.params.nickName}</Text>
            <Text style={styles.info}>{this.props.navigation.state.params.phoneNumber}</Text>
            <Text style={styles.info}>{this.props.navigation.state.params.email}</Text>
            <Text style={styles.description}>{isQuickContact}</Text>

            {/*
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
              <Text>Make Primary Contact</Text>
            </TouchableOpacity>\
            */}






          </View>
        </View>

        <View style={containerStyle.bottom}>
              <Button
                onPress={() => this.deleteContact()}
                title='Delete Contact'
                buttonStyle={{ margin: 10, width: 200, height: 50, backgroundColor: 'red', borderRadius: 10, alignSelf: 'center' }}
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: "steelblue",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  deleteButtonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "red",
  },
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


