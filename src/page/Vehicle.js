import React, { Component } from 'react'
import { AsyncStorage, Text, StyleSheet, View ,TextInput, Modal, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import { Container, Header, Title, Button, Icon,Form, Left, Right, Body ,Content,Picker} from "native-base";
import Mytext from '../components/Mytext'
import Mytextinput from '../components/Mytextinput';

const {height, width} = Dimensions.get('window')

export default class Vehicle extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          chosenDate: new Date(),
          modalVisible: false,

          selected: 'รถยนต์',
          brand: '',
          spec: '',
          color: '',
          number: '',
          date: '',
          province: '',
          name:'',
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
            <Button onPress={()=>{this.setState({modalVisible: true})}} primary>
              <Icon type='Entypo' name='export' />
              <Text style={{color: 'white',padding:15}}>ถ่ายโอน</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView style={{marginTop: 20, flexGrow: 1}}>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined}}
              selectedValue={this.state.selected}
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
          <Mytext text ='เลขทะเบียน'/>
          <Mytextinput
            placeholder = "ระบุเลขทะเบียน "
             />
        </View>
        <View style={styles.displayRow}>
          <Mytext text ='วันจดทะเบียน'/>
          <Mytextinput
            placeholder = "ระบุวันจดทะเบียน "
            />
        </View>
        <View style={styles.displayRow}>
        <Mytext text ='จังหวัด'/>
          <Mytextinput 
            placeholder = "ระบุจังหวัด "
           />
        </View>
        <View style={styles.displayRow}>
          <Mytext text ='ชื่อผู้ถือกรรมสิทธิ์'/>
          <Mytextinput
            placeholder = "ระบุชื่อผู้ถือกรรมสิทธิ์ "
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
          <Button 
            onPress={async() => {
              let dataArray
              let {selected, brand, color, number, date, province,
                partner, note } = this.state
              // let selected = this.state.selected
              let dataInput = {
                  selected, brand, color, number, date, province,
                  partner, note
              }
              // console.log('data saved is :', dataInput)
              let carArray = await AsyncStorage.getItem('carArray')
              if(carArray!==null && carArray.length>0) { // have data
                dataArray = JSON.parse(carArray) // string to json or array
                dataArray.push(dataInput)
              }else { // no have data
                dataArray = []
                dataArray.push(dataInput)
              }
              await AsyncStorage.setItem('carArray', JSON.stringify(dataArray)) // array or json to string
             // console.log('&&&&&&fn : ', this.props.navigation.state)
              this.props.navigation.state.params.refresh()
              this.props.navigation.navigate('Addasset', {comeFrom: 'car'})
            }}
            full primary>
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
