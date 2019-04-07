import React, { Component } from 'react'
import { Text, StyleSheet, View, AsyncStorage } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './src/page/Home';
import Signup from './src/page/Signup';
import Addasset from './src/page/Addasset';
import Accessories from './src/page/Accessories';
import Vehicle from './src/page/Vehicle';
import Electornic from './src/page/Electornic';
import Home2 from './src/page/Home2';
import CalendarCom from './src/page/CalendarCom';
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({ name: 'myDB.db'});

class App extends Component {
  
  CheckIsSignIn = async() => {
    let name = await AsyncStorage.getItem('Name')
    setTimeout(() => {
      if(name!=='' && name!==null) { // มีข้อมูล
        // ไป home เลย
        this.props.navigation.navigate('Home')
      }else { // ไม่มีข้อมูล
        // ไป sign
        this.props.navigation.navigate('Signup')
      }
    }, 2000) 
  }

  componentDidMount() {
    
    db.transaction((tx) => {

      tx.executeSql('CREATE TABLE IF NOT EXISTS profile(first_name VARCHAR(30), last_name VARCHAR(30), email VARCHAR(80), phone VARCHAR(10))',
      [], (tx, result) => {
        console.log('create table result : ', result)
      }, (e) => {
        console.log('error create table: ', e)
      })

      tx.executeSql("INSERT INTO profile(first_name, last_name,email,phone) VALUES ('Sikarin','Poonsawat' ,'sssss@gmail.com','099999999')",
      [], (tx, result) => {
        console.log('result save : ', result)
      })

      tx.executeSql("SELECT * FROM profile",
      [], (tx, result) => {
       // console.log('result select : ', result)
      var len = result.rows.length
      for(let i=0;i<len;i++) {
        let row = result.rows.item(i)
        console.log('data len : '+i+' : ', row)
      }
      })
    })

    this.CheckIsSignIn()
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#f3a683'}}>
        <Text style={{textAlign: 'center', fontSize: 48, fontWeight: 'bold', color: 'white'}}> P M A</Text>
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
  Accessories:{
   screen: Accessories 
  },
  Vehicle:{
    screen:Vehicle
  },
  Electornic:{
    screen: Electornic
  },
  Home2:{
    screen:Home2
  },
  Calendar: {
    screen: CalendarCom
  },
  
 
}, {headerMode: 'none'})

export default createAppContainer(AppNavigator)
