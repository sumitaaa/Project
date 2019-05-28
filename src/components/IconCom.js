import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'

export default class IconCom extends Component {
    render() {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 25 }}
                onPress={this.props.click}
            >
                <Image
                    style={styles.iconStyle}
                    source={this.props.url}
                />
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginLeft: 50, marginVertical: -7 }}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        borderRadius: 75,
        height: 100,
        width: 100,
        marginHorizontal: -30,
        marginVertical: -45
    }
})
