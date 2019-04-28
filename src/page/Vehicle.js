import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Modal, Dimensions, Alert, ScrollView } from 'react-native';
import { Container, Header, Title, Button, Icon, Form, Left, Right, Body, Content, Picker } from 'native-base';
import Mytext from '../components/Mytext'
import Mytextinput from '../components/Mytextinput';
import SQLite from 'react-native-sqlite-storage'
import { thisTypeAnnotation } from '@babel/types';

const { height, width } = Dimensions.get('window')
var db = SQLite.openDatabase({ name: 'myB.db' });
export default class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      modalVisible: false,

      type: 'รถยนต์',
      brand: '',
      number: '',
      color: '',
      tabain: '',
      date: '',
      province: '',
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
    const { type, brand, number, color, tabain, date,
      province, ownership, partner, note } = this.state
    console.log(type, brand, number, color, tabain, date, province, ownership, partner, note)
    if (type) {
      if (brand) {
        if (number) {
          if (color) {
            if (tabain) {
              if (date) {
                if (province) {
                  if (ownership) {
                    if (partner) {
                      if (note) {
                        db.transaction(function (tx) {
                          tx.executeSql(`CREATE TABLE IF NOT EXISTS vehicle(ID int, type VARCHAR(30), 
                              brand VARCHAR(30), number VARCHAR(30), color VARCHAR(20), tabain VARCHAR(10),
                              date VARCHAR(50), province VARCHAR(30), ownership VARCHAR(60), 
                              partner VARCHAR(60), note VARCHAR(100) )`,
                            [type, brand, number, color, tabain, date, province, ownership, partner, note],
                            (tx, result) => {
                              console.log('create table result : ', result.rowsAffected);
                              if (result.rowsAffected > 0) {
                                Alert.alert(
                                  'บันทึกสำเร็จ',
                                  [
                                    {
                                      text: 'ตกลง',
                                      onPress: () => that.props.navigation.navigate('Addasset'),
                                    },
                                  ],
                                  { cancelable: false }
                                );
                              } else {
                                alert('ล้มเหลว');
                              }
                              // this.props.navigation.navigate('Addasset')
                              // }, (e) => {
                              //   console.log('error create table: ', e)
                            }
                          );

                        });

                      }
                    }
                  } else {
                    alert('กรุณากรอกชื่อผู้ถือกรรมสิทธิ์')
                  }
                } else {
                  alert('กรุณากรอกจังหวัด')
                }
              } else {
                alert('กรุณากรอกวันที่ซื่อ')
              }
            } else {
              alert('กรุณากรอกทะเบียน')
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
  // componentDidMount() {
  //   db.transaction((tx) => {
  //     tx.executeSql(`CREATE TABLE IF NOT EXISTS vehicle(ID int, type VARCHAR(30), 
  //       brand VARCHAR(30), number VARCHAR(30), color VARCHAR(20), tabain VARCHAR(10),
  //       date VARCHAR(50), province VARCHAR(30), ownership VARCHAR(60), 
  //       partner VARCHAR(60), note VARCHAR(100) )`,
  //       [type, brand, number, color, tabain, date, province, ownership, partner, note],
  //       (tx, result) => {
  //         console.log('create table result : ', result)
  //         if (result.rowsAffected > 0) {
  //           Alert.alert(
  //             'บันทึกสำเร็จ'
  //             [
  //             {
  //               text: 'ตกลง',
  //               onPress: () => this.props.navigation.navigate('Addasset')
  //             }
  //             ],
  //             {cancelable:false}
  //           );
  //         }
  //         // this.props.navigation.navigate('Addasset')
  //       }, (e) => {
  //         console.log('error create table: ', e)
  //       });
  //   })
  // }
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
            <Button onPress={() => { this.setState({ modalVisible: true }) }} primary>
              <Icon type='Entypo' name='export' />
              <Text style={{ color: 'white', padding: 15 }}>ถ่ายโอน</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20, flexGrow: 1 }}>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.type}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="รถยนต์" value="รถยนต์" />
              <Picker.Item label="จักรยานยนต์" value="จักรยานยนต์" />
              <Picker.Item label="จักรยาน" value="จักรยาน" />
              <Picker.Item label="เรือ" value="เรือ" />
              <Picker.Item label="เครื่องบิน" value="เครื่องบิน" />
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
            <Mytext text='เลขทะเบียน' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ tabain: text }) }}
              placeholder="ระบุเลขทะเบียน "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='วันจดทะเบียน' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ date: text }) }}
              placeholder="ระบุวันจดทะเบียน "
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
