import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import styles from './style'
// export function _renderButtonLogin(){

export default class ButtonLogin extends Component {
  _onPressLogin(){
    if (this.state.username == "Thong" && this.state.password == "123") {
        this.props.navigator.push({
        name:"menu",
        duLieu:{
                 username:this.state.username,
                 password:this.state.password
               }
      })
    } else {
        alert(this.state.username +"-"+ this.state.password)
    }
  }
  _onPressSignUp() {
    this.props.navigator.push({
      name:"dangky",
      duLieu:{
                 username:this.state.username,
                 password:this.state.password
               }
      })
  }
  constructor(props){
    super(props)
    this.state = {
      username:"",
      password:""
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.username !== this.state.username) {
      this.setState({ username: nextProps.username });
    }
      if(nextProps.password !== this.state.password) {
      this.setState({ password: nextProps.password });
    }
  }
render() {
  return (
    <View style = {styles.container}>
      <TouchableHighlight style = {styles.button}
        onPress={this._onPressLogin.bind(this)}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <Text style={{
        fontSize: 15,
        fontWeight: 'bold',
        color:'white'
        }}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight  style = {{marginTop : 10,alignItems:'center'}}
        onPress={this._onPressSignUp.bind(this)}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <Text style={{
        fontSize: 12,
        height:30,
        fontWeight: 'bold',
        color:"rgba(0,0,0,0.39)"
        }}>Sign Up If You Don't Have An Account</Text>
      </TouchableHighlight>
    </View>
    )
}
}
