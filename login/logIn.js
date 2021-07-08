import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { Input, ActionButton } from './components/Index';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../styles/theme';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.logIn = this.logIn.bind(this);
    this.toggleAuthTypetoSignUp = this.toggleAuthTypetoSignUp.bind(this);
  }
  
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  }

  async logIn() {
    axios.post('https://salty-sierra-77601.herokuapp.com/auth/log-in', {email: this.state.email, password: this.state.password})
      .then(async res => {
        if (res.status == 200) {
          try {
            await AsyncStorage.setItem(
              'username',
              res.data, async () => {
                const username = await AsyncStorage.getItem('username');
                this.props.updateAuth("main");
              }
            );
          } catch (error) {
            console.log(error)
          }
        }
      });
  }
  
  toggleAuthTypetoSignUp = () => {
    console.log("error")
    this.props.toggleAuthType('Sign up');
  }
  
  render() {
    return (
      <View style={styles.background}>
        <Image 
          source={require('./assets/logo2.png')}
          resizeMode='contain'
          style={styles.logo}
        />
        <View style={styles.container}>
          <Input style={styles.input}
            onChangeText={this.onChangeText}
            type='email'
            placeholder='Email'
          />
          <Input
            onChangeText={this.onChangeText}
            type='password'
            placeholder='Password'
            secureTextEntry
          />
          
            
          <ActionButton
            title='Log in'
            onPress={this.logIn}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={this.toggleAuthTypetoSignUp}>
              <Text style={{color: colors.themeColor}}>New here? Sign up!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  background: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  container: {
    margin: 'auto',
    marginTop: 0,
    marginBottom: 'auto',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logo: {
    width: 350,
    height: 150,
    margin: 'auto',
    marginTop: 'auto',
    marginBottom: 20,
  }
})

export default LogIn;