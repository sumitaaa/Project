import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Title, Button, Icon, Form, Left, Right, Body, Content, Picker } from "native-base";
import Mytext from '../components/Mytext'
import Mytextinput from '../components/Mytextinput';
import SQLite from 'react-native-sqlite-storage'

const { height, width } = Dimensions.get('window')
var db = SQLite.openDatabase({ name: 'DB.db' });

export default class Home2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,

      selectedTab: 0,
      value: '',
      type: 'ที่ดิน',
      name: 'น.ส.2',
      number: '',
      district: '',
      province: '',
      area: '',
      date: '',
      ownership: '',
      note: ''
    };
  }
  setTab = selectedTab => {
    this.setState({ selectedTab });
  }

  updateValue = (itemValue, itemIndex) => {
    this.setState({ value: itemValue })
  }
  onValueChange = (value) => {
    this.setState({
      type: value
    });
  }


  Save = () => {
    const { type, number, value, district, province, area, date, ownership, note } = this.state
    console.log(type, number, value, district, province, area, date, ownership, note)
    console.log('is Saved home2')
    if (type) {
      if (value) {
        if (number) {
          if (district) {
            if (province) {
              if (area) {
                if (date) {
                  if (ownership) {
                    if (note) {
                      console.log('is กรอกครบ Saved home2')

                      db.transaction((tx) => {
                        tx.executeSql(`
                            INSERT INTO homes (
                              type, 
                              number, 
                              value,
                              district, 
                              province, 
                              area, 
                              date, 
                              ownership, 
                              note
                            )
                            VALUES (
                              '${type}',
                              '${number}',
                              '${value}',
                              '${district}',
                              '${province}',
                              '${area}',
                              '${date}',
                              '${ownership}',
                              '${note}'
                            )
                          `, [], (t, res) => {
                            // save สำเร็จ
                            console.log('res insert home2 : ', res)
                            let fn = this.props.navigation.getParam('refresh', 'none')
                            fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                            this.props.navigation.navigate('Addasset', { comeFrom: 'home' })
                          })
                      })

                    } else {
                      alert('กรุณากรอก Note')
                    }
                  } else {
                    alert('กรุณากรอกชื่อผู้ถือกรรมสิทธิ์คนปัจจุบัน')
                  }
                } else {
                  alert('กรุณากรอกวันที่ออกโฉนด')
                }
              } else {
                alert('กรุณากรอกเนื้อที่(ตารางวา)')
              }
            } else {
              alert('กรุณากรอกจังหวัด')
            }
          } else {
            alert('กรุณากรอกอำเภอ')
          }
        } else {
          alert('กรุณากรอกเลขที่โฉนด')
        }
      } else {
        alert('กรุณาเลือกชนิด')
      }
    }
  };
  render() {
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
              <Text style={{ color: 'white', padding: 15 }}>ถ่ายโอน</Text>
            </Button>
          </Right> */}
        </Header>
        <Header style={{ backgroundColor: '#dff9fd' }}>
          <Button
            style={{ backgroundColor: '#dff9fd', width: 115 }}
            onPress={() => { this.setState({ type: 'ที่ดิน', value: 'น.ส.2' }) }}
            vertical>
            <Icon style={{ color: 'black' }} name="flag" />
            <Text style={{ color: 'black' }}>ที่ดิน</Text>
          </Button>
          <Button
            style={{ backgroundColor: '#dff9fd', width: 133 }}
            onPress={() => { this.props.navigation.navigate('condo') }}

            vertical >
            <Icon style={{ color: 'black' }} active name="home" />
            <Text style={{ color: 'black' }}>ทรัพย์สินบนที่ดิน</Text>
          </Button>
          <Button
            style={{ backgroundColor: '#dff9fd', width: 105 }}
            onPress={() => { this.setState({ type: 'ภาษี', value: 'ภาษีเงินได้บุคคลธรรมดา' }) }}
            onPress={() => { this.props.navigation.navigate('flax') }}
            vertical>
            <Icon style={{ color: 'black' }} name="cash" />
            <Text style={{ color: 'black' }}>ภาษี</Text>
          </Button>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          <Picker
            selectedValue={this.state.value}
            onValueChange={this.updateValue}
          >

            <Picker.Item label="น.ส.2" value="น.ส.2" />
            <Picker.Item label="น.ส.3" value="น.ส.3" />
            <Picker.Item label="น.ส.3 ก" value="น.ส.3 ก" />
            <Picker.Item label="น.ส.3 ข" value="น.ส.3 ข" />
            <Picker.Item label="น.ส.4" value="น.ส.4" />
            <Picker.Item label="น.ส.5" value="น.ส.5" />
            <Picker.Item label="น.ค.3" value="น.ค.3" />
            <Picker.Item label="ส.ค.1" value="ส.ค.1" />
            <Picker.Item label="ส.ท.ก" value="ส.ท.ก" />
            <Picker.Item label="ส.ป.ก" value="ส.ป.ก" />
            <Picker.Item label="ภ.บ.ท.5" value="ภ.บ.ท.5" />
            <Picker.Item label="อื่นๆ" value="อื่นๆ" />
          </Picker>

          <View style={styles.displayRow}>
            <Mytext text='เลขที่โฉนด' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ number: text }) }}
              placeholder="ระบุเลขที่โฉนด "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='อำเภอ' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ district: text }) }}
              placeholder="ระบุอำเภอ เช่น ท่าศาลา "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='จังหวัด' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ province: text }) }}
              placeholder="ระบุจังหวัด "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='เนื้อที่(ตารางวา)' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ area: text }) }}
              placeholder="ระบุเนื้อที่(ตารางวา)"
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='วันที่ออกโฉนด' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ date: text }) }}
              placeholder="ระบุวันที่ออกโฉนด  เช่น 01/01/2019"
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ชื่อผู้ถือกรรมสิทธิ์คนปัจจุบัน' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ ownership: text }) }}
              placeholder="ระบุชื่อผู้ถือกรรมสิทธิ์คนปัจจุบัน "
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

        </ScrollView >
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