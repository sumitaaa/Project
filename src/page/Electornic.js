import React, { Component } from 'react'
import { Text, StyleSheet, View ,TextInput, Modal, Dimensions, TouchableOpacity} from 'react-native'
import { Container, Header, Title, Button, Icon,Form, Left, Right, Body ,Content,Picker} from "native-base";

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
              <Text style={{color: 'white',padding:8}}>ถ่ายโอน</Text>
            </Button>
          </Right>
        </Header>
        <Container style={{marginTop: 20}}>
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
              <Picker.Item label="โทรศัพท์" value="โทรศัพท์" />
              <Picker.Item label="คอมพิวเตอร์" value="คอมพิวเตอร์" />
              <Picker.Item label="โทรทัศน์" value="โทรทัศน์" />
              <Picker.Item label="เครื่องซักผ้า" value="เครื่องซักผ้า" />
            </Picker>
          </Form>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ยี่ห้อ</Text>
          <TextInput 
            placeholder = "ระบุยี่ห้อ "
            placeholderTextColor = "#eb4d4b"
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>รุ่น</Text>
          <TextInput 
            placeholder = "ระบุรุ่น "
            placeholderTextColor = "#eb4d4b"
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>สี</Text>
          <TextInput 
            placeholder = "ระบุสี "
            placeholderTextColor = "#eb4d4b"
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>วันที่ซื้อ</Text>
          <TextInput 
            placeholder = "ระบุวันที่ซื้อ "
            placeholderTextColor = "#eb4d4b"
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ประกัน</Text>
          <TextInput
            placeholder = "ระบุวันหมดประกัน "
            placeholderTextColor = "#eb4d4b" 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ร้าน</Text>
          <TextInput
            placeholder = "ระบุวันร้านที่ซื้อ "
            placeholderTextColor = "#eb4d4b" 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ชื่อผู้ถือทรัพย์สินร่วม</Text>
          <TextInput
            placeholder = "ระบุชื่อผู้ถือทรัพย์สินร่วม "
            placeholderTextColor = "#eb4d4b"  
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>Note</Text>
          <TextInput
            placeholder = "ระบุข้อความเพิ่มเติม "
           placeholderTextColor = "#eb4d4b" 
            style={styles.titel} />
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

        </Container>
          <Button full primary>
            <Text style={{color: 'white'}}>Save</Text>
          </Button>

        </Container>
        );
      }
    }

const styles = StyleSheet.create({
    titel:{
    margin: 15,
    height: 40,
    width: 350,
    borderColor: '#eb4d4b',
    borderWidth: 1
      },
    displayRow: {
      marginLeft: 45,
      backgroundColor: '#ffffff'
    },
    textRow: {
     color:'black'

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
