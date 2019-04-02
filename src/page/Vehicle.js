import React, { Component } from 'react'
import { AsyncStorage, Text, StyleSheet, View ,TextInput, Modal, Dimensions, TouchableOpacity} from 'react-native'
import { Container, Header, Title, Button, Icon,Form, Left, Right, Body ,Content,Picker} from "native-base";

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
        <Container style={{marginTop: 20}}>
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
          <Text style={styles.textRow}>ยี่ห้อ</Text>
          <TextInput
            placeholder = "ระบุยี่ห้อ "
            placeholderTextColor = "#eb4d4b"
            onChangeText={(text)=>{this.setState({brand: text})}} 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>รุ่น</Text>
          <TextInput 
            placeholder = "ระบุรุ่น "
            placeholderTextColor = "#eb4d4b"
            onChangeText={(text) => {this.setState({spec:text})}}
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>สี</Text>
          <TextInput 
            placeholder = "ระบุสี "
            placeholderTextColor = "#eb4d4b"
            onChangeText={(text) => {this.setState({color:text})}}
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>เลขทะเบียน</Text>
          <TextInput
            placeholder = "ระบุเลขทะเบียน "
            placeholderTextColor = "#eb4d4b" 
            onChangeText={(text) => {this.setState({number:text})}}
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>วันจดทะเบียน</Text>
          <TextInput 
            placeholder = "ระบุวันจดทะเบียน "
            placeholderTextColor = "#eb4d4b"
            onChangeText={(text) => {this.setState({date:text})}}
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>จังหวัด</Text>
          <TextInput   
            placeholder = "ระบุจังหวัด "
            placeholderTextColor = "#eb4d4b"
            onChangeText={(text) => {this.setState({province:text})}}
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ชื่อผู้ถือกรรมสิทธิ์</Text>
          <TextInput
            placeholder = "ระบุชื่อผู้ถือกรรมสิทธิ์ "
            placeholderTextColor = "#eb4d4b" 
            onChangeText={(text) => {this.setState({name:text})}}
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ชื่อผู้ถือทรัพย์สินร่วม</Text>
          <TextInput 
            placeholder = "ระบุชื่อผู้ถือทรัพย์สินร่วม "
            placeholderTextColor = "#eb4d4b"
            onChangeText={(text) => {this.setState({partner:text})}}
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>Note</Text>
          <TextInput 
            onChangeText={(text) => {this.setState({note:text})}}
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
              console.log('&&&&&&fn : ', this.props.navigation.state)
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
