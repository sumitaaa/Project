import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, ImageBackground, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { Container, Header, Left, Body, Right, Button, Title, Footer, FooterTab, Icon } from 'native-base';
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({ name: 'DB.db' });

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      EnterName: '',
      EnterTel: '',
      EnterEmail: '',
      EnterImage: null,
      isLogin: false,
      isCanEdit: false,
    }
  }

  componentDidMount() {
    this.CheckIsSignIn()
  }

  PickImage = () => {
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      //console.log('response :', response)
      if (response.uri) {
        this.setState({ EnterImage: response })
      }
    })
  }

  ChangePage = (name, from) => {
    this.props.navigation.navigate(name, {
      comeFrom: from
    })
  }

  CheckIsSignIn = async () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM user", [], (tx, result) => {
        var len = result.rows.length
        for (let i = 0; i < len; i++) {
          let row = result.rows.item(i)
          console.log('data len : ' + i + ' : ', row)
        }
        if (len === 0) { // ต้องลงทะเบียน
          // ปล่อยให้ว่าง เพื่อกรอก
          this.setState({ isCanEdit: true })
        } else { // ไปหน้าโปรไฟล์
          // มีข้อมูล กดแก้ไขได้
          let row = result.rows.item(0)
          console.log('row :', row)
          this.setState({
            EnterName: row.first_name + ' ' + row.last_name,
            EnterTel: row.phone,
            EnterEmail: row.email,
            isLogin: true,
            // EnterImage: 
          })
        }
      })
    })
  }

  setEnterName = (text) => {
    this.setState({
      EnterName: text
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

  Save = (isEmpty) => {
    let status = true
    let { EnterEmail, EnterImage, EnterName, EnterTel } = this.state
    if (EnterName === '' || EnterTel === '' || EnterEmail === '') status = false
    let name = EnterName.split(' ')
    if (name.length !== 2) status = false

    if (status === false) {
      alert('กรุณาข้อมูลให้ครบถ้วน')
      return
    }

    if (isEmpty) { // insert
      db.transaction((tx) => {
        tx.executeSql(`INSERT INTO user(id, first_name, last_name, email, phone) 
            VALUES ('1', '${name[0]}', '${name[1]}', '${EnterEmail}', '${EnterTel}')`,
          [], (tx, result) => {
            console.log('result insert : ', result)
            this.props.navigation.navigate('Home')
          })
      })
    } else { // update
      db.transaction((tx) => {
        tx.executeSql(`UPDATE user SET first_name='${name[0]}', last_name='${name[1]}', 
            email='${EnterEmail}', phone='${EnterTel}' WHERE id='1'`,
          [], (tx, result) => {
            console.log('result update : ', result)
            this.props.navigation.navigate('Home')
          })
      })
    }
  }

  Edit = () => {
    if (!this.state.isCanEdit) { // ยังเป็นปุ่ม edit อยู่
      this.setState({ isCanEdit: true })
    } else { // เป็นปุ่ม save แล้ว
      //บันทึก แล้วเปลี่ยนหน้า
      this.Save(false)
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.state.isLogin ? null : require('../../images/Low.jpg')}
        style={styles.container}
      >
        {!this.state.isLogin &&
          <View>
            <Text style={{ fontSize: 50, color: 'white' }}> Welcome </Text>
            <Text style={{ marginBottom: 30, marginTop: 40, fontSize: 20, color: 'white' }}> Please enter your Personal info </Text>
          </View>
        }
        {
          this.state.EnterImage !== null ?
            <Image source={{ uri: this.state.EnterImage.uri }} style={{ borderRadius: 70, marginBottom: 20, width: 130, height: 130 }}></Image>
            :
            <TouchableOpacity onPress={this.PickImage}>
              <View style={{
                backgroundColor: 'white',
                width: 120,
                height: 120,
                borderRadius: 65,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20
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
          editable={this.state.isCanEdit}
        />
        <TextInput
          value={this.state.EnterTel}
          onChangeText={this.setEnterTel}
          style={styles.titel}
          placeholder="Enter Tel"
          editable={this.state.isCanEdit}
        />
        <TextInput
          value={this.state.EnterEmail}
          onChangeText={this.setEnterEmail}
          style={styles.titel}
          placeholder="Enter Email"
          editable={this.state.isCanEdit}
        />
        <TouchableOpacity
          onPress={this.state.isLogin ? this.Edit : this.Save}
          style={styles.button}
        >
          <Text style={styles.textbutton}>{this.state.isLogin ? (this.state.isCanEdit ? 'Save' : 'Edit') : 'Sign In'}</Text>
        </TouchableOpacity>
        {this.state.isLogin &&
          <Footer style={{ position: 'absolute', bottom: 0, }}>
            <FooterTab style={{ backgroundColor: '#eb4d4b' }}>
              <Button
                onPress={() => {
                  this.ChangePage('Signup')
                }}
                vertical>
                <Icon name="person" />
                <Text style={{ color: 'white' }}>โปรไฟล์</Text>
              </Button>
              <Button
                onPress={() => {
                  this.ChangePage('Home')
                }}
                vertical >
                <Icon active name="home" />
                <Text style={{ color: 'white' }}>หน้าหลัก</Text>
              </Button>
              <Button
                onPress={() => { this.setState({ modalVisible: true }) }} vertical>
                <Icon type='MaterialIcons' name="drafts" />
                <Text style={{ color: 'white' }}>ถ่านโอนข้อมูล</Text>
              </Button>
              <Button
                onPress={() => {
                  this.ChangePage('Calendar')
                }}
                vertical>
                <Icon type='Entypo' name="calendar" />
                <Text style={{ color: 'white' }}>ปฏิทิน</Text>
              </Button>
            </FooterTab>
          </Footer>
        }

      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3a683',
  },
  titel: {
    borderWidth: 1,
    width: "80%",
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  button: {
    backgroundColor: '#2f3640',
    borderRadius: 8,
    paddingVertical: 15,
    width: '70%',
    marginTop: 15
  },
  textbutton: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }

})