
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import styles from './style'
export default class DangKy extends Component {
  _onClickBack() {
    this.props.navigator.pop()
  }
  constructor(props){
    super(props)
  }
  render() {
    return <View style={styles.container}> 
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
      
        </View>
  }

}
