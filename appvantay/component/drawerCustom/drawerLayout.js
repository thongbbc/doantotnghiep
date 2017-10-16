import React, { Component } from 'react';
import {AsyncStorage,Image, Modal,Animated, Text,Easing, TouchableHighlight, View,Dimensions } from 'react-native';

export default class DrawerLayout extends Component {

  constructor(props) {
    super(props)
    this.state = {modalVisible:true}
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  async logout() {
    try {
      await AsyncStorage.setItem('token','');
      this.props.navigator.pop()
    } catch (error) {
      // Error saving data
    }
  }
  _onClickLogout(){
    this.logout()
  }
  render() {
    return (
      <View style={{marginTop: 30,left:10}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{flex:1,flexDirection:'row'}}>
           <View style={{
             flex:3,backgroundColor:'white'}}>
            <View>
              <View style={{height:30}}></View>
              <Text>Hello World!</Text>
              <TouchableHighlight onPress={this._onClickLogout.bind(this)}>
                <Text>Logout</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(false)
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
           </View>
           <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}></View>
         </View>
        </Modal>

        <TouchableHighlight  onPress={() => {
          this.setModalVisible(true)
        }}>
          <View >
          <Image
            style={{
              width: 30,
              height:  30
            }}
            resizeMode={"cover"}
            source={require('../../image/vert.png')}
          />
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}
