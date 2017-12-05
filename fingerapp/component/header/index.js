import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo } from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from '../../helperScreen'


export default class Header extends Component {
    render() {
        return(
            <View style = {{height:60,width,backgroundColor:'#F44C27',paddingTop:20,flexDirection:'row',paddingLeft:10,paddingRight:10,justifyContent:'space-between'}}>
                {this.props.children}
            </View>
        )
    }
}