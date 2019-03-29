import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { Container, Header, Title, Button, Icon, Footer,Right, FooterTab, Body ,Content} from "native-base";
import IconCom from '../components/IconCom'

export default class Home extends Component {
 
  ChangePage = (name) => {
    this.props.navigation.navigate(name)
  }

  render() {
    return (
        <Container>
        <Header
            noShadow 
            style={{backgroundColor:'#8854d0'}}>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon  type='Ionicons' name='md-notifications-outline' />
            </Button>
          </Right>
        </Header>
        <Content>
            <View style={{flexDirection:'row', justifyContent: 'center', paddingVertical: 15}}>
                <IconCom click={()=>this.ChangePage('Addasset')} url={require('../../images/car.jpg')} text="ยานพาหนะ" />
                <IconCom click={()=>alert('2')} url={require('../../images/box.jpg')} text="เครื่องประดับ"/>
                <IconCom click={()=>alert('3')} url={require('../../images/ph.png')} text='เครื่องมืออิเล็กทรอนิกส์'/>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'center', paddingVertical: 15}}>
                <IconCom click={()=>alert('4')} url={require('../../images/car.jpg')} text='รถแดง'/>
                <IconCom click={()=>alert('5')} url={require('../../images/car.jpg')} text='รถแดง'/>
                <IconCom click={()=>alert('6')} url={require('../../images/car.jpg')} text='รถแดง'/>
            </View>
        </Content>
        <Footer >
          <FooterTab style={{backgroundColor:'#8854d0'}}>
            <Button 
                onPress={()=>{
                  this.ChangePage('Signup')
                }}
                vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button vertical >
              <Icon active name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon type='MaterialIcons' name="drafts" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    
})
