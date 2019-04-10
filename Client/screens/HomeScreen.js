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

import { Button, Icon } from 'react-native-elements';

import SeizureDetectionTrue from '../SeizureEngine/SeizureDetectionTrue.js';

import SeizureDetectionFalse from '../SeizureEngine/SeizureDetectionFalse.js';

import SeizureProgressCircle from '../components/CircleGraph'

import { AnimatedCircularProgress } from 'react-native-circular-progress';

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

      <ScrollView style={containerStyle.container}>
        <View style={{ flexDirection: "row", marginTop: 50, marginBottom: 50 }}>
          <View style={{ flex: 1 }} >
            <Text style={{ alignSelf: "center" }}>Hands</Text>
            <Image

              style={{ width: 50, height: 50 }}
              source={require('../assets/images/hand-paper-solid.svg')}
            />
            <AnimatedCircularProgress
              style={{marginLeft:10}}
              size={150}
              width={3}
              fill="hello"
              tintColor="#00e0ff"
              backgroundColor="#3d5875">
              {
                (fill) => (
                  <Text>
                    hello
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View style={{ flex: 1 }} >
            <Text>Foot</Text>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../assets/images/shoe-prints-solid.svg')}
            />
         
          </View>
        </View>
        <View>

          <Button
            onPress={() => RunSeizureDetect()}
            title="Seizure Example"
            color="#841584"
            accessibilityLabel="Seizure Example"
          />

          <Button
            onPress={this._contactCallButton}
            title="Quick Call"
            color="#841584"
            accessibilityLabel="Quick Contact Call"
          />
        </View>
      </ScrollView>

    );
  }
}

function RunSeizureDetect() {

  const seizureDetectionTrue = new SeizureDetectionTrue();

  const seizureDetectionFalse = new SeizureDetectionFalse();

  var result = seizureDetectionTrue.determine();

  if (result) {

    alert('Seizure Detected!');

  }

  return result;
}

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: 'row'
  }
}); 
