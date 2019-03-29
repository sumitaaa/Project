import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body ,Content} from "native-base";
export default class Addasset extends Component {
    render() {
        return (
          <Container>
            <Header
                noShadow 
                style={{backgroundColor:'#8854d0'}}>
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
                <Button transparent>
                  <Icon type='AntDesign' name="plus" />
                </Button>
              </Right>
            </Header>
            <Content>
            <Left>
                <Text style={{fontSize:20,marginTop:300}}>ไม่มีข้อมูลทรัพย์สิน</Text>
              </Left>
              </Content>
          </Container>
          
          
        );
      }
    }
const styles = StyleSheet.create({
  
})
