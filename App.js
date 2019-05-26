import React, { Component } from 'react'
import { Text, StyleSheet, View, AsyncStorage, YellowBox } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './src/page/Home';
import Signup from './src/page/Signup';
import Addasset from './src/page/Addasset';
import Accessories from './src/page/Accessories';
import Vehicle from './src/page/Vehicle';
import Electornic from './src/page/Electornic';
import Home2 from './src/page/Home2';
import CalendarCom from './src/page/CalendarCom';
import condo from './src/page/condo';
import flax from './src/page/flax';
import SQLite from 'react-native-sqlite-storage'
import deleted from './src/page/deleted';
import search from './src/page/search';

YellowBox.ignoreWarnings([''])

var db = SQLite.openDatabase({ name: 'DB.db' });

class App extends Component {

  CheckIsSignIn = async () => {
    // let name = await AsyncStorage.getItem('Name')
    setTimeout(() => {
      if (name !== '' && name !== null) { // มีข้อมูล
        // ไป home เลย
        this.props.navigation.navigate('Home')
      } else { // ไม่มีข้อมูล
        // ไป sign
        this.props.navigation.navigate('Signup')
      }
    }, 2000)
  }

  componentDidMount() {

    db.transaction((tx) => {

      tx.executeSql('CREATE TABLE IF NOT EXISTS user(ID int, first_name VARCHAR(30), last_name VARCHAR(30), email VARCHAR(80), phone VARCHAR(10))',
        [], (tx, result) => {
          console.log('create table result : ', result)

          tx.executeSql("SELECT * FROM user", [], (tx, result) => {
            console.log('result select : ', result)
            var len = result.rows.length
            if (len === 0) { // ต้องลงทะเบียน
              this.props.navigation.navigate('Signup')
            } else { // ไปหน้าโปรไฟล์cd de  
              this.props.navigation.navigate('Home')
            }
          })

        }, (e) => {
          console.log('error create table: ', e)
        })
    })
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#f3a683' }}>
        <Text style={{ textAlign: 'center', fontSize: 48, fontWeight: 'bold', color: 'white' }}> Hello</Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Splash: {
    screen: App
  },
  Home: {
    screen: Home
  },
  Signup: {
    screen: Signup
  },
  Addasset: {
    screen: Addasset
  },
  Accessories: {
    screen: Accessories
  },
  Vehicle: {
    screen: Vehicle
  },
  Electornic: {
    screen: Electornic
  },
  Home2: {
    screen: Home2
  },
  condo: {
    screen: condo
  },
  flax: {
    screen: flax
  },
  Calendar: {
    screen: CalendarCom
  },
  deleted: {
    screen: deleted
  },
  search: {
    screen: search
  }

}, { headerMode: 'none' })

export default createAppContainer(AppNavigator)
