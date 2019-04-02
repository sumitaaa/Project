import React, { Component } from 'react'
import { Text, StyleSheet, View, AsyncStorage } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body ,Content} from "native-base";

const Item = (props) => (
  <View style={{borderColor: '#666', borderWidth: 2, padding: 5}}>
    <Text>ประเภท: {props.selected}</Text>
    <Text>ยี่ห้อ: {props.brand}</Text>
    <Text>รุ่น: {props.spec}</Text>
    <Text>สี: {props.color}</Text>
    <Text>ทะเบียน: {props.number}</Text>
    <Text>วันที่จดทะเบียน: {props.date}</Text>
    <Text>ผู้ถือทรัพย์สินร่วม: {props.partner}</Text>
    <Text>note: {props.note}</Text>
  </View>
)

export default class Addasset extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       dataArray: []
    }
  }

  ChangePage = () => {
    let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
    if(comeFrom==='car') {
      this.props.navigation.navigate('Vehicle', {refresh: () => { this.getDataArray()}}) 
    }else if(comeFrom==='accessories') {
      this.props.navigation.navigate('Accessories')
    }else if(comeFrom==='electornic') {
      this.props.navigation.navigate('Electornic')
    }else if(comeFrom==='home') {
      this.props.navigation.navigate('Home2')
    }
  }

  async getDataArray() {
    const comeFrom = this.props.navigation.getParam('comeFrom', 'none');
    console.log('comeFrom : ', comeFrom)

    let dataArray = []
    if(comeFrom==='car') {
      dataArray = await AsyncStorage.getItem('carArray')
      console.log('data : ', dataArray)
      if(dataArray!==null && dataArray!=='') {
        console.log('is not null')
        dataArray = JSON.parse(dataArray)
      }else {
        dataArray = []
        console.log('is null')
      }

      console.log('*** cars : ', dataArray) 
      this.setState({dataArray})
    }else if(comeFrom==='accessories') { 
      
    }else if(comeFrom==='electornic') {

    }else if(comeFrom==='home') {
       
    }
  }

  componentDidMount() { //render ui => do fn()
    this.getDataArray()  
  }

    render() {
        return (
          <View style={{flex: 1}}>
            <Header
                noShadow 
                style={{backgroundColor:'#eb4d4b'}}>
              <Left> 
                <Button
                  onPress={()=>this.props.navigation.goBack()} 
                  transparent>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Add Asset</Title>
              </Body>
              <Right>
                <Button 
                   onPress={()=>{
                     this.ChangePage()
                    }}
                  transparent>
                  <Icon type='AntDesign' name="plus" />
                </Button>
              </Right>
            </Header>
            <View style={{ flex:1, justifyContent: 'center',backgroundColor:'#f3a683'}}>
                <Text style={{fontSize:20,textAlign: 'center', color: 'white'}}>ไม่มีข้อมูลทรัพย์สิน</Text>
            </View>
          </View>
          
          
        );
      }
    }
const styles = StyleSheet.create({
  
})
