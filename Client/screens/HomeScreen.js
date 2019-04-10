import React from 'react';
import getEnvVars from '../env.js'
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

  NativeModules,
  PanResponder,
  Easing
} from 'react-native';


import call from 'react-native-phone-call'


import { Button, Icon } from 'react-native-elements';

import SeizureDetectionTrue from '../SeizureEngine/SeizureDetectionTrue.js';

import SeizureDetectionFalse from '../SeizureEngine/SeizureDetectionFalse.js';

import { AnimatedCircularProgress } from 'react-native-circular-progress';



export default class HomeScreen extends React.Component {

  componentDidMount() {

    fetch(getEnvVars.apiUrl + '/contacts/quickCallContact')

      .then((response) => response.json())
      .then((responseJson) => {


        this.setState({
          isLoading: false,
          dataSource: responseJson[0]
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

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


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  wait() {
    console.log('waited');
  }


  isEven(n) {
    return n % 2 == 0;
  }




  animateCircle() {
    this.refs.footCircle.animate(this.getRandomInt(50, 80));
    this.refs.handCircle.animate(this.getRandomInt(50, 80));


  }

  reanimateCircle() {
    this.refs.handCircle.animate(this.getRandomInt(25, 50));
    this.refs.footCircle.animate(this.getRandomInt(25, 50));
  }

  RunSeizureDetect(dataSource) {



    const seizureDetectionTrue = new SeizureDetectionTrue();


    this.animateCircle();


    var result = seizureDetectionTrue.determine();


    if (result) {

      const args = {
        number: dataSource.phoneNumber,
        //number: '9058069257',// String value with the number to call
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
      }

      call(args).catch(console.error)

      alert('Seizure Detected!');

    }

    return result;



  }
  render() {


    return (

      <View style={containerStyle.container} >
        <View style={{ flexDirection: "row", marginTop: 50, marginBottom: 50 }}>
          <View style={{ flex: 1 }} >
            <Icon name='md-hand' type='ionicon' />
            <AnimatedCircularProgress
              style={{ alignSelf: "center", marginTop: 10 }}
              size={150}
              width={3}
              fill={0}
              tintColor="#00e0ff"

              ref="handCircle"
              backgroundColor="#3d5875"

            >
              
            </AnimatedCircularProgress>
          </View>
          <View style={{ flex: 1 }} >
            <Icon name='foot' type='foundation' />
            <AnimatedCircularProgress
              style={{ alignSelf: "center", marginTop: 10 }}
              size={150}
              width={3}
              fill={0}
              tintColor="#00e0ff"
              prefill={0}
              ref="footCircle"
              backgroundColor="#3d5875"
              onAnimationComplete={() => this.reanimateCircle()}
            />

          </View>
        </View>

        <Button
          onPress={this._contactCallButton}
          title="Quick Call"
          color="#841584"
          accessibilityLabel="Quick Contact Call"
          buttonStyle={itemStyle.quickCallBtn}
        />

        <View style={containerStyle.bottom}>
          <Button
            onPress={() => this.RunSeizureDetect(this.state.dataSource)}
            title="Seizure Demo"
            color="#841584"
            accessibilityLabel="Seizure Demo"
            type="outline"
          />
        </View>

      </View>
    );
  }
}


const itemStyle = StyleSheet.create({
  quickCallBtn: {
    height: 65,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'red'
  }

});

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
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

