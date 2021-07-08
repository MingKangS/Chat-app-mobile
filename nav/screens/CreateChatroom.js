import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import { Input, ActionButton } from './components/Index';
import axios from 'axios';
import { EvilIcons } from '@expo/vector-icons'; 
import { colors } from '../../styles/theme';


export default class CreateChatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [""],
      room_name: "",
    }
    this.onChangeRoomName = this.onChangeRoomName.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.createChatroom = this.createChatroom.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  onChangeRoomName = (key, value) => {
    this.setState({ [key]: value });
  }

  onChangeUser = (key, value) =>{
    var {users} = this.state;
    users[key] = value;
    this.setState({
      users: users
    });
  }

  createChatroom(e) {
    e.preventDefault();
    console.log(this.state.room_name,this.state.users);
    axios.post('https://salty-sierra-77601.herokuapp.com/chat/create-chatroom', {room_name: this.state.room_name, participants: this.state.users})
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });

    this.setState({
      users: [""],
      room_name: ""
    });
  }

  addUser() {
    var {users} = this.state;
    users.push("");
    this.setState({users: users});
  }

  render() {
    const userInputs = this.state.users.map((user,index) => (
      <View style={{display: 'flex', flexDirection: 'row',}}>
        <Input  type="text"
          value={user}
          onChangeText={this.onChangeUser}
          key={index}
          type={index}
          style={styles.input}
          placeholder="Enter participant name"
        />
        { index === this.state.users.length-1 && 
          <TouchableOpacity>
            <EvilIcons style={{marginTop: 5}} name="plus" size={32} color={colors.accentColor} onPress={() => this.addUser()}/>
          </TouchableOpacity>
        }
      </View>
    ))
    return (
      <View style={styles.container}>
        <Input  
          key="room_name"
          type="room_name"
          value={this.state.room_name}
          onChangeText={this.onChangeRoomName}
          style={styles.input}
          placeholder="Enter new chatroom name"
        />
        <Text style={styles.label}>Participants:</Text>
        {userInputs}
        <TouchableHighlight
          onPress={this.createChatroom}
          style={styles.buttonContainer}
          underlayColor='#c6e4ee'
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </View>
        </TouchableHighlight>
        
      </View>
      
    )
  }
}

var width = Dimensions.get('window').width; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  // input: {
  //   backgroundColor: '#fff',
  //   borderRadius: 30,
  //   height: 15,
  //   margin: 25,
  //   width: width - 20 ,
  // },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.accentColor,
    height: 50,
    width: '50%',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  label: {
    margin: 20,
    color: colors.accentColor,
  },
})
