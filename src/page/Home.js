import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Modal, Dimensions, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Button, Icon, Footer, Right, FooterTab, Body, Content } from "native-base";
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
  componentDidMount() {

    // ลบ data base
    db.transaction((tx) => {
      //tx.executeSql(`DROP TABLE vehicles`, [], (tx, res) => { alert('ลบ vehicles db!!') })
      //tx.executeSql(`DROP TABLE user`, [], (tx, res) => { alert('ลบ user db!!') })
      //tx.executeSql(`DROP TABLE accessories`, [], (tx, res) => { alert('ลบ accessories db!!') })
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
          number VARCHAR(30),
          color VARCHAR(20),
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
        brand VARCHAR(30),
        number VARCHAR(30),
        color VARCHAR(20),
        date VARCHAR(50),
        insurance VARCHAR(30),
        store VARCHAR(30),
        partner VARCHAR(60),
        note VARCHAR(100)
      )`,
        [], (tx, result) => {
          console.log('create table electornic result : ', result);
        })
      // create table home
      tx.executeSql(`CREATE TABLE IF NOT EXISTS home (
        homeID INTEGER PRIMARY KEY AUTOINCREMENT, 
        type VARCHAR(30),
        number VARCHAR(30),
        width VARCHAR(30),
        long VARCHAR(30),
        ownership VARCHAR(30),
        partner VARCHAR(30),
        note VARCHAR(30)
        )`,
        [], (tx, result) => {
          console.log('create table electornic result : ', result);
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
          containerStyle={{ backgroundColor: 'red' }}
        >
          <View style={{ flex: 1, backgroundColor: '#00000070' }}>
            <View style={{ width: 350, height: 500, marginTop: (height - 500) / 2, backgroundColor: 'white', alignSelf: 'center' }}>
              <Right>
                <Button onPress={() => { this.setState({ modalVisible: false }) }} transparent>
                  <Icon type='AntDesign' name='close' />
                </Button>
              </Right>
            </View>
          </View>
        </Modal>

        <Header
          noShadow
          style={{ backgroundColor: '#eb4d4b' }}>
          <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Title style={{ fontSize: 25 }}>หน้าหลัก</Title>
          </Body>

          <Right>
            <Button transparent>
              <Icon type='MaterialCommunityIcons' name='cloud-download' />
            </Button>
            <Button transparent>
              <Icon type='Ionicons' name='md-notifications-outline' />
            </Button>
          </Right>
        </Header>

        <Content style={{ backgroundColor: '#f3a683' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 50 }}>
            <IconCom click={() => this.ChangePage('Addasset', 'car')}
              url={require('../../images/car.png')} text="ยานพาหนะ" />
            <IconCom click={() => this.ChangePage('Addasset', 'accessories')} url={require('../../images/As.png')} text="เครื่องประดับ" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 50 }}>
            <IconCom click={() => this.ChangePage('Addasset', 'electornic')} url={require('../../images/com.png')} text='เครื่องมืออิเล็กทรอนิกส์' />
            <IconCom click={() => this.ChangePage('Addasset', 'home')} url={require('../../images/Do.png')} text='เอกสาร' />
          </View>
        </Content>

        <Footer >
          <FooterTab style={{ backgroundColor: '#eb4d4b' }}>
            <Button
              onPress={() => {
                let fn = this.props.navigation.getParam('refresh', 'none')
                fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
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
