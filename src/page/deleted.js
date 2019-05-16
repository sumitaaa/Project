import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Fab } from "native-base";
import SQLite from 'react-native-sqlite-storage'
import Mytextinput from '../components/Mytextinput';
var db = SQLite.openDatabase({ name: 'DB.db' });
export default class deleted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
        };
    }
    deleteUser = () => {
        const { input_tabain } = this.state;
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM vehicles where vehicleID='${this.state.id}'`,
                [],
                (tx, results) => {
                    console.log('Results Delete', results.rowsAffected);
                    let fn = this.props.navigation.getParam('refresh', 'none')
                    fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                    this.props.navigation.navigate('Addasset', { comeFrom: 'car' })
                }
            );
        });
    };
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Header
                    noShadow
                    style={{ backgroundColor: '#eb4d4b' }}>
                    <Left>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ลบข้อมูลทรัพย์สิน</Title>
                    </Body>
                </Header>
                <View style={{ marginTop: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Mytextinput
                        onChangeText={e => this.setState({ id: e })}
                        placeholder="กรอก ID"
                    />
                </View>
                <Button
                    style={{
                        marginVertical: 20,
                        backgroundColor: '#ff0000',
                        borderRadius: 20,
                        marginLeft: 130,
                        width: '45%'
                    }}
                    onPress={this.deleteUser}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 28, marginRight: 25 }}>ลบข้อมูลทรัพย์สิน</Text>
                </Button>

            </View>
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
