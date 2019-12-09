import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import SeizureAlert from './SeizureAlert';
import logo from './logo.png';
import getEnvVars from './env.js'
import { round } from 'mathjs'

// Style sheets.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 25,
    margin: 10,
  },
  dateDisplay: {
    fontSize: 20,

  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

// Rendering for Seizure alert.
const App = ({ }) => {

  const [data, setData] = useState(0);

  async function fetchDate() {
    fetch(getEnvVars.apiUrl + `/seizure/last`).then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      })
      ).then(res => {

        var current = new Date();
        var database = new Date(res.data.dateOccured);

        var Difference_In_Time = current.getTime() - database.getTime();

        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        Difference_In_Days = round(Difference_In_Days, 0)
        //  console.log(Difference_In_Days)
        setData(Difference_In_Days)
      }));
    //    return result;
  }

  useEffect(() => {
    setInterval(function () {
      fetchDate()
    }, 15000)
    //setData(result);
  });

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={logo} style={{ width: 250, height: 250 }} resizeMode="contain" />
      </View>
      <View style={styles.view}>
        <Text style={styles.dateDisplay}>{data} Days since last seizure.</Text>
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button} onPress={() => SeizureAlert.startService()}>
          <Text style={styles.instructions}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => SeizureAlert.stopService()}>
          <Text style={styles.instructions}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

async function getTimeSinceLastSeizure() {
  console.log("TEST")
}

const mapStateToProps = store => ({
});

export default connect(mapStateToProps)(App);
