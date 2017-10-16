import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TextInput,Alert,
  Image,AsyncStorage,Dimensions,ActivityIndicator,
  TouchableHighlight,Platform
} from 'react-native'

// import {GoogleSignin} from 'react-native-google-signin';

import styles from './style'
export default class ButtonLoginFacebook extends Component {
  componentWillMount() {
    this.checkToken()
  }
  async checkToken() {
    try {
      const value = await AsyncStorage.getItem('token');

      const avatar = await AsyncStorage.getItem('photoUrl');
      if (value !== null && value != ''){
        console.log(value);
        if (avatar !=null && value != '') {
          this.props.navigator.push({
            name:"menu",
            duLieu:{
                     username:this.state.username,
                     password:this.state.password,
                     image:avatar
                   }
          })
        } else {
          this.props.navigator.push({
            name:"menu",
            duLieu:{
                     username:this.state.username,
                     password:this.state.password,
                     image:''
                   }
          })
        }
      }
    } catch (error) {

    }
  }
  _onPressLogin(){
    this.setState({animating:true})
    this.signInWithFacebookAsync()
  }
  _onPressLogin2(){
    this.setState({animating:true})
    this.signInWithGoogleAsync()

  }
  constructor(props){
    super(props)
    facebook=require("../../image/facebook.png");
    google=require("../../image/googleplus.png");
    this.state = {
      username:"",
      password:"",
      image:"",
      animating:false
    }
  }
  async getUserInfo(accessToken) {
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}`},
    });

    return userInfoResponse;
  }

  async signInWithFacebookAsync() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('146419965875838', {
      permissions: ['public_profile'],
    });
    this.setState({animating:false})
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      this.login(token)
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(JSON.stringify(response))
      this.props.navigator.push({
       name:"menu",
       duLieu:{
                username:this.state.username,
                password:this.state.password,
              }
       })
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '111905130100-r0bjpnmurdidg5sjqoa8ike124knujkb.apps.googleusercontent.com',
        iosClientId: '111905130100-65tqg7iumra61d1rd0acn872vhjgsa64.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      this.setState({animating:false})
      if (result.type === 'success') {
          this.login(result.accessToken)
          try {
            await AsyncStorage.setItem('photoUrl', result.user.photoUrl);
          } catch (error) {
            // Error saving data
          }
         this.props.navigator.push({
          name:"menu",
          duLieu:{
                   username:this.state.username,
                   password:this.state.password,
                   image:result.user.photoUrl
                 }
          })
         Alert.alert('Logged in!',
          `Hi ${(await result.user.name)}!`,
        );
         console.log(JSON.stringify(result))
        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }
  async login(token) {
    try {
      await AsyncStorage.setItem('token',token);
    } catch (error) {
      // Error saving data
    }
  }
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
  render() {
    return (
      <View style = {styles.container}>
        <TouchableHighlight style = {styles.button}
          onPress={this._onPressLogin.bind(this)}
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Image
            style={{
              width: Dimensions.get('window').height/20 ,right:3,
              height:  (Dimensions.get('window').height/2 -90)/6 - 10
            }}
            resizeMode={"cover"}
            source={facebook}
          />
          <Text style={{
          fontSize: 10,
          fontWeight: 'bold',
          color:'white'
           }}>Facebook</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.button2}
          onPress={this._onPressLogin2.bind(this)}
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Image
            style={{
              width: Dimensions.get('window').height/20,right:3,
              height:  (Dimensions.get('window').height/2 -90)/6 - 10 ,
            }}
            resizeMode={"cover"}
            source={google}
          />
          <Text style={{
          fontSize: 10,
          fontWeight: 'bold',
          color:'white'
           }}>Google</Text>
            </View>
        </TouchableHighlight>
        {this._renderLoadingView()}
      </View>
      )
  }
}
