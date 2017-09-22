
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import styles from './style'
export default class Menu extends Component {
  _onClickBack() {
    this.props.navigator.pop()
  }
  _onClickDanhSach() {
    this.props.navigator.push({
         name:"listDanhSach",
                               duLieu:{
                                         
                                       }
      })
  }
  _onClickRaVao() {
    this.props.navigator.push({
         name:"listRaVao",
                               duLieu:{
                                         
                                       }
      })
  }
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={styles.container}>
         <View style={styles.toolbar}>
          <TouchableHighlight
            onPress={this._onClickBack.bind(this)}
            activeOpacity={75 / 100}
            underlayColor={"rgb(210,210,210)"}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableHighlight>
            <Text style={styles.toolbarTitle}>Menu Quản Lý</Text>
            <Text style={styles.toolbarButton}>Add</Text>
        </View>
        <View style={styles.btnXemDanhSach}>
          <TouchableHighlight onPress={this._onClickDanhSach.bind(this)} 
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Xem Danh Sách</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.btnXemRaVao}>
          <TouchableHighlight onPress={this._onClickRaVao.bind(this)} 
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:17,color:'white',fontWeight:'bold'}}>Xem Danh Sách Ra Vào</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}