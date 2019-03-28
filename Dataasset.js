import React, { Component } from 'react'
import { Text, StyleSheet, View ,TextInput, Modal, Dimensions, TouchableOpacity} from 'react-native'
import { Container, Header, Title, Button, Icon,DatePicker, Left, Right, Body ,Content} from "native-base";

const {height, width} = Dimensions.get('window')

export default class Dataasset extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          chosenDate: new Date(),
          modalVisible: false
        };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      //#ffd32a
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

         <Header style={{backgroundColor: '#8854d0'}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>ข้อมูลทรัพย์สิน</Title>
          </Body>
          <Right>
            <Button onPress={()=>{this.setState({modalVisible: true})}} transparent>
              <Text style={{color: 'white'}}>ถ่ายโอน</Text>
            </Button>
          </Right>
        </Header>
        <Container style={{marginTop: 20}}>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ทะเบียนรถ</Text>
          <TextInput 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ทะเบียนรถ</Text>
          <TextInput 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ทะเบียนรถ</Text>
          <TextInput 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ทะเบียนรถ</Text>
          <TextInput 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ทะเบียนรถ</Text>
          <TextInput 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
          <Text style={styles.textRow}>ทะเบียนรถ</Text>
          <TextInput 
            style={styles.titel} />
        </View>
        <View style={styles.displayRow}>
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
        </View>

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
        borderWidth:1,
        width: "80%",
        backgroundColor: 'white',
        borderColor:'black',
        marginLeft:50
      },
    displayRow: {
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '80%',
      marginLeft: '10%', 
      marginBottom: 20
    },
    textRow: {
      textAlign: 'center'
    },
    dateStyle: {
      color: "white", 
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#e67e22', 
      paddingHorizontal: 102, 
      marginLeft: '5%',
      borderRadius: 4,
    }
})
