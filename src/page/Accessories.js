import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Title, Button, Icon, Form, Left, Right, Body, Content, Picker } from "native-base";
import Mytext from '../components/Mytext'
import Mytextinput from '../components/Mytextinput';
import SQLite from 'react-native-sqlite-storage'

const { height, width } = Dimensions.get('window')
var db = SQLite.openDatabase({ name: 'DB.db' });

export default class Accessories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      modalVisible: false,

      type: 'สร้อย',
      brand: '',
      number: '',
      color: '',
      size: '',
      weight: '',
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
    const { type, brand, number, color, size, weight, partner, note } = this.state
    console.log(type, brand, number, color, size, weight, partner, note)
    console.log('is Saved accessories')
    if (type) {
      if (brand) {
        if (number) {
          if (color) {
            if (size) {
              if (weight) {
                if (partner) {
                  if (note) {
                    console.log('is กรอกครบ Saved accessories')

                    db.transaction((tx) => {
                      tx.executeSql(`
                            INSERT INTO accessories (
                              type,
                              brand,
                              number,
                              color,
                              size,
                              weight,
                              partner,
                              note
                            )
                            VALUES (
                              '${type}',
                              '${brand}',
                              '${number}', 
                              '${color}',
                              '${size}',
                              '${weight}',
                              '${partner}',
                              '${note}'
                            )
                          `, [], (t, res) => {
                          // save สำเร็จ
                          console.log('res insert accessories : ', res)
                          let fn = this.props.navigation.getParam('refresh', 'none')
                          fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                          this.props.navigation.navigate('Addasset', { comeFrom: 'accessories' })
                        })
                    })

                    //   tx.executeSql(
                    //     `INSERT INTO vehicles (type, brand, number, tabain, date, province, ownershicolor, partner, note) 
                    //            VALUES ('${type}', '${brand}', '${number}', '${tabain}','${date}', '${province}', '${ownershicolor}', '${partner}', '${note}')`,
                    //     [],(tx, result) => {
                    //       console.log('create table result : ', result.rowsAffected);
                    //       if (result.rowsAffected > 0) {
                    //         Alert.alert(
                    //           'บันทึกสำเร็จ',
                    //           [
                    //             {
                    //               text: 'ตกลง',
                    //               onPress: () => that.props.navigation.navigate('Addasset'),
                    //             },
                    //           ],
                    //           { cancelable: false }
                    //         );
                    //       } else {
                    //         alert('ล้มเหลว');
                    //       }

                    //     })
                    // }
                    // );
                  } else {
                    alert('กรุณากรอก Note')
                  }
                } else {
                  alert('กรุณากรอกชื่อผู้ถือทรัพย์สินร่วม')
                }
              } else {
                alert('กรุณากรอกน้ำหนัก')
              }
            } else {
              alert('กรุณากรอกขนาด')
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

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
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
              <Picker.Item label="สร้อย" value="สร้อย" />
              <Picker.Item label="แหวน" value="แหวน" />
              <Picker.Item label="นาฬิกา" value="นาฬิกา" />
              <Picker.Item label="กำไร" value="กำไร" />
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
              placeholder="ระบุสี เช่น ขาว "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='ขนาด' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ size: text }) }}
              placeholder="ระบุขนาด "
            />
          </View>
          <View style={styles.displayRow}>
            <Mytext text='น้ำหนัก(ระบุหน่วย)' />
            <Mytextinput
              onChangeText={(text) => { this.setState({ weight: text }) }}
              placeholder="ระบุน้ำหนัก "
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
