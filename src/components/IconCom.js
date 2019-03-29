import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'

export default class IconCom extends Component {
  render() {
    return (
        <TouchableOpacity
            onPress={this.props.click}
            >
            <Image
                style={styles.iconStyle}
                source={this.props.url}
            />
            <Text style={{textAlign: 'center'}}>{this.props.text}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    iconStyle: {
        borderRadius: 100, 
        height: 100, 
        width: 100,
        marginHorizontal: 10
    }
})
