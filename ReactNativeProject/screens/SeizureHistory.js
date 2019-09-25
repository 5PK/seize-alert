import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ActivityIndicator,RefreshControl, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import getEnvVars from '../env.js'
import { Table, TableWrapper, Row } from 'react-native-table-component';

const windowwidth = Dimensions.get('window').width

// This will be converted to the history page a little later.
export default class SeizureHistory extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "History",
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

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Date Occured', 'Arm Variance', 'Ankle Variance'],
      widthArr: [windowwidth / 3, windowwidth / 3, windowwidth / 3],
      isLoading: true,
      refreshing: false,

    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetch(getEnvVars.apiUrl + '/alerts?userid=' + this.state.userid)
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

    fetch(getEnvVars.apiUrl + '/alerts?userid=' + this.state.userid)

      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
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


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    const state = this.state;
    const dataSource = this.state.dataSource;
    const tableData = [];
    for (let i = 0; i < dataSource.length; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(dataSource[i].dateOccured, dataSource[i].armVariance, dataSource[i].ankleVariance);
      }
      tableData.push(rowData);
    }

    return (
      <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#f1f8ff' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: 'white' }
});