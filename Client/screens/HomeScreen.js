import React from 'react';
import getEnvVars from '../env.js'
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  View,
  AsyncStorage,
  NativeModules,
  PanResponder,
  Easing,
  ActivityIndicator
} from 'react-native';


import call from 'react-native-phone-call'


import { Button, Icon } from 'react-native-elements';

import SeizureDetectionTrue from '../SeizureEngine/SeizureDetectionTrue.js';

import SeizureDetectionFalse from '../SeizureEngine/SeizureDetectionFalse.js';

import ChartView from 'react-native-highcharts';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, refreshing: false };
  }

  async _retrieveData() {
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

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetch(getEnvVars.apiUrl + '/contacts/quickCallContact/1')
      .then((response) => response.json())
      .then((responseJson) => {

        fetch(getEnvVars.apiUrl + '/alerts/lastAlert/' + this.state.userid)
          .then((response) => {

            if (response.status == 200) {
              responseJson = response.json();
              var lastAlert = new Date(responseJson[0].createdAt);
              const today = new Date();
              const oneDay = 24 * 60 * 60 * 1000;
              var firstDate = new Date(lastAlert.getFullYear(), lastAlert.getMonth(), lastAlert.getDate());
              var secondDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              var daySinceLastSeizure = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

              this.setState({
                daySinceLastSeizure: daySinceLastSeizure,
                refreshing: false
              });

            }else{

              this.setState({
                daySinceLastSeizure: 0,
                refreshing: false
              });

            }



          })
          .catch((error) => {
            console.error(error);
          });

        this.setState({
          qcContact: responseJson[0],

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {

    await this._retrieveData();

    fetch(getEnvVars.apiUrl + '/contacts/quickCallContact/1')
      .then((response) => response.json())
      .then((responseJson) => {

        fetch(getEnvVars.apiUrl + '/alerts/lastAlert' + this.state.userid)
          .then((response) => {

            if (response.status == 200) {
              var lastAlert = new Date(responseJson[0].createdAt);
              const today = new Date();
              const oneDay = 24 * 60 * 60 * 1000;
              var firstDate = new Date(2018, lastAlert.getMonth(), lastAlert.getDate());
              var secondDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              var daySinceLastSeizure = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  
              this.setState({
                daySinceLastSeizure: daySinceLastSeizure,
                isLoading: false
              });
            }else{
              this.setState({
                daySinceLastSeizure: 0,
                isLoading: false
              });

            }
            
          })
          .catch((error) => {
            console.error(error);
          });

        this.setState({
          qcContact: responseJson[0],

        });
      })
      .catch((error) => {
        console.error(error);
      });


  }

  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerTitleStyle: { alignSelf: 'center' },
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

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  RunSeizureDetect(qcContact) {

    const seizureDetectionTrue = new SeizureDetectionTrue();

    var result = seizureDetectionTrue.determine();

    if (result) {

      const args = {
        number: qcContact.phoneNumber,
        //number: '9058069257',// String value with the number to call
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
      }

      call(args).catch(console.error)

      fetch(
        getEnvVars.apiUrl + '/alerts',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dateOccured: new Date(),
            armVariance: Math.random() * 0.5 + 0.25,
            ankleVariance: Math.random() * 0.5 + 0.25,
            userId: this.state.userid,
          })
        }).then((response) => {
          console.log('response:', response.status);
        });

      alert('Seizure Detected!');

    }

    return result;

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    var Highcharts = 'Highcharts';
    var armConf = {
      chart: {
        type: 'line',
        animation: true, // don't animate in old IE
        marginRight: 0,
        events: {
          load: function () {

            // set up the updating of the chart each second
            var series = this.series[0];
            var series2 = this.series[1];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random() * 0.5 + 0.25;
              y2 = Math.random() * 0.5 + 0.25;
              series.addPoint([x, y], true, true);
              series2.addPoint([x, y2], true, true);
            }, 100);
          }
        }
      },
      title: {
        text: 'Arm Acceleration'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 100
      },
      yAxis: {
        title: {
          text: 'Acceleration'
        },
        plotLines: [{
          value: 0,
          width: 0.1,
          color: '#808080'
        }]
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Right Wrist',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = 0; i <= 100; i++) {
            data.push({
              x: time + i * 100,
              y: Math.random() * 0.5 + 0.25
            });
          }
          return data;
        }())
      },
      {
        name: 'Left Wrist',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = 0; i <= 100; i++) {
            data.push({
              x: time + i * 100,
              y: Math.random() * 0.5 + 0.25
            });
          }
          return data;
        }())
      }
      ]
    };

    var legConf = {
      chart: {
        type: 'line',
        animation: true, // don't animate in old IE
        marginRight: 0,
        events: {
          load: function () {

            // set up the updating of the chart each second
            var series = this.series[0];
            var series2 = this.series[1];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random() * 0.5 + 0.25;
              y2 = Math.random() * 0.5 + 0.25;
              series.addPoint([x, y], true, true);
              series2.addPoint([x, y2], true, true);
            }, 100);
          }
        }
      },
      title: {
        text: 'Leg Acceleration'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 100
      },
      yAxis: {
        title: {
          text: 'Acceleration'
        },
        plotLines: [{
          value: 0,
          width: 0.1,
          color: '#808080'
        }]
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Right Ankle',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = 0; i <= 100; i++) {
            data.push({
              x: time + i * 100,
              y: Math.random() * 0.5 + 0.25
            });
          }
          return data;
        }())
      },
      {
        name: 'Right Ankle',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = 0; i <= 100; i++) {
            data.push({
              x: time + i * 100,
              y: Math.random() * 0.5 + 0.25
            });
          }
          return data;
        }())
      }
      ]
    };

    const options = {
      global: {
        useUTC: false
      },
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      }
    };



    return (

      <ScrollView style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >

        <View style={containerStyle.container} >
          <ScrollView style={{ height: 300 }}>
            <ChartView style={{ height: 200 }} config={armConf} options={options}></ChartView>
            <ChartView style={{ height: 200 }} config={legConf} options={options}></ChartView>
          </ScrollView>

          <View style={itemStyle.daysSince} >



            <Text style={{ alignSelf: 'center' }} >Days since last seizure:</Text>


            <Text style={{ alignSelf: 'center', marginTop: 15, fontSize: 30 }} >{this.state.daySinceLastSeizure}</Text>
          </View>

          <View style={containerStyle.bottom}>
            <Button
              onPress={() => this.RunSeizureDetect(this.state.qcContact)}
              title="Seizure Demo"
              color="#841584"
              accessibilityLabel="Seizure Demo"
              type="outline"
            />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const itemStyle = StyleSheet.create({
  daysSince: {
    height: 75,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
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

