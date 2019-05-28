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

            selectedTab: 0,
            type: 'ภาษีเงินได้บุคคลธรรมดา',
            number: '',
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
        const { type, number, note } = this.state
        console.log(type, number, note)
        console.log('is Saved flax')
        if (type) {
            if (number) {
                if (note) {
                    console.log('is กรอกครบ Saved flax')

                    db.transaction((tx) => {
                        tx.executeSql(`
                            INSERT INTO flax (
                              type,
                              number,
                              note
                            )
                            VALUES (
                              '${type}',
                              '${number}',
                              '${note}'
                            )
                          `, [], (t, res) => {
                                // save สำเร็จ
                                console.log('res insert flax : ', res)
                                let fn = this.props.navigation.getParam('refresh', 'none')
                                fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                                this.props.navigation.navigate('Addasset', { comeFrom: 'home' })
                            })
                    })

                } else {
                    alert('กรุณากรอก Note')
                }

            } else {
                alert('กรุณากรอกเลขประจำตัวผู้เสียภาษี')
            }
        }
    };
    render() {
        return (
            <Container>
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

                </Header>
                <Header style={{ backgroundColor: '#dff9fd' }}>
                    <Button
                        style={{ backgroundColor: '#dff9fd', width: 115 }}
                        onPress={() => { this.props.navigation.navigate('Home2') }}
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
                        vertical>
                        <Icon style={{ color: 'black' }} name="cash" />
                        <Text style={{ color: 'black' }}>ภาษี</Text>
                    </Button>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                    <Picker
                        selectedValue={this.state.type}
                        onValueChange={this.onValueChange}>

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