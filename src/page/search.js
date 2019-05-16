import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Header, Title, Button, Icon, Left, Body, Item, Input } from "native-base";

import SQLite from 'react-native-sqlite-storage'
import Mytextinput from '../components/Mytextinput';
var db = SQLite.openDatabase({ name: 'DB.db' });

const MyItem1 = ({ note, ownership, province, brand, type,
    partner, date, tabain, color, number, vehicleID }) => (
        <View style={{
            marginVertical: 5,
            fontWeight: 'bold',
            backgroundColor: '#e67e22',
            borderRadius: 50,
            marginTop: 25,
            marginLeft: 10,
            marginRight: 10
        }}>
            <Text style={styles.text}>ID: {vehicleID}</Text>
            <Text style={styles.text}>ประเภท : {type}</Text>
            <Text style={styles.text}>ยี่ห้อ : {brand}</Text>
            <Text style={styles.text}>รุ่น : {number}</Text>
            <Text style={styles.text}>สี : {color}</Text>
            <Text style={styles.text}>ทะเบียน : {tabain}</Text>
            <Text style={styles.text}>วันที่ซื้อ : {date}</Text>
            <Text style={styles.text}>จังหวัด : {province}</Text>
            <Text style={styles.text}>ผู้ถือกรรมสิทธิ์ : {ownership}</Text>
            <Text style={styles.text}>ผู้ถือทรัพย์สินร่วม : {partner}</Text>
            <Text style={styles.text}>Note : {note}</Text>
        </View>
    )
const MyItem2 = ({ type, brand, number, color, size, weight, partner, note, ownership, accessoriesID }) => (
    <View style={{
        marginVertical: 5,
        fontWeight: 'bold',
        backgroundColor: '#e67e22',
        borderRadius: 50,
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10
    }}>
        <Text style={styles.text}>ID: {accessoriesID}</Text>
        <Text style={styles.text}>ประเภท : {type}</Text>
        <Text style={styles.text}>ยี่ห้อ : {brand}</Text>
        <Text style={styles.text}>รุ่น : {number}</Text>
        <Text style={styles.text}>สี : {color}</Text>
        <Text style={styles.text}>ขนาด : {size}</Text>
        <Text style={styles.text}>น้ำหนัก : {weight}</Text>
        <Text style={styles.text}>ผู้ถือทรัพย์สินร่วม : {partner}</Text>
        <Text style={styles.text}>Note : {note}</Text>
    </View>
)




export default class SearchTEST extends Component {

    constructor(props) {
        super(props)

        this.state = {
            type: '',
            assetData: '',
            items: [],
        };
    }

    search = () => {
        console.log(this.state.type);
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM vehicles where type = '${this.state.type}'`,
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    let items = []
                    for (let i = 0; i < len; i++) {
                        items.push(results.rows.item(i))
                    }
                    this.setState({ items: items })
                }
            );
        });
    };


    render() {
        return (
            <ScrollView style={{ flexGrow: 1 }}>
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
                        <Title style={{ marginLeft: 30 }}>ค้นหาข้อมูลทรัพย์สิน</Title>
                    </Body>
                </Header>

                <View style={{ marginTop: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Mytextinput
                        onChangeText={type => this.setState({ type })}
                        placeholder="กรอกประเภททรัพย์สิน "

                    />
                </View>

                {/* <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Mytextinput
            onChangeText={e => this.setState({ id: e })}
            placeholder="กรอกเลขทะเบียน"
            />
        </View> */}

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.search}>
                    <Text style={styles.textbutton}>ค้นหา</Text>
                </TouchableOpacity>

                {
                    this.state.items.length > 0 ? this.state.items.map((e, i) => (
                        // let comeFrom = this.props.navigation.getParam('comeFrom', 'none')
                        // if (comeFrom === 'car') {

                        <MyItem1 key={i}
                            note={e.note}
                            ownership={e.ownership}
                            province={e.province}
                            brand={e.brand}
                            type={e.type}
                            partner={e.partner}
                            date={e.date}
                            tabain={e.tabain}
                            color={e.color}
                            number={e.number}
                            vehicleID={e.vehicleID}
                        />
                        // } else if (comeFrom === 'accessories') {
                        //     return <MyItem2
                        //         key={i}
                        //         id={e.accessoriesID}
                        //         type={e.type}
                        //         brand={e.brand}
                        //         number={e.number}
                        //         color={e.color}
                        //         size={e.size}
                        //         weight={e.weight}
                        //         partner={e.partner}
                        //         node={e.node}
                        //     />

                        //}
                    )) : <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 100 }}>ไม่พบข้อมูล</Text>
                        </View>
                }

            </ScrollView>

        );
    }
}
const styles = StyleSheet.create({
    textinput: {
        marginTop: 10,
        marginLeft: 100,
        borderColor: '#eb4d4b',
        padding: 50
    },
    button: {
        backgroundColor: '#0652DD',
        borderRadius: 50,
        paddingVertical: 15,
        width: '55%',
        marginTop: 5,
        marginLeft: 120
    },
    textbutton: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        fontSize: 20
    }

})
