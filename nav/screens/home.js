import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingData from './loadingData';
import { colors } from '../../styles/theme';
import { Entypo } from '@expo/vector-icons'; 

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatrooms: [{room_name: "qq"}],
      loadingChat: true,
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.navigateChatroom = this.navigateChatroom.bind(this);
  }

  async componentDidMount() {
    try {
      const username = await AsyncStorage.getItem('username');
      console.log(username)
      axios.post('https://salty-sierra-77601.herokuapp.com/chat/chatrooms',{username})
        .then(res => {
          this.setState({chatrooms: res.data});
          this.setState({loadingChat: false});
      });
      
      if (username !== null) {
        console.log(username);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  navigateChatroom() {
    this.props.navigation.navigate("Chatroom");
  }
  

  render() {
    return ( 
      <View>
        {
          this.state.loadingChat && (
            <LoadingData/>
          )
        }
        {
          !this.state.loadingChat && (
            <>
            <FlatList
              data={this.state.chatrooms}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.chatroom} onPress={() => {this.props.navigation.navigate("Chatroom", {room_name: item.room_name})}}>
                      <Text style={styles.roomName}>{item.room_name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={chatroom => chatroom.room_name}
            />
            <TouchableOpacity>
              <Entypo  style={styles.button} name="circle-with-plus" size={50} color={colors.themeColor} onPress={() => {this.props.navigation.navigate("Create_chatroom")}}/>
            </TouchableOpacity>
            </>
          )
        }
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  chatroom: {
    borderBottomColor: colors.themeColor,
    borderBottomWidth: 1,
    borderStyle: "solid",
    height: 70,
    backgroundColor: '#fff',
    padding: 8,
  },
  button: {

    right: 10,
    bottom: 10,
  },
  roomName: {
    fontSize: 20,
    color: colors.themeColor,
  },
});

export default Home;