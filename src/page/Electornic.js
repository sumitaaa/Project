
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


      value: '',
      type: 'call',
      name: 'harddisk',
      brand: '',
      number: '',
      color: '',
      date: '',
      insurance: '',
      store: '',
      owner: '',
      partner: '',
      note: ''


    };
    this.setDate = this.setDate.bind(this);
  }



  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    //#ffd32a
  }
  updateValue = (itemValue, itemIndex) => {
    this.setState({ value: itemValue })
  }
  onValueChange(value) {
    this.setState({
      type: value
    });
  }
  Save = () => {
    const { type, value, brand, number, color, date, insurance, store, owner, partner, note } = this.state
    console.log(type, value, brand, number, color, date, insurance, store, owner, partner, note)
    console.log('is Saved electornic')
    if (type) {
      if (value) {
        if (brand) {
          if (number) {
            if (color) {
              if (date) {
                if (insurance) {
                  if (store) {
                    if (owner) {
                      if (partner) {
                        if (note) {
                          console.log('is กรอกครบ Saved electornic')

                          db.transaction((tx) => {
                            tx.executeSql(`
                            INSERT INTO electornic (
                              type,
                              value,
                              brand,
                              number,
                              color,
                              date,
                              insurance,
                              store,
                              owner,
                              partner,
                              note

                            )
                            VALUES (
                              '${type}',
                              '${value}',
                              '${brand}',
                              '${number}',
                              '${color}',
                              '${date}',
                              '${insurance}',
                              '${store}',
                              '${owner}',
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
                      alert('กรุณากรอกชื่อผู้ถือกรรมสิทธิ์')
                    }
                  } else {
                    alert('กรุณากรอกชื่อร้าน')
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
      } else {
        alert('กรุณาเลือกชนิด')
      }
    }
  };
  render() {
    const Type1 = () => {
      return (
        <View>
          <Picker
            selectedValue={this.state.value}
            onValueChange={this.updateValue}
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
        </View>
      )
    }

    const Type2 = () => {
      return (
        <View>
          <Picker
            selectedValue={this.state.value}
            onValueChange={this.updateValue}
          >

            <Picker.Item label="กระติกน้ำร้อน" value="กระติกน้ำร้อน" />
            <Picker.Item label="กระทะไฟฟ้า" value="กระทะไฟฟ้า" />
            <Picker.Item label="เครื่องซักผ้า" value="เครื่องซักผ้า" />
            <Picker.Item label="เครื่องดูดฝุ่น" value="เครื่องดูดฝุ่น" />
            <Picker.Item label="เครื่องปิ๊งขนมปัง" value="เครื่องปิ๊งขนมปัง" />
            <Picker.Item label="เครื่องเป่าผม" value="เครื่องเป่าผม" />
            <Picker.Item label="เครื่องปรับอากาศ" value="เครื่องปรับอากาศ" />
            <Picker.Item label="เครื่องปั่น" value="เครื่องปั่น" />
            <Picker.Item label="เครื่องทำน้ำอุ่น" value="เครื่องทำน้ำอุ่น" />
            <Picker.Item label="เครื่องสูบน้ำ" value="เครื่องสูบน้ำ" />
            <Picker.Item label="เตารีด" value="เตารีด" />
            <Picker.Item label="เตาปิ้งย่าง" value="เตาปิ้งย่าง" />
            <Picker.Item label="พัดลม" value="พัดลม" />
            <Picker.Item label="มอเตอร์" value="มอเตอร์" />
            <Picker.Item label="หม้อหุงข้าว" value="หม้อหุงข้าว" />
            <Picker.Item label="อื่นๆ" value="อื่นๆ" />
          </Picker>
        </View>
      )
    }

    const Type3 = () => {
      return (
        <View>
          <Picker
            selectedValue={this.state.value}
            onValueChange={this.updateValue}
          >

            <Picker.Item label="ดนตรีไทย" value="ดนตรีไทย" />
            <Picker.Item label="กรับ" value="กรับ" />
            <Picker.Item label="กลอง" value="กลอง" />
            <Picker.Item label="ขิม" value="ขิม" />
            <Picker.Item label="ขลุ่ย" value="ขลุ่ย" />
            <Picker.Item label="ฆ้อง" value="ฆ้อง" />
            <Picker.Item label="ฉิ่ง" value="ฉิ่ง" />
            <Picker.Item label="ฉาบ" value="ฉาบ" />
            <Picker.Item label="จะเข้" value="จะเข้" />
            <Picker.Item label="ซอ" value="ซอ" />
            <Picker.Item label="ตะโพน" value="ตะโพน" />
            <Picker.Item label="ระนาดเอก" value="ระนาดเอก" />
            <Picker.Item label="ระนาดทุ้ม" value="ระนาดทุ้ม" />
            <Picker.Item label="สะล้อ" value="สะล้อ" />
            <Picker.Item label=". . ." value="" />
            <Picker.Item label="ดนตรีสากล" value="" />
            <Picker.Item label="กีตาร์โปร่ง" value="กีตาร์โปร่ง" />
            <Picker.Item label="กีตาร์ไฟฟ้า" value="กีตาร์ไฟฟ้า" />
            <Picker.Item label="กลอง" value="กลอง" />
            <Picker.Item label="คีย์บอร์ด" value="คีย์บอร์ด" />
            <Picker.Item label="แซกโซโฟน" value="แซกโซโฟน" />
            <Picker.Item label="ทรัมเป็ต" value="ทรัมเป็ต" />
            <Picker.Item label="กลอง" value="กลอง" />
            <Picker.Item label="เปียโน" value="เปียโน" />
            <Picker.Item label="ฟลูต" value="ฟลูต" />
            <Picker.Item label="ไวโอลีน" value="ไวโอลีน" />
            <Picker.Item label="อื่นๆ" value="อื่นๆ" />
          </Picker>
        </View>
      )
    }

    const Type4 = () => {
      return (
        <View>
          <Picker
            selectedValue={this.state.value}
            onValueChange={this.updateValue}
          >

            <Picker.Item label="กล้องถ่ายรูป" value="กล้องถ่ายรูป" />
            <Picker.Item label="กล้องวงจรปิด" value="กล้องวงจรปิด" />
            <Picker.Item label="เครื่องคิดเลข" value="เครื่องคิดเลข" />
            <Picker.Item label="โดรน" value="โดรน" />
            <Picker.Item label="เพาเวอร์แบงค์" value="เพาเวอร์แบงค์" />
            <Picker.Item label="วิทยุสื่อสาร" value="วิทยุสื่อสาร" />
            <Picker.Item label="อื่นๆ" value="อื่นๆ" />
          </Picker>
        </View>
      )
    }
    return (
      <Container>
        {/* <Modal
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

        </Modal> */}

        <Header style={{ backgroundColor: '#0c2461' }}>
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
          {/* <Right>
            <Button

              onPress={() => { this.setState({ modalVisible: true }) }} primary>
              <Icon type='Entypo' name='export' />
              <Text style={{ color: 'white', padding: 8 }}>ถ่ายโอน</Text>
            </Button>
          </Right> */}
        </Header>
        <Header style={{ backgroundColor: '#dff9fd' }}>
          <Button
            style={{ backgroundColor: '#dff9fd' }}
            onPress={() => { this.setState({ type: 'มือถือ/คอม', value: 'Harddisk' }) }}
            vertical>
            <Icon style={{ color: 'black', }} name="laptop" />
            <Text style={{ color: 'black' }}>คอมฯ</Text>
          </Button>
          <Button
            style={{ backgroundColor: '#dff9fd' }}
            onPress={() => { this.setState({ type: 'เครื่องใช้ไฟฟ้า', value: 'กระติกน้ำร้อน' }) }}
            vertical>
            <Icon style={{ color: 'black' }} name="bulb" />
            <Text style={{ color: 'black' }}>เครื่องใช้ไฟฟ้า</Text>
          </Button>
          <Button
            style={{ backgroundColor: '#dff9fd' }}
            onPress={() => { this.setState({ type: 'เครื่องดนตรี', value: 'ดนตรีไทย' }) }}
            vertical >
            <Icon style={{ color: 'black' }} active name="musical-note" />
            <Text style={{ color: 'black' }}>เครื่องดนตรี</Text>
          </Button>
          <Button
            style={{ backgroundColor: '#dff9fd' }}
            onPress={() => { this.setState({ type: 'อุปกรณ์อื่นๆ', value: 'กล้องถ่ายรูป' }) }}
            vertical>
            <Icon style={{ color: 'black' }} name="camera" />
            <Text style={{ color: 'black' }}>อื่นๆ</Text>
          </Button>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          <View>
            {
              this.state.type === 'มือถือ/คอม' ? <Type1 /> :
                this.state.type === 'เครื่องใช้ไฟฟ้า' ? <Type2 /> :
                  this.state.type === 'เครื่องดนตรี' ? <Type3 /> :
                    this.state.type === 'อุปกรณ์อื่นๆ' ? <Type4 /> :
                      null
            }
          </View>
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
              placeholder="ระบุสี เช่น ขาว "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='วันที่ซื้อ' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ date: text }) }}
              placeholder=" เช่น 01/01/2019 "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ประกัน' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ insurance: text }) }}
              placeholder="ระบุวันหมดประกัน เช่น 01/01/2019 "
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
            <Mytext text='ผู้ถือกรรมสิทธิ์' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ owner: text }) }}
              placeholder="ระบุชื่อผู้ถือกรรมสิทธิ์ "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ผู้ถือทรัพย์สินร่วม' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ partner: text }) }}
              placeholder="ระบุชื่อผู้ถือทรัพย์สินร่วม "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='Note' />
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
        <Button style={{ backgroundColor: '#0c2461' }}
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
    backgroundColor: '#ffffff',
    color: '#0c2461'

  },
  dateStyle: {
    color: "white",
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0c2461',
    paddingHorizontal: 185,
    marginLeft: '17%',
    borderRadius: 4,
  }
})
