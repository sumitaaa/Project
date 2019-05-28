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
        let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
        if (comeFrom === 'car') {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM vehicle where vehicleID='${this.state.id}'`,
                    [],
                    (tx, results) => {
                        console.log('Results Delete', results.rowsAffected);
                        let fn = this.props.navigation.getParam('refresh', 'none')
                        fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                        this.props.navigation.navigate('Addasset', { comeFrom: 'car' })
                    }
                );
            });
        } else if (comeFrom === 'accessories') {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM accessories where accessoriesID='${this.state.id}'`,
                    [],
                    (tx, results) => {
                        console.log('Results Delete', results.rowsAffected);
                        let fn = this.props.navigation.getParam('refresh', 'none')
                        fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                        this.props.navigation.navigate('Addasset', { comeFrom: 'accessories' })
                    }
                );
            });
        } else if (comeFrom === 'electornic') {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM electornic where electornicID='${this.state.id}'`,
                    [],
                    (tx, results) => {
                        console.log('Results Delete', results.rowsAffected);
                        let fn = this.props.navigation.getParam('refresh', 'none')
                        fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                        this.props.navigation.navigate('Addasset', { comeFrom: 'electornic' })
                    }
                );
            });
        } else if (comeFrom === 'home') {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM homes where homesID='${this.state.id}'`,
                    [],
                    (tx, results) => {
                        console.log('Results Delete', results.rowsAffected);
                        let fn = this.props.navigation.getParam('refresh', 'none')
                        fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                        this.props.navigation.navigate('Addasset', { comeFrom: 'home' })
                    }
                );

                tx.executeSql(
                    `DELETE FROM condo where condoID='${this.state.id}'`,
                    [],
                    (tx, results) => {
                        console.log('Results Delete', results.rowsAffected);
                        let fn = this.props.navigation.getParam('refresh', 'none')
                        fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                        this.props.navigation.navigate('Addasset', { comeFrom: 'home' })
                    }
                );
                tx.executeSql(
                    `DELETE FROM flax where flaxID='${this.state.id}'`,
                    [],
                    (tx, results) => {
                        console.log('Results Delete', results.rowsAffected);
                        let fn = this.props.navigation.getParam('refresh', 'none')
                        fn()  // รีเฟรชก่อนแล้วเปลี่ยนหน้า บอกด้วยว่ามาจากไหน comeFrom '...'
                        this.props.navigation.navigate('Addasset', { comeFrom: 'home' })
                    }
                );

            })
        }
    };
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Header
                    noShadow
                    style={{ backgroundColor: '#0c2461' }}>
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
                        marginLeft: 80,
                        width: '60%'
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
