import React from 'react';
import { StyleSheet, Text, View, TextInput , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo } from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from '../../helperScreen'


export default class LoginScreen extends React.Component {
    render() {
      return(
        <View style = {{flex:1}}>
          <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
          <KeyboardAvoidingView behavior = {'position'} style = {{flex:1,backgroundColor:'rgba(255,255,255,0.1)'}}>
            <View style = {{justifyContent:'space-between',alignItems:'center',flex:1}}>
              <View style = {{width,height:height/2,alignItems:'center',justifyContent:'center'}}>
                <Ionicons name="md-finger-print" size={width/3} color="white" />
                <Ionicons name="ios-git-network" size={width/5} color="white" />
              </View>
              
              <View style = {{alignItems:'center',height:height/2,justifyContent:'flex-end'}}>
                <View style = {{marginBottom:10,flexDirection:'row',width:width-40,height:50,borderRadius:25,
                paddingLeft:20,
                backgroundColor:'rgba(255,255,255,0.1)',alignItems:'center'}}>
                  <EvilIcons name="user" size={30} color="rgba(255,255,255,0.5)" />
                  <TextInput 
                  underlineColorAndroid='transparent'
                  placeholder={'Username'} placeholderTextColor = {'white'} 
                  style = {{color:'white',paddingLeft:10,fontWeight:'500',flex:1,paddingRight:20}}/>
                </View>
  
                <View style = {{marginBottom:10,flexDirection:'row',width:width-40,height:50,borderRadius:25,
                paddingLeft:20,
                backgroundColor:'rgba(255,255,255,0.1)',alignItems:'center'}}>
                  <EvilIcons name="unlock" size={30} color="rgba(255,255,255,0.5)" />
                  <TextInput 
                  underlineColorAndroid='transparent'
                  placeholder={'Password'} placeholderTextColor = {'white'} 
                  style = {{color:'white',paddingLeft:10,fontWeight:'500',flex:1,paddingRight:20}}/>
                </View>
                <TouchableOpacity onPress = {()=>{
                    this.props.navigation.navigate('Main');
                  }}>
                    <View style = {{width:width-40,height:50,borderRadius:25,backgroundColor:'#F44C27',justifyContent:'center',alignItems:'center'}}>
                        <Text style = {{color:'white',fontWeight:'600'}}>Get Started</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{width,paddingTop:20,paddingBottom:20,paddingLeft:20,paddingRight:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <TouchableOpacity onPress = {()=>{
                    this.props.navigation.navigate('Signup');
                  }}>
                    <Text style = {{color:'rgba(255,255,255,0.5)',fontSize:12}}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style = {{color:'rgba(255,255,255,0.5)',fontSize:12}}>Need help</Text>
                  </TouchableOpacity>
                </View>
  
              </View>
            </View>
            </KeyboardAvoidingView>
          </LinearGradient>
        </View>
      )
    }
  }