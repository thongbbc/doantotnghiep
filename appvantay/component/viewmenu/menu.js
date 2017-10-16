
import React, { Component } from 'react';
import {
  Text,AsyncStorage,Dimensions,
  View,Image, Modal,Animated,
  TouchableHighlight,
} from 'react-native'
import DrawerLayout from '../drawerCustom/drawerLayout'
import styles from './style'
import {LinearGradient} from 'expo'
// import {GoogleSignin} from 'react-native-google-signin';
export default class Menu extends Component {
  async logout() {
    try {
      await AsyncStorage.setItem('token','');
      this.props.navigator.pop()
    } catch (error) {
      // Error saving data
    }
  }
  _onClickBack() {
    this.logout()
  }
  _onClickDanhSach() {
    this.props.navigator.push({
         name:"listDanhSach",
         duLieu:{

         }
      })
  }
  setModalVisible(visible) {
    if (visible == true) {
      this.setState({modalVisible: visible});
        // this.spring()
        Animated.timing(this.state.slideAnimation,{
          toValue:0,
          duration:500
        }).start()//()=>this.spring())
    } else {
      Animated.timing(this.state.slideAnimation,{
        toValue:-Dimensions.get('window').width*3/4,
        duration:400
      }).start(()=>this.setState({modalVisible: visible}))
    }
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
    this.setState ({modalVisible:false})
    this.logout()
  }
  _onClickRaVao() {
    this.props.navigator.push({
         name:"listRaVao",
         duLieu:{

                }
    })
  }
  spring () {
    this.springValue.setValue(0.3)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 5
      }
    ).start()
  }
  constructor(props){
    super(props)
    this.springValue = new Animated.Value(1)

    this.state = {
      slideAnimation:new Animated.Value(-Dimensions.get('window').width*3/4),
      modalVisible:false
    }

  }
  _onClickAddMonHoc() {
    this.props.navigator.push({
         name:"addMonHoc",
         duLieu:{

                }
      })
  }
  _onClickDangKyMon() {
    this.props.navigator.push({
      name:"dangKyMonHoc",
      duLieu:{

             }
    })
  }
  render(){
    const marginLeft = this.state.slideAnimation
    return(
      <View style={styles.container}>
        <LinearGradient style={{flex:1}} colors = {['#B7F8DB','#50A7C2']}>
         <View style={styles.toolbar}>
         <View style={{left:5,width:30}}>
         <TouchableHighlight
           activeOpacity={0 / 100}
           underlayColor = {'transparent'}
           onPress={() => {
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
         </TouchableHighlight></View>
            <Text style={styles.toolbarTitle}>      Menu Quản Lý</Text>
            <Text style={styles.toolbarButton}> </Text>
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




        <View style={styles.btnXemRaVao}>
          <TouchableHighlight onPress={this._onClickAddMonHoc.bind(this)}
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:17,color:'white',fontWeight:'bold'}}>Add mon hoc cho sv</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.btnXemRaVao}>
          <TouchableHighlight onPress={this._onClickDangKyMon.bind(this)}
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:17,color:'white',fontWeight:'bold'}}>Dang Ky Mon Hoc</Text>
          </TouchableHighlight>
        </View>



        <View style = {{flex:1,position:'absolute'}}>
          <View style={{marginTop: 30,left:10}}>
            <Modal
              animationType="none"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {alert("Modal has been closed.")}}
              >
              <View style={{position:'absolute',width:Dimensions.get('window').width,
               height:Dimensions.get('window').height,
               backgroundColor:'rgba(0,0,0,0.5)'}}></View>
             <View style={{flex:1,flexDirection:'row'}}>
               <Animated.View style={{flex:3,marginLeft,transform: [{scale: this.springValue}]}}>
                 <LinearGradient colors={['rgba(255,255,255,1)','rgba(0,0,0,1)']} style={{flex:1}}>
                  <View>
                    <View style={{height:30}}></View>
                    <View style={{flex:1,alignItems:'center'}}>
                      <Image
                        style={{
                          width: 100,
                          height:  100,borderRadius:100/2
                        }}
                        source={{uri: this.props.image}}
                      />
                      <View style={{height:null,width:null}}>
                        <TouchableHighlight style={{height:30,width:100,alignItems:'center'}} onPress={()=>{this._onClickLogout()}}>
                          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>LOGOUT</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                 </LinearGradient>
               </Animated.View>
               <View style={{flex:1}}>
                 <TouchableHighlight
                 underlayColor = {'transparent'} style={{flex:1}}
                 onPress={()=>{this.setModalVisible(false)}}>
                  <View style={{flex:1,backgroundColor:'transparent'}}></View>
                 </TouchableHighlight>
               </View>

             </View>
            </Modal>
          </View>
        </View>
      </LinearGradient>
      </View>
    )
  }
}
