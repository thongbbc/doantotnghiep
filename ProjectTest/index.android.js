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
  View,Navigator
} from 'react-native'

//IMPORT
import styles from './style/styles'
import {_renderLogo} from './component/logo/logo'
import {_renderContainerLogin} from './component/viewlogin/containerlogin'
import DangKy from './component/viewsignup/containerSignUp'
import Menu from './component/viewmenu/menu'
import ButtonLogin from './component/viewlogin/button/buttonlogin'
import ListDanhSach from './component/listDanhSach/listDanhSach'

class Project extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:""
    } 
  }
  _renderScence(route,navigator){
    let name=route.name;
    let dulieu=route.duLieu;
    switch(name)
      {
        case 'dangnhap':
          return(
            <View style={styles.container}>
                <View style={styles.toolbar}>
                        <Text style={styles.toolbarTitle}>Đăng nhập tài khoản</Text>
                </View>
              <View style={styles.viewTop}>{_renderLogo(this)}</View>
              <View style={styles.viewBottom}></View>
              {_renderContainerLogin(this)}
              <ButtonLogin navigator={navigator} username={this.state.username} password={this.state.password}/>
            </View>
          )
       case 'dangky':
          return(
              <DangKy navigator = {navigator}/>
          )
       case 'menu':
          return(
              <Menu navigator = {navigator}/>
          )
       case 'listDanhSach':
          return(
            <ListDanhSach navigator = {navigator}/>
          )
      }
  }
  render() {
    return (
      <Navigator style={{flex:1}}
          initialRoute={{name:"dangnhap"}}
          renderScene={this._renderScence.bind(this)}
        />
    );
  }
}
AppRegistry.registerComponent('Project', () => Project);
