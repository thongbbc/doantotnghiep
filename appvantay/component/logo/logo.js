/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,Dimensions,
  View,
  Image,
} from 'react-native'
import styles from './style'
export function _renderLogo(state){
  return <View style = {styles.logo}>
          <Image
            style={{
              width: Dimensions.get('window').width/3,
              height:  Dimensions.get('window').width/3 ,borderRadius:Dimensions.get('window').width/3/2
            }}
            resizeMode={"cover"}
            source={require('./logo2.jpg')}
          />
        </View>
}
