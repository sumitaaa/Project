import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Fab } from "native-base";
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({ name: 'DB.db' });

const Item1 = ({ id, type, brand, number, color, tabain, date, province, ownership, partner, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#ffe6e6',
    borderRadius: 20
  }}>
    <Text style={{ fontSize: 20, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 5, color: '#000000' }}>ยี่ห้อ : {brand}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>รุ่น : {number}          สี : {color}          ทะเบียน : {tabain}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>วันจดทะเบียน : {date}      จังหวัด : {province}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>ผู้ถือกรรมสิทธิ์ : {ownership}        ผู้ถือทรัพย์สินร่วม : {partner}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)
const Item2 = ({ id, type, brand, number, color, size, weight, partner, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#ffe6e6',
    borderRadius: 20
  }}>
    <Text style={{ fontSize: 20, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 5, color: '#000000' }}>ยี่ห้อ : {brand}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>รุ่น : {number}          สี : {color}           : {size}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>น้ำหนัก: {weight}      </Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>ผู้ถือทรัพย์สินร่วม : {partner}</Text>
    <Text style={{ fontSize: 17, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)


export default class Addasset extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataArray: [],
      active: 'true',
      items: [],
    };

  }

  ChangePage = () => {
    let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
    if (comeFrom === 'car') {
      this.props.navigation.navigate('Vehicle', { refresh: () => { this.componentDidMount() } })
    } else if (comeFrom === 'accessories') {
      this.props.navigation.navigate('Accessories', { refresh: () => { this.componentDidMount() } })
    } else if (comeFrom === 'electornic') {
      this.props.navigation.navigate('Electornic', { refresh: () => { this.componentDidMount() } })
    }
    // else if (comeFrom === 'com') {
    //   this.props.navigation.navigate('Electornic', { refresh: () => { this.componentDidMount() } })
    // } 
    else if (comeFrom === 'home') {
      this.props.navigation.navigate('Home2', { refresh: () => { this.componentDidMount() } })
    }
  }

  componentDidMount() { //render ui => do fn()
    // this.getDataArray()
    let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
    if (comeFrom === 'car') {
      db.transaction((tx) => {
        tx.executeSql(`
          SELECT * FROM vehicles
        `, [], (t, res) => {
            let items = []
            for (let i = 0; i < res.rows.length; i++) {
              items.push(res.rows.item(i))
            }
            this.setState({ items: items })
          })
      })
    }
    else if (comeFrom === 'accessories') {
      db.transaction((tx) => {
        tx.executeSql(`
          SELECT * FROM accessories
        `, [], (t, res) => {
            let items = []
            for (let i = 0; i < res.rows.length; i++) {
              items.push(res.rows.item(i))
            }
            this.setState({ items: items })
          })
      })
    }
    else if (comeFrom === 'electornic') {
      db.transaction((tx) => {
        tx.executeSql(`
          SELECT * FROM electornic
        `, [], (t, res) => {
            let items = []
            for (let i = 0; i < res.rows.length; i++) {
              items.push(res.rows.item(i))
            }
            this.setState({ items: items })
          })
      })
    }
    else if (comeFrom === 'home') {
      db.transaction((tx) => {
        tx.executeSql(`
          SELECT * FROM home
        `, [], (t, res) => {
            let items = []
            for (let i = 0; i < res.rows.length; i++) {
              items.push(res.rows.item(i))
            }
            this.setState({ items: items })
          })
      })
    }

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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

        <ScrollView style={{ flexGrow: 1, backgroundColor: '#f3a683' }}>

          {
            this.state.items.length === 0 ?
              <Text style={{ marginTop: 80, fontSize: 20, textAlign: 'center', color: 'white' }}>ไม่มีข้อมูลทรัพย์สิน</Text>
              : this.state.items.map((e, i) => {
                let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
                if (comeFrom === 'car') {
                  return <Item1
                    key={i}
                    id={e.vehicleID}
                    type={e.type}
                    brand={e.brand}
                    number={e.number}
                    color={e.color}
                    tabain={e.tabain}
                    date={e.date}
                    province={e.province}
                    ownership={e.ownership}
                    partner={e.partner}
                    node={e.node}
                  />
                } else if (comeFrom === 'accessories') {
                  return <Item2
                    key={i}
                    id={e.accessoriesID}
                    type={e.type}
                    brand={e.brand}
                    number={e.number}
                    color={e.color}
                    size={e.size}
                    weight={e.weight}
                    partner={e.partner}
                    node={e.node}
                  />

                }
              })
          }

        </ScrollView>

        {
          this.state.items.length > 0 &&
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon type='FontAwesome5' name="angle-double-up" />
            <Button
              onPress={() => this.props.navigation.navigate('search', { refresh: () => { this.componentDidMount() } })}
              style={{ backgroundColor: '#34A34F' }}>
              <Icon name="search" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon type='Entypo' name="arrow-with-circle-down" />
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate('deleted', { refresh: () => { this.componentDidMount() } })}
              style={{ backgroundColor: '#DD5144' }}>
              <Icon type='Entypo' name="trash" />
            </Button>
          </Fab>
        }

      </View>

    );
  }
}
