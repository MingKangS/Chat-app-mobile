import React, { useEffect, useRef, useState } from "react";
import { Button, Text, TextInput, Image, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from "react-native";
import io from "socket.io-client";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import LoadingData from './loadingData';
import { Ionicons } from '@expo/vector-icons'; 
import { colors } from '../../styles/theme';
import { Input, ActionButton } from './components/Index';

function Conversation(props) {
	const [ chat, setChat ] = useState([]);
	const [ message, setMessage ] = useState("");
	const [ username, setUsername ] = useState(false);
	const [ loadingMessages, setLoadingMessages ] = useState(true);


	const socketRef = useRef()
	const chatRef = React.useRef(chat);

	React.useEffect(() => {
		chatRef.current = chat;
	});

	React.useEffect(() => {
		const socketConnect = () => {
			socketRef.current = io.connect("https://salty-sierra-77601.herokuapp.com/",{ query: { username: username } });
			socketRef.current.on("message", ({ sender_name, room_name, message }) => {
				if ( room_name == props.navigation.state.params.room_name) {
					setChat([ ...chatRef.current, { sender: sender_name, room_name, message } ]);	
				}
			})
			return () => socketRef.current.disconnect();
		}
		if (username) {
			return socketConnect();
		}
	}, [username]);

	useEffect(
		() => {
			console.log("res.data")
			async function fetchUsername() {
				const username = await AsyncStorage.getItem('username');
				setUsername(username);
			}
			fetchUsername();
			
			axios.post('https://salty-sierra-77601.herokuapp.com/chat/messages', {chatroom: props.navigation.state.params.room_name})
				.then(res => { 
					console.log(res.data)
					setChat(res.data);
					setLoadingMessages(false);
					
				});
			setMessage("");
			
		},
		[ props.navigation.state.params.room_name ]
	)

	const onChangeText = (key, value) => {
		setMessage(value);
	}

	const onMessageSubmit = (e) => {
		socketRef.current.emit("message", { sender_name: username, room_name: props.navigation.state.params.room_name, message: message });
		e.preventDefault();
		setMessage("");
	}

	const renderChat = () => {
		if (!chat) return;
		return chat.map(({ sender, message }, index) => (
			<>
			{
				sender == username && (
					<View key={index} style={styles.sentChat}>
						<Text style={styles.sentChatMessage}>
						{sender}: {message}
						</Text>
					</View>
				)
			}
			{
				sender != username && (
					<View key={index} style={styles.receivedChat}>
						<Text style={styles.receivedChatMessage}>
						{sender}: {message}
						</Text>
					</View>
				)
			}
			</>
		));
	}


	const renderItem = ({ item }) => (
		<>
			{
				item.sender == username && (
					<View style={[styles.item, styles.itemIn]}>
						<View style={[styles.balloon]}>
							<Text style={styles.sentChatMessage}>
							{item.sender}: {item.message}
							</Text>
						</View>
					</View>
				)
			}
			{
				item.sender != username && (
					<View style={[styles.item, styles.itemOut]}>
						<View style={[styles.balloon]}>
							<Text style={styles.receivedChatMessage}>
							{item.sender}: {item.message}
							</Text>
						</View>
					</View>
				)
			}
			</>
	);

	return (
		<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
		<View style={styles.container}>
			{
				loadingMessages && (
					<LoadingData/>
				)
			}
			{
				!loadingMessages && (
					<>
					<View>
						<FlatList
							data={chat}
							renderItem={renderItem}
							keyExtractor={item => item.id}
							style={styles.chatContainer}
						/>
					</View>
					<View style={styles.footer}>
						<View style={styles.inputContainer}>
							<Input
								onChangeText={onChangeText}
								type='password'
								placeholder='Password'
								secureTextEntry
								value={message}
							/>
						</View>
						<TouchableOpacity style={styles.btnSend} onPress={(e) => onMessageSubmit(e)}>
							<Image source={{uri:"https://img.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
						</TouchableOpacity>
					</View>
					</>
				)
			}
			
		</View>
		</KeyboardAvoidingView>
	)
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column'
	},
	chatContainer: {
		height: height-60
	},
	sentChat: {
		maxWidth: '80%',
		backgroundColor: colors.themeColor,
		color: '#fff',
		padding: 5,
		borderRadius: 10,
		margin: 15,
	},
	sentChatMessage: {
		color: '#fff',
		flexWrap: 'wrap',
	},
	messageField: {
		bottom: 0,
		display: 'flex',
		flexDirection: 'row',
		height: 60,
		backgroundColor: '#eee',
		flex: 1,
		width: '100%'
	},
	textInput: {
		backgroundColor: '#fff',
		height: 30,
		width: width-30,
		fontSize: 14,
		paddingHorizontal: 77,
		color: 'black',
		alignSelf: 'center',
		marginLeft: 0,

	},
	roomName: {
		fontSize: 20,
		color: colors.themeColor,
	},
	container:{
		flex:1
	},
	list:{
		paddingHorizontal: 17,
	},
	footer:{
		flexDirection: 'row',
		height:60,
		backgroundColor: '#eeeeee',
		paddingHorizontal:10,
		padding:5,
	},
	btnSend:{
		backgroundColor:"#00BFFF",
		width:40,
		height:40,
		borderRadius:360,
		alignItems:'center',
		justifyContent:'center',
	},
	iconSend:{
		width:30,
		height:30,
		alignSelf:'center',
	},
	inputContainer: {
		borderBottomColor: '#F5FCFF',
		backgroundColor: '#FFFFFF',
		borderRadius:30,
		borderBottomWidth: 1,
		height:40,
		flexDirection: 'row',
		alignItems:'center',
		flex:1,
		marginRight:10,
	},
	inputs:{
		height:40,
		marginLeft:16,
		borderBottomColor: '#FFFFFF',
		flex:1,
	},
	balloon: {
		maxWidth: 250,
		padding: 15,
		borderRadius: 20,
	},
	itemIn: {
		alignSelf: 'flex-start'
	},
	itemOut: {
		alignSelf: 'flex-end'
	},
	time: {
		alignSelf: 'flex-end',
		margin: 15,
		fontSize:12,
		color:"#808080",
	},
	item: {
		marginVertical: 14,
		flex: 1,
		flexDirection: 'row',
		backgroundColor:"#eeeeee",
		borderRadius:300,
		padding:5,
	},
});

export default Conversation;

