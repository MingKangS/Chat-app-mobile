import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Auth from './login/auth';
import Chat from './nav/routes/chatStack';
import InitializingScreen from './nav/screens/initializing';

class App extends React.Component {
  state = {
    currentView: "auth",
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/auth/user')
    //   .then(res => {
    //     this.setState({user: res.data});
    //     if (res.data.username) {
    //       this.updateAuth("main");
    //     } else {
    //       this.updateAuth("auth");
    //     }
    //   });
  }

  updateAuth = (currentView) => {
    this.setState({ currentView });
  }
  
  render() {
    const { currentView } = this.state;
    return (
      <>

        { currentView === 'auth' && <Auth updateAuth={this.updateAuth} />}
        { currentView === 'initializing' && <InitializingScreen/>}
        { currentView === 'main' && <Chat screenProps={{
                    handler: (settings) => { this.updateAuth(settings) }
                }} />}
      </>
    )
  }
}

export default App;