
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Title, Button, Icon, Form, Left, Right, Body, Content, Picker } from "native-base";
import Mytext from '../components/Mytext'
import Mytextinput from '../components/Mytextinput';
import SQLite from 'react-native-sqlite-storage'

const { height, width } = Dimensions.get('window')
var db = SQLite.openDatabase({ name: 'DB.db' });
export default class Electornic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      modalVisible: false,
      selected: undefined,


      type: 'Harddisk',
      brand: '',
      number: '',
      color: '',
      date: '',
      insurance: '',
      store: '',
      partner: '',
      note: ''

    };
    this.setDate = this.setDate.bind(this);
  }



  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    //#ffd32a
  }
  onValueChange(value) {
    this.setState({
      type: value
    });
  }
  Save = () => {
    const { type, brand, number, color, date, insurance, store, partner, note } = this.state
    console.log(type, brand, number, color, date, insurance, store, partner, note)
    console.log('is Saved electornic')
    if (type) {
      if (brand) {
        if (number) {
          if (color) {
            if (date) {
              if (insurance) {
                if (store) {
                  if (partner) {
                    if (note) {
                      console.log('is กรอกครบ Saved electornic')

                      db.transaction((tx) => {
                        tx.executeSql(`
                            INSERT INTO electornic (
                              type,
                              brand,
                              number,
                              color,
                              date,
                              insurance,
                              store,
                              partner,
                              note
                            )
                            VALUES (
                              '${type}',
                              '${brand}',
                              '${number}',
                              '${color}',
                              '${date}',
                              '${insurance}',
                              '${store}',
                              '${partner}',
                              '${note}'
                            )
                          `, [], (t, res) => {
                            // save สำเร็จ
                            console.log('res insert electornic : ', res)
                            let fn = this.props.navigation.getParam('refresh', 'none')
                            fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                            this.props.navigation.navigate('Addasset', { comeFrom: 'electornic' })
                          })
                      })

                    } else {
                      alert('กรุณากรอก Note')
                    }
                  } else {
                    alert('กรุณากรอกชื่อผู้ถือทรัพย์สินร่วม')
                  }
                } else {
                  alert('กรุณากรอกร้านที่ซื้อ')
                }
              } else {
                alert('กรุณากรอกวันหมดประกัน')
              }
            } else {
              alert('กรุณากรอกวันที่ซื้อ')
            }
          } else {
            alert('กรุณากรอกสี')
          }
        } else {
          alert('กรุณากรอกรุ่น')
        }
      } else {
        alert('กรุณากรอกยี่ห้อ')
      }
    }
  };
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

        <Header style={{ backgroundColor: '#eb4d4b' }}>
          <Left>
            <Button
              onPress={() => this.props.navigation.goBack()}
              transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>กรอกข้อมูลทรัพย์สิน</Title>
          </Body>
          <Right>
            <Button

              onPress={() => { this.setState({ modalVisible: true }) }} primary>
              <Icon type='Entypo' name='export' />
              <Text style={{ color: 'white', padding: 8 }}>ถ่ายโอน</Text>
            </Button>
          </Right>
        </Header>
        <Header >
          <Button
            vertical>
            <Icon name="laptop" />
            <Text style={{ color: 'white' }}>มือถือ/คอมฯ</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('com')}
            vertical>
            <Icon name="bulb" />
            <Text style={{ color: 'white' }}>เครื่องใช้ไฟฟ้า</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('musical')}
            vertical >
            <Icon active name="musical-note" />
            <Text style={{ color: 'white' }}>เครื่องดนตรี</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text style={{ color: 'white' }}>อุปกรณ์อื่นๆ</Text>
          </Button>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          <Form>
            <Picker
              mode="dropdown"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.type}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Harddisk" value="Harddisk" />
              <Picker.Item label="Ram" value="Ram" />
              <Picker.Item label="Smart Watch" value="Smart Watch" />
              <Picker.Item label="SSD" value="SSD" />
              <Picker.Item label="XBOX" value="XBOX" />
              <Picker.Item label="คอมพิวเตอร์" value="คอมพิวเตอร์" />
              <Picker.Item label="เครื่องปริ๊น" value="เครื่องปริ๊น" />
              <Picker.Item label="คีย์บอร์ด" value="คีย์บอร์ด" />
              <Picker.Item label="โน๊ตบุค" value="โน๊คบุค" />
              <Picker.Item label="โทรศัพท์มือถือ" value="โทรศัพท์มือถือ" />
              <Picker.Item label="โทรศัพท์บ้าน" value="โทรศัพท์บ้าน" />
              <Picker.Item label="โทรทัศน์" value="โทรทัศน์" />
              <Picker.Item label="แท็ปเล็ต" value="แท็ปเล็ต" />
              <Picker.Item label="เมาส์" value="เมาส์" />
              <Picker.Item label="ลำโพง" value="ลำโพง" />
              <Picker.Item label="ลำโพงไร้สาย" value="ลำโพงไร้สาย" />
              <Picker.Item label="หูฟัง" value="หูฟัง" />
              <Picker.Item label="หูฟังไร้สาย" value="หูฟังไร้สาย" />
              <Picker.Item label="อื่นๆ" value="อื่นๆ" />

            </Picker>
          </Form>
          <View style={styles.displayRow}>
            <Mytext text='ยี่ห้อ' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ brand: text }) }}
              placeholder="ระบุยี่ห้อ "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='รุ่น' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ number: text }) }}
              placeholder="ระบุรุ่น "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='สี' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ color: text }) }}
              placeholder="ระบุสี "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='วันที่ซื้อ' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ date: text }) }}
              placeholder="ระบุวันที่ซื้อ "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ประกัน' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ insurance: text }) }}
              placeholder="ระบุวันหมดประกัน "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ร้าน' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ store: text }) }}
              placeholder="ระบุวันร้านที่ซื้อ "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ชื่อผู้ถือทรัพย์สินร่วม' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ partner: text }) }}
              placeholder="ระบุชื่อผู้ถือทรัพย์สินร่วม "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='์Note' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ note: text }) }}
              placeholder="ระบุข้อความเพิ่มเติม "
            />
          </View>
          {/* <View style={styles.displayRow}>
          <Text style={styles.textRow}>กำหนดการแจ้งเตือน</Text>
          <DatePicker
            defaultDate={new Date(2019, 1, 1)}
            minimumDate={new Date(2019, 1, 1)}
            maximumDate={new Date(2019, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"slide"}
            androidMode={"default"} 
            placeHolderText="Select date"
            textStyle={styles.dateStyle}
            placeHolderTextStyle={styles.dateStyle}
            onDateChange={this.setDate}
            disabled={false}
            />
        </View> */}

        </ScrollView>
        <Button
          onPress={this.Save}
          full danger>
          <Text style={{ color: 'white' }}>Save</Text>
        </Button>

      </Container>
    );
  }
}

const styles = StyleSheet.create({

  displayRow: {
    marginLeft: 45,
    backgroundColor: '#ffffff'

  },
  dateStyle: {
    color: "white",
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e67e22',
    paddingHorizontal: 185,
    marginLeft: '17%',
    borderRadius: 4,
  }
})
