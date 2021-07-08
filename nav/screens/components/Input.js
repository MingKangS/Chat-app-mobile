import React from 'react'
import { Dimensions, StyleSheet, TextInput } from 'react-native'
import { colors } from '../../../styles/theme';

const { width } = Dimensions.get('window')

const Input = ({
  placeholder, type, secureTextEntry = false, onChangeText, value
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={v => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor='#e2a45b'
    selectionColor={'#e2a45b'}
    value={value}
  />
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    height: 45,
    width: '85%',
    marginBottom: 15,
    fontSize: 14,
    paddingHorizontal: 14,
    //fontFamily: 'SourceSansPro-Regular',
    color: colors.accentColor,
    alignSelf: 'center',
    
  }
})

export default Input