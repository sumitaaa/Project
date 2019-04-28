import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Title, Button, Icon, Form, Left, Right, Body, Content, Picker } from "native-base";
import Mytext from '../components/Mytext'
import Mytextinput from '../components/Mytextinput';

const { height, width } = Dimensions.get('window')

export default class Electornic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            modalVisible: false,
            selected: undefined
        };
        this.setDate = this.setDate.bind(this);
    }



    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        //#ffd32a
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
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
                    <Button onPress={() => this.props.navigation.navigate('Electornic')} vertical>
                        <Icon name="laptop" />
                        <Text style={{ color: 'white' }}>มือถือ/คอมฯ</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate('com')} vertical>
                        <Icon name="bulb" />
                        <Text style={{ color: 'white' }}>เครื่องใช้ไฟฟ้า</Text>
                    </Button>
                    <Button vertical >
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
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="ดนตรีไทย" value="" />
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
                    </Form>
                    <View style={styles.displayRow}>
                        <Mytext text='ยี่ห้อ' />
                        <Mytextinput
                            placeholder="ระบุยี่ห้อ "
                        />
                    </View>
                    <View style={styles.displayRow}>
                        <Mytext text='รุ่น' />
                        <Mytextinput
                            placeholder="ระบุรุ่น "
                        />
                    </View>
                    <View style={styles.displayRow}>
                        <Mytext text='สี' />
                        <Mytextinput
                            placeholder="ระบุสี "
                        />
                    </View>
                    <View style={styles.displayRow}>
                        <Mytext text='วันที่ซื้อ' />
                        <Mytextinput
                            placeholder="ระบุวันที่ซื้อ "
                        />
                    </View>
                    <View style={styles.displayRow}>
                        <Mytext text='ประกัน' />
                        <Mytextinput
                            placeholder="ระบุวันหมดประกัน "
                        />
                    </View>
                    <View style={styles.displayRow}>
                        <Mytext text='ร้าน' />
                        <Mytextinput
                            placeholder="ระบุวันร้านที่ซื้อ "
                        />
                    </View>
                    <View style={styles.displayRow}>
                        <Mytext text='ชื่อผู้ถือทรัพย์สินร่วม' />
                        <Mytextinput
                            placeholder="ระบุชื่อผู้ถือทรัพย์สินร่วม "
                        />
                    </View>
                    <View style={styles.displayRow}>
                        <Mytext text='์Note' />
                        <Mytextinput
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
                <Button full danger>
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
