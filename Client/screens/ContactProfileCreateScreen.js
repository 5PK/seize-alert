import React from 'react';
import getEnvVars from '../env.js'

import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';
import '@expo/vector-icons';
import { Button, Icon, Avatar, CheckBox } from 'react-native-elements';

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

  static navigationOptions = ({ navigation }) => ({
    title: "Contact Create",
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
    const { navigate } = this.props.navigation;
    const buttons = ['No', 'Yes'];
    const { selectedIndex } = this.state.selectedIndex;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.rowContainer}>

          <TextInput
            placeholder='Full Name'
            style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'grey',width:  200 }}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={styles.rowContainer}>

          <TextInput
            placeholder='Image URL'
            style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 5 , borderBottomWidth: 1, borderBottomColor: 'grey',width:  200}}
            onChangeText={(avatarUrl) => this.setState({ avatarUrl })}
            value={this.state.avatarUrl}
          />
        </View>
        <View style={styles.rowContainer}>

          <TextInput
            placeholder='Nickname'
            style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'grey',width:  200 }}
            onChangeText={(nickName) => this.setState({ nickName })}
            value={this.state.nickName}
          />
        </View>
        <View style={styles.rowContainer}>

          <TextInput
            placeholder='Email'
            style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'grey',width:  200}}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.rowContainer}>

          <TextInput
            placeholder='Phone Number'
            style={{ marginBottom: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'grey',width:  200 }}
            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
            value={this.state.phoneNumber}
          />
        </View>
        <View style={styles.rowContainer}>

          <CheckBox
            title='Make Primary Contact'
            checked={this.state.isQuickContact}
            onPress={() => this.setState({ isQuickContact: !this.state.isQuickContact })}
          />

        </View>
        <Button
          buttonStyle={{ marginTop: 70, width: 200, borderRadius: 4, alignSelf: 'center' }}
          title="Create Contact"
          onPress={() => this.createContact()}
        />

      </KeyboardAvoidingView>

    );
  }
  goBack() {
    this.props.navigation.goBack();
  }
  createContact() {
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

        if (response.status == 200) {
          Alert.alert("Contact Created Successfully!");
          this.goBack();
        } else {
          Alert.alert("There's been an error, please try again.");
        }
      });
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  contentContainer: {
    paddingTop: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf:'center'
  },
  leftColumn: {
    width: 100,

    paddingLeft: 10,
    borderBottomColor: 'black'
  },
  Button: {
    marginLeft: 5,
  }
});




