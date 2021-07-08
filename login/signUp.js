import React, { Fragment, Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Image } from 'react-native';
import { Input, ActionButton } from './components/Index';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../styles/theme';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.signUp = this.signUp.bind(this);
    this.toggleAuthTypetoLogIn = this.toggleAuthTypetoLogIn.bind(this);
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  }

  signUp = async () => {
    
    const user = {email: this.state.email, username: this.state.username, password: this.state.password};
    axios.post('https://salty-sierra-77601.herokuapp.com/auth/sign-up', user)
      .then(async res => {
        console.log(res.data);
        try {
          await AsyncStorage.setItem(
            'username',
            this.state.username, async () => {
              const username = await AsyncStorage.getItem('username');
              console.log(1,username)
              this.props.updateAuth("main");
            }
          );
        } catch (error) {
          console.log(error)
        }
      });
    
  }

  toggleAuthTypetoLogIn = () => {
    console.log("error")
    this.props.toggleAuthType('Log in');
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
          <Fragment>
            <Input
              placeholder='Email'
              type='email'
              onChangeText={this.onChangeText}
            />
            <Input
              placeholder='Username'
              type='username'
              onChangeText={this.onChangeText}
            />
            <Input
              placeholder='Password'
              type='password'
              onChangeText={this.onChangeText}
              secureTextEntry
            />
            
            <ActionButton
              title='Sign Up'
              onPress={this.signUp}
            />
          </Fragment>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={this.toggleAuthTypetoLogIn}>
              <Text style={{color: colors.themeColor}}>Already have an account? Log in!</Text>
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

export default SignIn