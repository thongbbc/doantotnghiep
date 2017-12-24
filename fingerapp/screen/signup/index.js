import React from 'react';
import { StyleSheet, Text, View, TextInput,Keyboard , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo } from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from '../../helperScreen'
var qs = require('qs');
import Indicator from '../../component/indicator'
import axios from 'axios'
export default class SignupScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isFetching:false,
        username:'',
        password:''
      }
    }
    render() {
      const {isFetching,username,password} = this.state
      return(
        <View style = {{flex:1}}>
            <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
            <KeyboardAvoidingView behavior = {'position'} style = {{flex:1,backgroundColor:'rgba(255,255,255,0.1)'}}>
              <View style = {{justifyContent:'space-between',alignItems:'center',flex:1}}>
                <View style = {{width,height:height/3,alignItems:'center',justifyContent:'center'}}>
                  <Text style = {{fontSize:20,fontWeight:'bold',color:'white'}}>CREATE ACCOUNT</Text>
                </View>
                <View style = {{alignItems:'center',height:height-height/3,justifyContent:'space-between'}}>
                  <View>
                    <View style = {{marginBottom:10,flexDirection:'row',width:width-40,height:50,borderRadius:25,
                    paddingLeft:20,
                    backgroundColor:'rgba(255,255,255,0.1)',alignItems:'center'}}>
                      <EvilIcons name="user" size={30} color="rgba(255,255,255,0.5)" />
                      <TextInput 
                      onChangeText = {(text)=> {this.setState({username:text})}}
                      underlineColorAndroid='transparent'
                      value = {username}
                      placeholder={'Username'} placeholderTextColor = {'white'} 
                      style = {{color:'white',paddingLeft:10,fontWeight:'500',flex:1,paddingRight:20}}/>
                    </View>
      
                    <View style = {{marginBottom:10,flexDirection:'row',width:width-40,height:50,borderRadius:25,
                    paddingLeft:20,
                    backgroundColor:'rgba(255,255,255,0.1)',alignItems:'center'}}>
                      <EvilIcons name="unlock" size={30} color="rgba(255,255,255,0.5)" />
                      <TextInput 
                      onChangeText = {(text)=> {this.setState({password:text})}}                                            
                      underlineColorAndroid='transparent'
                      value = {password}
                      placeholder={'Password'} placeholderTextColor = {'white'} 
                      style = {{color:'white',paddingLeft:10,fontWeight:'500',flex:1,paddingRight:20}}/>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity onPress = {()=>{
                       const {username,password} = this.state
                       Keyboard.dismiss()
                       if (username!='' && password!='') {
                         this.setState({isFetching:true})
                         const json = {
                           username,password
                         }
                         axios.post('https://doantotnghiep.herokuapp.com/dangKy',qs.stringify(json))
                         .then(response => {
                             if (response.data.status == 'OK') { 
                               this.setState({isFetching:false,username:'',password:''})                            
                                 alert("Create Account Success")
                             } else {
                               this.setState({isFetching:false})                                                        
                                 alert("Your Username Existed!Please Use Another Username")
                             }
                         })
                         .catch(error => {
                         console.log(error);
                         this.setState({isFetching:false})                                                  
                             alert("Please check your network again")
                         });
                       } else {
                         this.setState({isFetching:false})                                                  
                         alert('Please press full information')
                       }
                    }}>
                    <View style = {{bottom:10,width:width-40,height:50,borderRadius:25,backgroundColor:'transparent',borderWidth:1,borderColor:'rgba(255,255,255,0.5)',justifyContent:'center',alignItems:'center'}}>
                      <Text style = {{color:'white',fontWeight:'600'}}>Create</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{
                      this.props.navigation.goBack(null)
                      Keyboard.dismiss()
                    }}>
                    <View style = {{width:width-40,height:40,borderRadius:25,backgroundColor:'transparent',borderWidth:1,borderColor:'rgba(255,255,255,0.5)',justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name="ios-arrow-round-back" size={50} color="rgba(255,255,255,0.5)" />
                    </View>
                    </TouchableOpacity>
                    <View style = {{height:50}}></View>
                  </View>
                </View>
              </View>
              </KeyboardAvoidingView>
            </LinearGradient>
            {Indicator(isFetching)}
          </View>
      )
    }
  }