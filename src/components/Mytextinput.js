/*Custom TextInput*/
import React from 'react';
import { View, TextInput } from 'react-native';
const Mytextinput = props => {
  return (
    <View
      style={{
        margin: 10,
        height: 45,
        width: 250,
        borderColor: '#0c2461',
        borderWidth: 1
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#0c2461"
        onChangeText={props.onChangeText}
        style={props.style}
      />
    </View>
  );
};
export default Mytextinput;