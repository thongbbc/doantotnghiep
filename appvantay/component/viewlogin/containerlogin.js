// background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,Keyboard,
  Text,Alert,
  View,
  Image,
  TextInput,Dimensions,Platform,TouchableHighlight,ActivityIndicator
} from 'react-native'
import ButtonLoginFacebook from '../buttonLoginFacebook/buttonLoginFacebook'

import {LinearGradient} from 'expo'
import styles from './style'
export default class ContainerLogin extends Component{
  _renderLoadingView(){
    if (this.state.animating) {
      return <ActivityIndicator
      style={{position:'absolute',width:Dimensions.get('window').width,height:Dimensions.get('window').height,
      top:1,alignItems:'center',justifyContent:'center'}}
      animating={ this.state.animating }
      size={'small'}
      hidesWhenStopped={true}
      color={'black'}/>    }
  }
  fetchData= async() => {
         fetch(`https://doantotnghiep.herokuapp.com/getUsername/?username=${this.state.username}`, {
         method: 'GET'
       })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
             animating: false
          });
          if (responseJson.length != 0) {
            if (responseJson[0].password == this.state.password) {
              Alert.alert('Logged in!')
              this.login(responseJson[0].username)
              this.props.navigator.push({
                name:"menu",
                duLieu:{
                         username:this.state.username,
                         password:this.state.password
                       }
              })
            } else {
              Alert.alert('Wrong username or password!')
            }
          } else {
            Alert.alert('Wrong account!')
          }
      })
      .catch((error) => {
         console.error(error);
      });
  }
  async login(token) {
    try {
      await AsyncStorage.setItem('token',token);
    } catch (error) {
      // Error saving data
    }
  }
  _onPressLogin(){
    Keyboard.dismiss()
    this.setState({
      animating:true
    })
    this.fetchData()
  }
  _onPressSignUp() {
    Keyboard.dismiss()
    this.props.navigator.push({
      name:"dangky"
      })
  }
  constructor(props){
    super(props)
    this.state = {
      username:'',
      password:'',
      animating:false
    }
  }
  render() {
    return(
      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)',height:null,width:Dimensions.get('window').width - 40}}>
        <View style={{height:null,width:null,marginLeft:20,marginRight:20,marginTop:20,marginBottom:10,alignItems:'center'}}>
          <Text style={{fontSize:25,color:'white',fontWeight:'bold',marginBottom:20}}>SIGN IN</Text>
          {Platform.OS == 'ios'? <TextInput
            onChangeText={(value) => this.setState({username:value})}
            style={{
              fontWeight:'bold',
              padding:5,fontSize:13,
              width:Dimensions.get('window').width - 60,
              height:  (Dimensions.get('window').height/2 -90)/6 ,backgroundColor:"rgba(255,255,255,0.2)",color:"black",
            }}
            underlineColorAndroid={"transparent"}
            placeholder={'Username'}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
          />
          : <TextInput
            onChangeText={(value) => this.setState({username:value})}
            style={{
              fontWeight:'bold',
              width:Dimensions.get('window').width - 60,
              padding:5,fontSize:13,backgroundColor:'transparent',
              height:  (Dimensions.get('window').height/2 -90)/6 ,backgroundColor:"rgba(255,255,255,0.2)",color:"black",
            }}
            underlineColorAndroid={"transparent"}
            placeholder={'Username'}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
          />}
          {Platform.OS == 'ios'? <TextInput
            onChangeText={(value) => this.setState({password:value})}
            style={{
              fontWeight:'bold',
              padding:5,fontSize:13,
              width:Dimensions.get('window').width - 60,
              height:  (Dimensions.get('window').height/2 -90)/6 ,backgroundColor:"rgba(255,255,255,0.2)",color:"black",
            }}
            underlineColorAndroid={"transparent"}
            placeholder={'Password'}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
          />
          : <TextInput
            onChangeText={(value) => this.setState({password:value})}
            style={{
              fontWeight:'bold',
              width:Dimensions.get('window').width - 60,
              padding:5,fontSize:13,backgroundColor:'transparent',
              height:  (Dimensions.get('window').height/2 -90)/6 ,backgroundColor:"rgba(255,255,255,0.2)",color:"black",
            }}
            underlineColorAndroid={"transparent"}
            placeholder={'Password'}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
          />}
          <TouchableHighlight onPress = {this._onPressLogin.bind(this)} style={{marginBottom:10}}>
            <View>
              <LinearGradient
                colors={['#00cdac','#8ddad5']}
                style={{
                  justifyContent:'center',
                  alignItems:'center',
                  width:Dimensions.get('window').width - 60,
                  height:  (Dimensions.get('window').height/2 -90)/6,
              }}>
                <Text style={{backgroundColor:'transparent',fontSize:15,fontWeight:'bold',color:'white'}}>SIGN IN</Text>
              </LinearGradient>
            </View>
          </TouchableHighlight>

          <View style={{height:1,backgroundColor:'rgba(255,255,255,0.7)',width:Dimensions.get('window').width - 40 - 20}}></View>
          <ButtonLoginFacebook navigator = {this.props.navigator}/>
          <Text style={{fontSize:12,fontWeight:'bold',color:'white'}}>-or-</Text>
          <TouchableHighlight onPress = {this._onPressSignUp.bind(this)}>
            <View>
              <LinearGradient
                colors={['#209cff','#68e0cf']}
                style={{
                  justifyContent:'center',
                  alignItems:'center',
                  width:Dimensions.get('window').width - 60,
                  height:  (Dimensions.get('window').height/2 -90)/6,
              }}>
                <Text style={{backgroundColor:'transparent',fontSize:15,fontWeight:'bold',color:'white'}}>SIGN UP</Text>
              </LinearGradient>
            </View>
          </TouchableHighlight>
        </View>
        {this._renderLoadingView()}
      </View>
    )
  }
}
