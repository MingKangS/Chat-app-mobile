import React from 'react'
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import LogIn from './logIn'
import SignUp from './signUp'

const { width } = Dimensions.get('window')

class Auth extends React.Component {
  state = {
    authType: "Log in",
  }

  toggleAuthType = authType => {
    console.log(12)
    this.setState({ authType });
  }
  
  render() {
    const logIn = this.state.authType === 'Log in';
    const signUp = this.state.authType === 'Sign up';
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.Os == "ios" ? "padding" : "height"}
      >
          

          {
            logIn ? (
              <LogIn
                toggleAuthType={(auth) => this.toggleAuthType(auth)}
                updateAuth={(acc) => this.props.updateAuth(acc)}
              />
            ) : (
              <SignUp
                toggleAuthType={this.toggleAuthType}
                updateAuth={(acc) => this.props.updateAuth(acc)}
              />
            )
          }
          <View style={{ position: 'absolute', bottom: 40 }}>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },  
  logo: {
    height: width / 2.5
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#e19f51'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10
  }
})

export default Auth