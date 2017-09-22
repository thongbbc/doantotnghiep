/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import styles from './style'
export function _renderLogo(state){
  return <View style = {styles.logo}>
          <Image 
            style={{
              width: 100,
              height:  100 ,borderRadius:50
            }}
            resizeMode={"cover"}
            source={require('./hinh.jpg')}
          />
        </View>
}