/*Custom TextInput*/
import React from 'react';
import { View, TextInput } from 'react-native';
const Mytextinput = props => {
  return (
    <View
      style={{
        margin: 15,
        height: 40,
        width: 350,
        borderColor: '#eb4d4b',
        borderWidth: 1
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#eb4d4b"
        onChangeText={props.onChangeText}
        style={props.style}
      />
    </View>
  );
};
export default Mytextinput;