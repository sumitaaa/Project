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

            email: '',
            password: '',
            department: '',
            selectedTab: 0,

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
    setTab = selectedTab => {
        this.setState({ selectedTab });
    }
    updateDepartment = (department) => {  // updateDepartment รับตัวแปลมาจาก department
        this.setState({ department: department })
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
                <Header>
                    <Button
                        onPress={() => { this.props.navigation.navigate('Home2') }}
                        vertical>
                        <Icon name="flag" />
                        <Text style={{ color: 'white' }}>ที่ดิน</Text>
                    </Button>
                    <Button
                        onPress={() => { this.props.navigation.navigate('condo') }}
                        vertical >
                        <Icon active name="home" />
                        <Text style={{ color: 'white' }}>ทรัพย์สินบนที่ดิน</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="cash" />
                        <Text style={{ color: 'white' }}>ภาษี</Text>
                    </Button>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                    <Picker
                        selectedValue={this.state.department}
                        onValueChange={this.updateDepartment}>

                        <Picker.Item label="ภาษีเงินได้บุคคลธรรมดา" value="ภาษีเงินได้บุคคลธรรมดา" />
                        <Picker.Item label="ภาษีเงินได้นิติบุคคล" value="ภาษีเงินได้นิติบุคคล" />
                        <Picker.Item label="ภาษีมูลค่าเพิ่ม" value="ภาษีมูลค่าเพิ่ม" />
                        <Picker.Item label="ภาษีธุรกิจเฉพาะ" value="ภาษีธุรกิจเฉพาะ" />
                        <Picker.Item label="ภาษีอากรแสตมป์" value="ภาษีอากรแสตมป์" />
                        <Picker.Item label="ภาษีหัก ณ ที่จ่าย" value="ภาษีหัก ณ ที่จ่าย" />
                        <Picker.Item label="ภาษีมรดก" value="ภาษีมรดก" />
                        <Picker.Item label="ภาษีเงินได้ปิโตรเลียม" value="ภาษีเงินได้ปิโตรเลียม" />
                        <Picker.Item label="ภาษีป้าย" value="ภาษีป้าย" />
                        <Picker.Item label="ภาษีโรงเรือนและที่ดิน" value="ภาษีโรงเรือนและที่ดิน" />
                        <Picker.Item label="ภาษีบำรุงท้องที่" value="ภาษีบำรุงท้องที่" />
                        <Picker.Item label="อากรรังนกนางแอ่น" value="อากรรังนกนางแอ่น" />
                    </Picker>

                    <View style={styles.displayRow}>
                        <Mytext text='เลขประจำตัวผู้เสียภาษี' />
                        <Mytextinput
                            onChangeText={(text) => { this.setState({ number: text }) }}
                            placeholder="ระบุเลขประจำตัวผู้เสียภาษี "
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