import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo,Foundation } from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from './helperScreen'

import LoginScreen from './screen/login'
import SignupScreen from './screen/signup'
import MainScreen from './screen/main'
import AllStudentScreen from './screen/allStudentScreen'
import ListSubjectScreen from './screen/listsubject'
import AddSubjectScreen from './screen/addSubject'
import AddStudentScreen from './screen/addStudent'
import RegisterSubjectScreen from './screen/registerSubject'

import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducer/allreducer';

const Navigator = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    })
  },
  Signup: {screen: SignupScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    }),
  },
  Main: {screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    }),
  },
  AllStudentScreen: {screen: AllStudentScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  ListSubjectScreen: {screen: ListSubjectScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  AddSubjectScreen: {screen: AddSubjectScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  AddStudentScreen: {screen: AddStudentScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  RegisterSubjectScreen: {screen: RegisterSubjectScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
});

export default class App extends React.Component {
  render() {
    return (
        <Provider store = {createStore(reducer,applyMiddleware(thunk))}>
          <Navigator/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
