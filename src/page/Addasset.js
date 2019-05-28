import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView, Modal, Dimensions, TextInput } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Fab } from "native-base";
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({ name: 'DB.db' });
const { height, width } = Dimensions.get('window')

const Item1 = ({ id, type, brand, number, color, tabain, date, province, ownership, partner, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#f4edd6',
    borderRadius: 30
  }}>
    <Text style={{ fontSize: 17, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 5, color: '#000000' }}>ยี่ห้อ : {brand}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>รุ่น : {number}          สี : {color}          ทะเบียน : {tabain}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>วันจดทะเบียน : {date}      จังหวัด : {province}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>ผู้ถือกรรมสิทธิ์ : {ownership}        ผู้ถือทรัพย์สินร่วม : {partner}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)
const Item2 = ({ id, type, brand, number, color, size, weight, partner, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#f4edd6',
    borderRadius: 30
  }}>
    <Text style={{ fontSize: 17, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 5, color: '#000000' }}>ยี่ห้อ : {brand}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>รุ่น : {number}          สี : {color}        ขนาด : {size}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>น้ำหนัก: {weight}      </Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>ผู้ถือทรัพย์สินร่วม : {partner}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)
const Item3 = ({ id, type, name, brand, number, color, date, insurance, store, owner, partner, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#f4edd6',
    borderRadius: 20
  }}>
    <Text style={{ fontSize: 17, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 5, color: '#000000' }}>ชื่อ : {name}            ยี่ห้อ : {brand}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>รุ่น : {number}          สี : {color}         วันที่ซื้อ : {date}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>วันหมดประกัน: {insurance}      ร้านที่ซื้อ : {store}   </Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>ผู้ถือกรรมสิทธิ์ : {owner}     ผู้ถือทรัพย์สินร่วม : {partner}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)


//ที่ดิน
const Item4 = ({ id, type, name, number, district, province, area, date, ownership, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#f4edd6',
    borderRadius: 20
  }}>
    <Text style={{ fontSize: 17, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 20, marginLeft: 10, color: '#000000' }}> ชนิด : {name}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>เลขที่โฉนด : {number}         อำเภอ : {district}          จังหวัด : {province}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>เนื้อที่(ตารางวา) : {area}         วันที่ออกโฉนด : {date}    </Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>ผู้ถือกรรมสิทธิ์คนปัจจุบัน : {ownership}        </Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)

//ทรัพย์สินบนที่ดิน
const Item5 = ({ id, type, number, list, typeasset, nature, ownership, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#f4edd6',
    borderRadius: 20
  }}>
    <Text style={{ fontSize: 17, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>เลขรหัสประจำทรัพย์สิน : {number}         รายการที่อยู่ : {list}     </Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>ประเภททรัพย์สิน : {typeasset}       ลักษณะทรัพย์สิน : {nature}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>ผู้ถือกรรมสิทธิ์คนปัจจุบัน : {ownership}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)

// ภาษี
const Item6 = ({ id, type, number, note }) => (
  <View style={{
    marginVertical: 5,
    fontWeight: 'bold',
    backgroundColor: '#f4edd6',
    borderRadius: 20
  }}>
    <Text style={{ fontSize: 17, marginLeft: 10, color: '#000000' }}>ID: {id}  /  ประเภท : {type}</Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>ระบุเลขประจำตัวผู้เสียภาษี : {number} </Text>
    <Text style={{ fontSize: 15, marginLeft: 20, padding: 2, color: '#000000' }}>Node : {note}</Text>
  </View>
)

export default class Addasset extends Component {

  constructor(props) {
    super(props)

    this.state = {
      comeFrom: '',
      chosenDate: new Date(),
      modalVisible: false,
      dataArray: [],
      active: 'true',
      items: [],
      itemsHome: [],
      itemsCondo: [],
      itemsFlax: [],
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

                      tx.executeSql(`SELECT * FROM home`,
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

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    //#ffd32a
  }

  ChangePage = () => {
    let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
    if (comeFrom === 'car') {
      this.props.navigation.navigate('Vehicle', { refresh: () => { this.componentDidMount() } })
    } else if (comeFrom === 'accessories') {
      this.props.navigation.navigate('Accessories', { refresh: () => { this.componentDidMount() } })
    } else if (comeFrom === 'electornic') {
      this.props.navigation.navigate('Electornic', { refresh: () => { this.componentDidMount() } })
    } else if (comeFrom === 'home') {
      this.props.navigation.navigate('Home2', { refresh: () => { this.componentDidMount() } })
    }
  }

  componentDidMount() { //render ui => do fn()
    // this.getDataArray()
    let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
    console.log('&&&&&&come From : ', comeFrom)
    this.setState({ items: [], comeFrom })
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
      console.log('DDDD')
      db.transaction((tx) => {

        tx.executeSql(`SELECT * FROM homes`, [], (t, res) => {
          let itemsHome = []
          console.log('res is : ', res.rows.length)
          for (let i = 0; i < res.rows.length; i++) {
            itemsHome.push(res.rows.item(i))
            console.log('homes : ', res.rows.item(i))
          }
          this.setState({ itemsHome: itemsHome })
        })

        tx.executeSql(`SELECT * FROM condo`, [], (t, res) => {
          let itemsCondo = []
          console.log('res is : ', res.rows.length)
          for (let i = 0; i < res.rows.length; i++) {
            itemsCondo.push(res.rows.item(i))
            console.log('Condos : ', res.rows.item(i))
          }
          this.setState({ itemsCondo: itemsCondo })
        })

        tx.executeSql(`SELECT * FROM flax`, [], (t, res) => {
          let itemsFlax = []
          console.log('res is : ', res.rows.length)
          for (let i = 0; i < res.rows.length; i++) {
            itemsFlax.push(res.rows.item(i))
            console.log('Flaxs : ', res.rows.item(i))
          }
          this.setState({ itemsFlax: itemsFlax })
        })

      })
    }

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
                placeholder=" ID ทรัพย์สินที่ต้องการโอนข้อมูล"
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
          <Left>
            <Button
              onPress={() => this.props.navigation.goBack()}
              transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 15 }}>เพิ่มข้อมูลทรัพย์สิน</Title>
          </Body>
          <Right>
            <Button style={{ marginLeft: 70, backgroundColor: '#808B96', width: 90, height: 42 }}
              onPress={() => { this.setState({ modalVisible: true }) }} primary>

              <Text style={{ color: 'black', padding: 10, fontSize: 15, }}>ถ่ายโอน</Text>
            </Button>
            <Button
              onPress={() => {
                this.ChangePage()
              }}
              transparent>
              <Icon type='AntDesign' name="plus" />
            </Button>
          </Right>
        </Header>

        <ScrollView style={{ flexGrow: 1, backgroundColor: '#f7d794' }}>

          {
            this.state.items.length === 0 &&
              this.state.itemsCondo.length === 0 &&
              this.state.itemsHome.length === 0 &&
              this.state.itemsFlax.length === 0
              ?
              <Text style={{ marginTop: 310, fontSize: 30, textAlign: 'center', color: '#424949' }}>ไม่มีข้อมูลทรัพย์สิน</Text>
              :
              this.state.comeFrom !== 'home' ?
                this.state.items.map((e, i) => {

                  if (this.state.comeFrom === 'car') {
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
                      note={e.note}
                    />
                  } else if (this.state.comeFrom === 'accessories') {
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
                      note={e.note}
                    />

                  } else if (this.state.comeFrom === 'electornic') {
                    return <Item3
                      key={i}
                      id={e.electornicID}
                      name={e.name}
                      type={e.type}
                      brand={e.brand}
                      number={e.number}
                      color={e.color}
                      date={e.date}
                      insurance={e.insurance}
                      store={e.store}
                      owner={e.owner}
                      partner={e.partner}
                      note={e.note}
                    />
                  }
                })
                :
                // คือหน้า HOME
                <View>

                  {
                    this.state.itemsHome.map((e, i) =>
                      <Item4
                        key={i}
                        id={e.homesID}
                        type={e.type}
                        name={e.name}
                        number={e.number}
                        district={e.district}
                        province={e.province}
                        area={e.area}
                        date={e.date}
                        ownership={e.ownership}
                        note={e.note}
                      // type, number, value, district, province, area, date, ownership, note 
                      />)
                  }
                  {
                    this.state.itemsCondo.map((e, i) =>
                      <Item5
                        key={i}
                        id={e.condoID}
                        type={e.type}
                        number={e.number}
                        list={e.list}
                        typeasset={e.typeasset}
                        nature={e.nature}
                        ownership={e.ownership}
                        note={e.note}

                      />)
                  }
                  {
                    this.state.itemsFlax.map((e, i) =>
                      <Item6
                        key={i}
                        id={e.flaxID}
                        type={e.type}
                        number={e.number}
                        note={e.note}
                      />)
                  }
                </View>
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
              onPress={() => {
                let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
                this.props.navigation.navigate('search', {
                  refresh: () => { this.componentDidMount() },
                  comeFrom
                })
              }
              }
              style={{ backgroundColor: '#34A34F' }}>
              <Icon name="search" />
            </Button>
            <Button

              style={{ backgroundColor: '#3B5998' }}>
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
