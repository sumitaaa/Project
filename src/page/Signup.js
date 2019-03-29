import React, { Component } from 'react'
import {Text, StyleSheet, View,TextInput,ImageBackground,TouchableOpacity,Image, AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';

export default class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      EnterName:'',
      EnterNemberID:'',
      EnterAddress:'',
      EnterTel:'',
      EnterEmail:'',
      EnterImage:null
    }
    this.CheckIsSignIn()
  }

  PickImage = () => {
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response :', response)
      if(response.uri) {
        this.setState({EnterImage: response})
      }
    })
  }

    CheckIsSignIn = async() => {
      let name = await AsyncStorage.getItem('Name2')
      if(name!=='' && name!==null) {
        //alert('Ever sign in แล้ว')
        this.setState({
          EnterName: await AsyncStorage.getItem('Name'),
          EnterNemberID: await AsyncStorage.getItem('NemberID'),
          EnterAddress: await AsyncStorage.getItem('Address'),
          EnterTel: await AsyncStorage.getItem('Tel'),
          EnterImage: await AsyncStorage.getItem('Image'),
          EnterEmail: await AsyncStorage.getItem('Email'),
        })

        console.log('sss', await AsyncStorage.getItem('Image'))
      }else {
        alert('Never sign in !')
      }
    }

    setEnterName = (text) => {
      this.setState({
        EnterName: text
      })
    }
    setEnterNemberID = (text) => {
      this.setState({
        EnterNemberID: text
      })
    }
    setEnterAddress = (text) => {
      this.setState({
        EnterAddress: text
      })
      }
    setEnterTel = (text) => {
      this.setState({
        EnterTel: text
      })
    }
    setEnterEmail = (text) => {
      this.setState({
        EnterEmail: text
      })     
    }

    Save = async() => {
      let { EnterImage ,EnterAddress, EnterEmail, EnterName, EnterNemberID, EnterTel } = this.state
      if(EnterImage===null || EnterAddress==='' || EnterEmail==='' || EnterName==='' || EnterNemberID==='' || EnterTel==='') {
        alert('Please complete the information')
      }else {
        // บันทึก
        await AsyncStorage.setItem('Address', EnterAddress)
        await AsyncStorage.setItem('Email', EnterEmail)
        await AsyncStorage.setItem('Name', EnterName)
        await AsyncStorage.setItem('NemberID', EnterNemberID)
        await AsyncStorage.setItem('Tel', EnterTel)
        await AsyncStorage.setItem('Image', EnterImage.uri)
        alert('Save Success')
      }
    } 


  render() {
    return (
      <ImageBackground
        source={require('../../images/images.jpg')} 
        style={styles.container}
      >
         
        <Text style={{fontSize:50,color:'white'}}> Welcome </Text>
        <Text style={{marginBottom:30,marginTop:40,fontSize:20,color: 'white'}}> Please enter your Personal info </Text>
        {
          this.state.EnterImage!==null ?
          <Image source={{uri: this.state.EnterImage.uri}} style={{borderRadius:70,marginBottom:20,width: 130, height: 130}}></Image>
          :
          <TouchableOpacity onPress={this.PickImage}>
            <View style={{
              backgroundColor: 'white', 
              width: 120, 
              height: 120, 
              borderRadius: 65,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom:20
              }}>
              <Text 
                style={{
                  color: 'skyblue', 
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>Choose Photo</Text>
            </View>
          </TouchableOpacity>
        }
        
        
        <TextInput
          value={this.state.EnterName} 
          onChangeText={this.setEnterName}
          style={styles.titel}
          placeholder="Enter Name" 
        />
        <TextInput
          value={this.state.EnterNemberID} 
          onChangeText={this.setEnterNemberID}
          style={styles.titel} 
          placeholder="Enter Nember ID" 
        />
        <TextInput
          value={this.state.EnterAddress} 
          onChangeText={this.setEnterAddress} 
          style={styles.titel}
          placeholder="Enter Address" 
        />
        <TextInput
          value={this.state.EnterTel} 
          onChangeText={this.setEnterTel} 
          style={styles.titel}
          placeholder="Enter Tel"
        />
        <TextInput 
          value={this.state.EnterEmail} 
          onChangeText={this.setEnterEmail}
          style={styles.titel}
          placeholder="Enter Email" 
        />
        <TouchableOpacity
          onPress={this.Save}
          style={styles.button}
        >
          <Text style={styles.textbutton}> Sign In </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  titel:{
    borderWidth:1,
    width: "80%",
    marginBottom:10,
    backgroundColor: 'white',
    borderColor:'white',
  },
  button: {
    backgroundColor:'#2f3640',
    borderRadius:8,
    paddingVertical:15,
    width: '70%', 
    marginTop:15
  },
  textbutton:{
    textAlign:'center',
    fontSize:20,
    color: 'white'
  }

})
