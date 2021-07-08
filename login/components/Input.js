import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../styles/theme';

const { width } = Dimensions.get('window')

const Input = ({
  placeholder, type, secureTextEntry = false, onChangeText
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={v => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor={colors.themeColor}
    selectionColor={colors.themeColor}
  />
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.themeColor,
    height: 45,
    width: width - 20,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    color: colors.themeColor
  }
})

export default Input