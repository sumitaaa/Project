import React, { Component } from 'react'
import { Text, StyleSheet, View, Image,Modal,Dimensions,TouchableOpacity } from 'react-native'
import { Container, Header, Title, Button, Icon, Footer,Right, FooterTab, Body ,Content} from "native-base";
import IconCom from '../components/IconCom'

const {height, width} = Dimensions.get('window')
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible: false,
    };
    this.setDate = this.setDate.bind(this);
  }


  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  //#ffd32a
  }

 
  ChangePage = (name, from) => {
    this.props.navigation.navigate(name, {
      comeFrom: from
    })
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
              
                <Right>
                <Button onPress={()=>{this.setState({modalVisible: false})}} transparent>
                  <Icon  type='AntDesign' name='close' />
                </Button>
                </Right>
             
            </View>
          </View>

        </Modal>
        <Header
            noShadow 
            style={{backgroundColor:'#eb4d4b'}}>
          <Body style={{justifyContent: 'center',alignItems:'center'}}>
            <Title style={{fontSize:25}}>Home</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='' />
            </Button>
            <Button transparent>
              <Icon  type='Ionicons' name='md-notifications-outline' />
            </Button>
          </Right>
        </Header>
        <Content style={{backgroundColor:'#f3a683'}}>
            <View style={{flexDirection:'row', justifyContent: 'center', paddingVertical: 50}}>
                <IconCom click={()=>this.ChangePage('Addasset', 'car')} url={require('../../images/car.png')} text="ยานพาหนะ" />
                <IconCom click={()=>this.ChangePage('Addasset', 'accessories')} url={require('../../images/As.png')} text="เครื่องประดับ"/>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'center', paddingVertical: 50}}>
                <IconCom click={()=>this.ChangePage('Addasset', 'electornic')} url={require('../../images/com.png')} text='เครื่องมืออิเล็กทรอนิกส์'/> 
                <IconCom click={()=>this.ChangePage('Addasset', 'home')} url={require('../../images/home1.png')} text='บ้าน'/>           
            </View>
        </Content>
        <Footer >
          <FooterTab style={{backgroundColor:'#eb4d4b'}}>
            <Button 
                onPress={()=>{
                  this.ChangePage('Signup')
                }}
                vertical>
              <Icon name="person" />
              <Text style={{color:'white'}}>Profile</Text>
            </Button>
            <Button vertical >
              <Icon active name="home" />
              <Text style={{color:'white'}}>Home</Text>
            </Button>           
            <Button 
               onPress={()=>{this.setState({modalVisible: true})}}vertical>
              <Icon type='MaterialIcons' name="drafts" />
              <Text style={{color:'white'}}>Transfer</Text>
            </Button>
             <Button 
              onPress={()=>{
                this.ChangePage('Calendar')
              }}
              vertical>
              <Icon type='Entypo' name="calendar" />
              <Text style={{color:'white'}}>calendar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    
})
