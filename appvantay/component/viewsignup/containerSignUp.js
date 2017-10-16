
import React, { Component } from 'react';
import {
  Text,Keyboard,
  View,Dimensions,Image,Alert,ActivityIndicator,
  TouchableHighlight,TextInput,Platform
} from 'react-native'
import styles from './style'
import {LinearGradient} from 'expo'
export default class DangKy extends Component {
  _onClickBack() {
    this.props.navigator.pop()
  }
  constructor(props){
    super(props)
    background = require('../../image/background.jpg');
    this.state = {
      username:'',
      password:'',
      animating:false
    }
  }
  _onPressLogin(){
    Keyboard.dismiss()
    this.props.navigator.pop()
  }
  fetchData= async() => {
         fetch(`https://doantotnghiep.herokuapp.com/getUsername/?username=${this.state.username}`, {
         method: 'GET'
       })
      .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson.length != 0) {
            this.setState({
               animating: false
            });
            Alert.alert('This username existed!')
          } else {
                   fetch(`https://doantotnghiep.herokuapp.com/signUp/?username=${this.state.username}&password=${this.state.password}`, {
                   method: 'GET'
                 })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))
                    if (responseJson.status == "OK") {
                      this.setState({
                         animating: false
                      });
                      Alert.alert('Sign Up is done')
                    } else {
                      Keyboard.dismiss()
                      Alert.alert('Create account fail')
                    }
                })
                .catch((error) => {
                   console.error(error);
                });
            }
      })
      .catch((error) => {
         console.error(error);
      });
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
  _onPressSignUp() {
    Keyboard.dismiss()
    this.setState({
      animating:true
    })
    this.fetchData()
  }
  render() {
    return (
      <View style={styles.container}>
          <Image
            style={{
              position:'absolute',
              width:Dimensions.get('window').width,
              height:Dimensions.get('window').height
            }}
            resizeMode={"cover"}
            source={background}
          />
          <View style={{height:Dimensions.get('window').height,
             width:Dimensions.get('window').width,position:'absolute'}}>
             <View style={{flex:1,backgroundColor:'rgba(255,255,255,0.3)'}}>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)',height:null,width:Dimensions.get('window').width - 40}}>
                    <View style={{height:null,width:null,marginLeft:20,marginRight:20,marginTop:40,marginBottom:40,alignItems:'center'}}>
                      <Text style={{fontSize:25,color:'white',fontWeight:'bold',marginBottom:40}}>SIGN UP</Text>
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
                      <TouchableHighlight onPress={this._onPressSignUp.bind(this)}>
                        <View>
                          <LinearGradient
                            colors={['#00cdac','#8ddad5']}
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
                      <View style={{marginTop:20,flexDirection:'row'}}>
                        <TouchableHighlight onPress={this._onPressLogin.bind(this)}>
                          <Text style={{fontSize:14,fontWeight:'bold',color:'#F9FEA5'}}> Login </Text>
                        </TouchableHighlight>
                        <Text style={{fontSize:13,fontWeight:'bold',color:'white'}}> If you have an account</Text>
                      </View>
                    </View>
                  </View>
               </View>
             </View>
          </View>
           <View style={styles.toolbar}>
            <TouchableHighlight
              onPress={this._onClickBack.bind(this)}
              activeOpacity={75 / 100}
              underlayColor={"rgb(210,210,210)"}>
              <Text style={styles.toolbarButton}>Back</Text>
            </TouchableHighlight>
              <Text style={styles.toolbarTitle}>Đăng ký tài khoản</Text>
              <Text style={styles.toolbarButton}>Add</Text>
           </View>
           {this._renderLoadingView()}


      </View>
      )
  }

}
