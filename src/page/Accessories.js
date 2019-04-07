import React, { Component } from 'react'
import { Text, StyleSheet, View ,TextInput, Modal, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import { Container, Header, Title, Button, Icon,Form, Left, Right, Body ,Content,Picker} from "native-base";
import Mytext from '../components/Mytext'
import Mytextinput from '../components/Mytextinput';

const {height, width} = Dimensions.get('window')

export default class Accessories extends Component {
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
          transparent={ true }
          visible={this.state.modalVisible}
          presentationStyle ="formSheet"
          containerStyle={{backgroundColor: 'red'}}
          >
          <View style={{flex: 1, backgroundColor: '#00000070'}}>
            <View style={{width: 350, height: 500, marginTop: (height-500)/2 ,backgroundColor: 'white', alignSelf: 'center'}}>
              <TouchableOpacity
                style={{position: 'absolute', top: 0, right: 0, paddingRight: 2, paddingTop: 2, paddingLeft: 18, paddingBottom: 18}}
                onPress={()=>{this.setState({modalVisible: false})}}>
                <Text style={{fontSize: 20, color: 'red'}}>X</Text>
              </TouchableOpacity>
              <Text>Hello Modal</Text>
            </View>
          </View>

        </Modal>

         <Header style={{backgroundColor: '#eb4d4b'}}>
          <Left>
            <Button
              onPress={()=>this.props.navigation.goBack()}  
              transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>กรอกข้อมูลทรัพย์สิน</Title>
          </Body>
          <Right>
            <Button 
              onPress={()=>{this.setState({modalVisible: true})}} primary>
              <Icon type='Entypo' name='export' />
              <Text style={{color: 'white',padding:15}}>ถ่ายโอน</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView style={{marginTop: 20}}>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="สร้อย" value="สร้อย" />
              <Picker.Item label="แหวน" value="แหวน" />
              <Picker.Item label="นาฬิกา" value="นาฬิกา" />
              <Picker.Item label="กำไร" value="กำไร" />
            </Picker>
          </Form>
        <View style={styles.displayRow}>
          <Mytext text ='ยี่ห้อ'/>
          <Mytextinput
            placeholder = "ระบุยี่ห้อ "
             />
        </View>
        <View style={styles.displayRow}>
          <Mytext text ='รุ่น'/>
          <Mytextinput 
            placeholder = "ระบุรุ่น "
             />
        </View>
        <View style={styles.displayRow}>
          <Mytext text ='สี'/>
          <Mytextinput 
            placeholder = "ระบุสี "
             />
        </View>
        <View style={styles.displayRow}>
          <Mytext text ='ขนาด'/>
          <Mytextinput 
            placeholder = "ระบุขนาด "
             />
        </View>
        <View style={styles.displayRow}>
          <Mytext text ='น้ำหนัก'/>
          <Mytextinput
            placeholder = "ระบุน้ำหนัก "
             />
        </View>
        <View style={styles.displayRow}>
          <Mytext text ='ชื่อผู้ถือทรัพย์สินร่วม'/>
          <Mytextinput
            placeholder = "ระบุชื่อผู้ถือทรัพย์สินร่วม "
             />
        </View>
        <View style={styles.displayRow}>
        <Mytext text ='Note'/>
          <Mytextinput
            placeholder = "ระบุข้อความเพิ่มเติม "
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
          <Button full primary>
            <Text style={{color: 'white'}}>Save</Text>
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
