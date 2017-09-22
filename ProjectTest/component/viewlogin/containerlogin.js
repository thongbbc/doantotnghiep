
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,Dimensions
} from 'react-native'
import styles from './style'
export function _renderContainerLogin(state){
  return <View style = {styles.container}>
          <Text style={{
              color: "rgba(255,92,193,1)",
              fontSize: 18,margin:10,
              top:0,
              fontWeight:  'bold' ,
              fontFamily: 'Helvetica Neue',
          }}>Finger Scan</Text>   
          <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
          <View style={{
              width:220,height:null}}><Text
              style={{
              marginBottom:5,
              color: "rgba(77,52,249,1)",
              fontSize: 11,
              fontWeight: 'bold',
              fontFamily: 'Helvetica Neue',
             }}>Username:</Text>
            <TextInput
              onChangeText = {(value)=> state.setState({username:value})}
              style={{
                padding:5,fontSize:13,
                height:  30 ,backgroundColor:"rgba(0,0,0,0.21)",color:"white",
              }}
              underlineColorAndroid={"transparent"}
              placeholder={'Press your username'}
              placeholderTextColor={"rgba(255,255,255,1)"}
            /></View></View>
    <View style={{flex: 1,justifyContent:'center'}}>
     <View style={{
        marginTop:10,
        width:220,height:null}}>
        <Text
          style={{
          marginBottom:5,
          color: "rgba(77,52,249,1)",
          fontSize: 11,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue',
        }}>Password:</Text>
        <TextInput
          onChangeText = {(value)=> state.setState({password:value})}
          style={{
            padding:5,
            height: 30,marginBottom: 20,backgroundColor:"rgba(0,0,0,0.21)",color:"white",
            fontSize:13
          }}
          underlineColorAndroid={"transparent"}
          secureTextEntry={true}
          placeholder={'Press your password'}
          placeholderTextColor={"rgba(255,255,255,1)"}
          /></View></View>
    <View style={{flex:0.5}}></View></View>
}