import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Header from '../shared/header';
import Home from '../screens/home';
import Chatroom from '../screens/Chatroom';
import CreateChatroom from '../screens/CreateChatroom';
import { colors } from '../../styles/theme';
import { AntDesign } from '@expo/vector-icons';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerStyle: { backgroundColor: colors.themeColor},
      headerTitle: () => <Header title={'\tHome'} />  
    },
  },
  Chatroom: {
    screen: Chatroom,
    navigationOptions: {
      headerStyle: { backgroundColor: colors.themeColor},
      headerTitle: () => <Header title='Chatroom' />  
    },
  },
  Create_chatroom: {
    screen: CreateChatroom,
    navigationOptions: {
      headerStyle: { backgroundColor: colors.themeColor},
      headerTitle: () => <Header title='Create chatroom' />  
    },
  },
};

const HomeStack = createAppContainer(createStackNavigator(screens));

export default HomeStack;