import React from 'react';
import {
  TouchableHighlight, Text, View, StyleSheet
} from 'react-native';
import { colors } from '../../styles/theme';

const ActionButton = ({
  onPress, title
}) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.buttonContainer}
    underlayColor='#c6e4ee'
  >
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.themeColor,
    borderRadius: 25,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
})

export default ActionButton