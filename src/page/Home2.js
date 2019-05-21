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
      chosenDate: new Date(),
      modalVisible: false,


      type: 'โฉนดที่ดิน',
      number: '',
      width: '',
      long: '',
      ownership: '',
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
    const { type, number, width, long, ownership, partner, note } = this.state
    console.log(type, number, width, long, ownership, partner, note)
    console.log('is Saved home2')
    if (type) {
      if (number) {
        if (width) {
          if (long) {
            if (ownership) {
              if (partner) {
                if (note) {
                  console.log('is กรอกครบ Saved home2')

                  db.transaction((tx) => {
                    tx.executeSql(`
                            INSERT INTO home (
                              type,
                              number,
                              width,
                              long,
                              ownership,
                              partner,
                              note
                            )
                            VALUES (
                              '${type}',
                              '${number}',
                              '${width}',
                              '${long}',
                              '${ownership}',
                              '${partner}',
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
                alert('กรุณากรอกชื่อผู้ถือทรัพย์สินร่วม')
              }
            } else {
              alert('กรุณากรอกชื่อผู้ถือกรรมสิทธิ์')
            }
          } else {
            alert('กรุณากรอกความยาว')
          }
        } else {
          alert('กรุณากรอกความกว้าง')
        }
      } else {
        alert('กรุณากรอกรุ่น')
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
              <Text style={{ color: 'white', padding: 15 }}>ถ่ายโอน</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.type}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="บ้าน" value="บ้าน" />
              <Picker.Item label="ที่ดิน" value="ที่ดิน" />
              <Picker.Item label="โฉนดที่ดิน" value="โฉนดที่ดิน" />
            </Picker>
          </Form>
          <View style={styles.displayRow}>
            <Mytext text='เลขที่โฉนด' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ number: text }) }}
              placeholder="ระบุเลขที่โฉนด "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ความกว้าง' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ width: text }) }}
              placeholder="ระบุความกว้าง "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ความยาว' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ long: text }) }}
              placeholder="ระบุความยาว "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ชื่อผู้ถือกรรมสิทธิ์' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ ownership: text }) }}
              placeholder="ระบุชื่อผู้ถือกรรมสิทธิ์ "
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