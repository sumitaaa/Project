import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Modal, Dimensions, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Button, Icon, Footer, Right, FooterTab, Body, Content, Card } from "native-base";
import IconCom from '../components/IconCom'
import SQLite from 'react-native-sqlite-storage'

const { height, width } = Dimensions.get('window')

var db = SQLite.openDatabase({ name: 'DB.db' });

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.setDate = this.setDate.bind(this);
  }

  saveBackup = () => {
    let url = "http://172.16.186.240:3000/post-backup"

    let jsonData = {}

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM user`,
        [], (tw, r) => {
          let user = []
          for (let i = 0; i < r.rows.length; i++) {
            let rowData = r.rows.item(i)
            user.push(rowData)
          }
          jsonData.user = user

          tx.executeSql(`SELECT * FROM vehicles`,
            [], (tw, r) => {
              let vehicles = []
              for (let i = 0; i < r.rows.length; i++) {
                let rowData = r.rows.item(i)
                vehicles.push(rowData)
              }
              jsonData.vehicles = vehicles

              tx.executeSql(`SELECT * FROM accessories`,
                [], (tw, r) => {
                  let accessories = []
                  for (let i = 0; i < r.rows.length; i++) {
                    let rowData = r.rows.item(i)
                    accessories.push(rowData)
                  }
                  jsonData.accessories = accessories
                  tx.executeSql(`SELECT * FROM electornic`,
                    [], (tw, r) => {
                      let electornic = []
                      for (let i = 0; i < r.rows.length; i++) {
                        let rowData = r.rows.item(i)
                        electornic.push(rowData)
                      }
                      jsonData.electornic = electornic

                      tx.executeSql(`SELECT * FROM homes`,
                        [], (tw, r) => {
                          let home = []
                          for (let i = 0; i < r.rows.length; i++) {
                            let rowData = r.rows.item(i)
                            home.push(rowData)
                          }
                          jsonData.home = home

                          console.log('jsonData : ', jsonData)
                        })
                    })
                })
            })
        })
    })

    let data = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    }
    fetch(url, data)
      .then(response => {
        console.log('response is : ', response)
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {

    // ลบ data base
    db.transaction((tx) => {
      //tx.executeSql(`DROP TABLE vehicles`, [], (tx, res) => { alert('ลบ vehicles db!!') })
      //tx.executeSql(`DROP TABLE user`, [], (tx, res) => { alert('ลบ user db!!') })
      //tx.executeSql(`DROP TABLE accessories`, [], (tx, res) => { alert('ลบ accessories db!!') })
      //tx.executeSql(`DROP TABLE electornic`, [], (tx, res) => { alert('ลบ electornic db!!') })
      //tx.executeSql(`DROP TABLE homes`, [], (tx, res) => { alert('ลบ homes db!!') })
      // tx.executeSql(`DROP TABLE flax`, [], (tx, res) => { alert('ลบ flax db!!') })
      // tx.executeSql(`DROP TABLE condo`, [], (tx, res) => { alert('ลบ condo db!!') })
    })
    // ------

    db.transaction((tx) => { //เช็คเงื่อนไข
      //select ตรงนี้ไม่ต้องทำก็ได้ เพราะมันนจะแสดงใน log ไม่ได้โชว์
      tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='user' AND name='vehicle'",
        [], (tx, result) => {
          console.log('create table result : ', result)
          tx.executeSql(`CREATE TABLE IF NOT EXISTS user
                          (ID INTEGER PRIMARY KEY, 
                            first_name VARCHAR(30), 
                            last_name VARCHAR(30), 
                            email VARCHAR(80), 
                            phone VARCHAR(10))`,
            [], (tx, result) => {
              console.log('create table result : ', result)
            }, (e) => {
              console.log('error create table: ', e)
            })
        })
      // create table vehicles
      tx.executeSql(`CREATE TABLE IF NOT EXISTS vehicles (
        vehicleID INTEGER PRIMARY KEY AUTOINCREMENT, 
        type VARCHAR(30),
        brand VARCHAR(30),
        number VARCHAR(30),
        color VARCHAR(20),
        tabain VARCHAR(10),
        date VARCHAR(50),
        province VARCHAR(30),
        ownership VARCHAR(60), 
        partner VARCHAR(60),
        note VARCHAR(100)
      )`,
        [], (tx, result) => {
          console.log('create table vehicle result : ', result);
        })
      tx.executeSql(`CREATE TABLE IF NOT EXISTS accessories (
          accessoriesID INTEGER PRIMARY KEY AUTOINCREMENT, 
          type VARCHAR(30),
          brand VARCHAR(30),
          color VARCHAR(20),
          number VARCHAR(30),
          size FLOAT(10),
          weight FLOAT(50),
          ownership VARCHAR(60), 
          partner VARCHAR(60),
          note VARCHAR(100)
        )`,
        [], (tx, result) => {
          console.log('create table accessories result : ', result);
        })
      // create table electornic
      tx.executeSql(`CREATE TABLE IF NOT EXISTS electornic (
        electornicID INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR(30),
        name VARCHAR(30),
        value VARCHAR(30),
        brand VARCHAR(30),
        number VARCHAR(30),
        color VARCHAR(20),
        date VARCHAR(50),
        insurance VARCHAR(30),
        store VARCHAR(30),
        owner VARCHAR(60), 
        partner VARCHAR(60),
        note VARCHAR(100)
      )`,
        [], (tx, result) => {
          console.log('create table electornic result : ', result);
        })
      // create table home
      tx.executeSql(`CREATE TABLE IF NOT EXISTS homes (
        homesID INTEGER PRIMARY KEY AUTOINCREMENT, 
        type VARCHAR(30),
        name VARCHAR(30),
        number VARCHAR(30),
        district VARCHAR(30),
        province VARCHAR(30),
        area VARCHAR(30),
        date VARCHAR(50),
        ownership VARCHAR(30),
        note VARCHAR(30)
        )`,
        [], (tx, result) => {
          console.log('create table home2 result : ', result);
        })
      tx.executeSql(`CREATE TABLE IF NOT EXISTS condo (
          condoID INTEGER PRIMARY KEY AUTOINCREMENT, 
          type VARCHAR(30),
          number VARCHAR(30),
          list VARCHAR(30),
          typeasset VARCHAR(30),
          nature VARCHAR(30),
          ownership VARCHAR(30),
          note VARCHAR(30)
          )`,
        [], (tx, result) => {
          console.log('create table condo result : ', result);
        })
      tx.executeSql(`CREATE TABLE IF NOT EXISTS flax (
            flaxID INTEGER PRIMARY KEY AUTOINCREMENT, 
            type VARCHAR(30),
            name VARCHAR(30),
            number VARCHAR(30),
            note VARCHAR(30)
            )`,
        [], (tx, result) => {
          console.log('create table flax result : ', result);
        })

    })

  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    //#ffd32a
  }

  ChangePage = (name, from) => {
    this.props.navigation.navigate(name, {
      comeFrom: from
    })
  }

  render() {
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          presentationStyle="formSheet"
          containerStyle={{ backgroundColor: '#0c2461' }}
        >
          <View style={{ flex: 1, backgroundColor: '#00000070' }}>
            <View style={{ width: 280, height: 350, marginTop: (height - 350) / 2, backgroundColor: 'white', alignSelf: 'center' }}>

              <Button onPress={() => { this.setState({ modalVisible: false }) }} transparent>
                <Icon
                  style={{ marginLeft: 240 }}
                  type='AntDesign' name='close' />

              </Button>
              <Text style={{ marginLeft: 17, fontSize: 25, color: '#0c2461', marginTop: 30 }}>ID ทรัพย์สิน</Text>

              <TextInput style={{ borderColor: '#0c2461', width: 253, height: 50, borderWidth: 2, marginLeft: 15 }}
                underlineColorAndroid="transparent"
                placeholder=" ID ทรัพย์สินที่ต้องการรับข้อมูล"
                placeholderTextColor="#535c68"
              />

              <Button style={{ marginTop: 50, marginLeft: 96, borderRadius: 10, backgroundColor: 'green' }}>
                <Text style={{ padding: 30, color: 'white' }}>บันทึก</Text>
              </Button>

            </View>

          </View>

        </Modal>

        <Header
          noShadow
          style={{ backgroundColor: '#0c2461' }}>
          <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Title style={{ fontSize: 25 }}>หน้าหลัก</Title>
          </Body>
          <Right>
            <Button
              onPress={() => {
                this.saveBackup()
              }}
              transparent>
              <Icon type='MaterialCommunityIcons' name='cloud-download' />
            </Button>
            <Button transparent>
              <Icon type='Ionicons' name='md-notifications-outline' />
            </Button>
          </Right>
        </Header>

        <Content
          style={{ backgroundColor: '#f7d794' }}>
          <View
          // style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 50 }}
          >
            <Card button style={{ borderRadius: 60, width: 300, marginLeft: 50, height: 70, marginTop: 60, backgroundColor: '#73C6B6' }}>
              <IconCom click={() => this.ChangePage('Addasset', 'car')}
                url={require('../../images/car.png')} text="ยานพาหนะ" /></Card>
            <Card button style={{ borderRadius: 60, width: 300, marginLeft: 50, height: 70, marginTop: 60, backgroundColor: '#F4D03F' }}>
              <IconCom click={() => this.ChangePage('Addasset', 'accessories')} url={require('../../images/As.png')} text="เครื่องประดับ" /></Card>
          </View>
          <View
          // style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 50 }}
          >
            <Card button style={{ borderRadius: 60, width: 300, marginLeft: 50, height: 70, marginTop: 60, backgroundColor: '#EB984E' }}>
              <IconCom click={() => this.ChangePage('Addasset', 'electornic')} url={require('../../images/com.png')} text='เครื่องมืออิเล็กทรอนิกส์' /></Card>
            <Card button style={{ borderRadius: 60, width: 300, marginLeft: 50, height: 70, marginTop: 60, backgroundColor: '#fd79a8' }}>
              <IconCom click={() => this.ChangePage('Addasset', 'home')} url={require('../../images/2.png')} text='เอกสาร' /></Card>
          </View>

        </Content>



        <Footer >
          <FooterTab style={{ backgroundColor: '#0c2461' }}>
            <Button
              onPress={() => {
                let fn = this.props.navigation.getParam('refresh', 'none')
                if (fn !== 'none') fn() // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                this.props.navigation.navigate('Signup')
              }}
              vertical>
              <Icon name="person" />
              <Text style={{ color: 'white' }}>โปรไฟล์</Text>
            </Button>
            <Button vertical >
              <Icon active name="home" />
              <Text style={{ color: 'white' }}>หน้าหลัก</Text>
            </Button>
            <Button
              onPress={() => { this.setState({ modalVisible: true }) }} vertical>
              <Icon type='MaterialIcons' name="drafts" />
              <Text style={{ color: 'white' }}>ถ่ายโอนข้อมูล</Text>
            </Button>
            <Button
              onPress={() => {
                this.ChangePage('Calendar')
              }}
              vertical>
              <Icon type='Entypo' name="calendar" />
              <Text style={{ color: 'white' }}>ปฏิทิน</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

})
