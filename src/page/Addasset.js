import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Content } from "native-base";
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({ name: 'myDB.db' });

export default class Addasset extends Component {


  constructor(props) {
    super(props)

    this.state = {
      dataArray: []
    };
    db.transaction((tx) => {

      tx.executeSql('SELECT * FROM user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          dataArray: temp,
        });
      });

      // tx.executeSql("INSERT INTO user(first_name, last_name,email,phone) VALUES ()",
      // [], (tx, result) => {
      //   console.log('result save : ', result)
      // })


    })
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };
  ChangePage = () => {
    let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
    if (comeFrom === 'car') {
      this.props.navigation.navigate('Vehicle', { refresh: () => { this.getDataArray() } })
    } else if (comeFrom === 'accessories') {
      this.props.navigation.navigate('Accessories')
    } else if (comeFrom === 'electornic') {
      this.props.navigation.navigate('Electornic')
    } else if (comeFrom === 'home') {
      this.props.navigation.navigate('Home2')
    }
  }

  componentDidMount() { //render ui => do fn()
    // this.getDataArray()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <FlatList
            data={this.state.dataArray}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View key={item.ID} style={{ backgroundColor: 'white', padding: 20 }}>
                <Text>Id: {item.ID}</Text>
                <Text>Name: {item.type}</Text>
                <Text>Contact: {item.brand}</Text>
                <Text>Address: {item.number}</Text>
              </View>
            )}
          />
        </View>
        <Header
          noShadow
          style={{ backgroundColor: '#eb4d4b' }}>
          <Left>
            <Button
              onPress={() => this.props.navigation.goBack()}
              transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>เพิ่มข้อมูลทรัพย์สิน</Title>
          </Body>
          <Right>
            <Button
              onPress={() => {
                this.ChangePage()
              }}
              transparent>
              <Icon type='AntDesign' name="plus" />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f3a683' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>ไม่มีข้อมูลทรัพย์สิน</Text>
        </View>

      </View>


    );
  }
}
const styles = StyleSheet.create({

})
