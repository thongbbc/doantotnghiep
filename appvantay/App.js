/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Dimensions,
  View,
  Image
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
//IMPORT
import styles from './style/styles';
import ContainerLogin from './component/viewlogin/containerlogin';
import DangKy from './component/viewsignup/containerSignUp';
import Menu from './component/viewmenu/menu';
import ListDanhSach from './component/listDanhSach/listDanhSach';
import ListRaVao from './component/listRaVao/listRaVao';
import ListDetail from './component/listDetail/listDetail';
import DetailInfo from './component/detailInfo/detailInfo';
import AddMonHoc from './component/addMonHoc/addMonHoc';
import DangKyMonHoc from './component/dangkymonhoc/dangkymonhoc';
import background from './image/background.jpg';

export default class AppVanTay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  renderScence(route, navigator) {
    const { name, dulieu } = route;
    switch (name) {
      case 'dangnhap':
        return (
          <View style={styles.container}>
            <Image 
              style={{
                position: 'absolute',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }} resizeMode={'cover'} source={background} 
            />
            <View 
              style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              position: 'absolute'
              }}
            >
              <View 
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.3)',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              >
                <ContainerLogin navigator={navigator} />
              </View>
            </View>

            <View style={styles.toolbar}>
              <Text style={styles.toolbarTitle}>Login</Text>
            </View>
          </View>
        );
      case 'dangky':
        return (<DangKy navigator={navigator} />);
      case 'menu':
        return (<Menu {...dulieu} navigator={navigator} />);
      case 'listDanhSach':
        return (<ListDanhSach navigator={navigator} />);
      case 'listRaVao':
        return (<ListRaVao navigator={navigator} />);
      case 'listDetail':
        return (<ListDetail {...dulieu} navigator={navigator} />);
      case 'detailInfo':
        return (<DetailInfo {...dulieu} navigator={navigator} />);
      case 'addMonHoc':
        return (<AddMonHoc {...dulieu} navigator={navigator} />);
      case 'dangKyMonHoc':
        return (<DangKyMonHoc {...dulieu} navigator={navigator} />);
      default:
        return NaN;
    }
  }
  render() {
    return (
    <Navigator 
      style={{
        flex: 1
      }} initialRoute={{
        name: 'dangnhap'
      }} renderScene={this.renderScence.bind(this)}
    />);
  }
}

AppRegistry.registerComponent('AppVanTay', () => AppVanTay);
