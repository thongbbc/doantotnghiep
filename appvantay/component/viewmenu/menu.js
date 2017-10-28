
import React, { Component } from 'react';
import {
  Text,AsyncStorage,Dimensions,
  View,Image, Modal,Animated,Easing,
  TouchableHighlight,Alert
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
      this.spring(visible)

    } else {
      Animated.timing(this.state.slideAnimation,{
        toValue:-Dimensions.get('window').width*3/4,
        duration:500,easing:Easing.bounce
      }).start(()=>this.setState({modalVisible: visible}))
      Animated.timing(this.state.slideAnimation2,{
        toValue:0,
        duration:500,easing:Easing.bounce
      }).start()
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
  spring (visible) {
    this.springValue.setValue(0.3)
    Animated.timing(
      this.springValue,
      {
        toValue: 1,
        duration:200,easing:Easing.bounce
      }
    ).start(()=>{
      this.setState({modalVisible: visible});
        // this.spring()
        Animated.timing(this.state.slideAnimation,{
          toValue:0,
          duration:600,easing:Easing.bounce
        }).start()
        Animated.timing(this.state.slideAnimation2,{
          toValue:-Dimensions.get('window').width-Dimensions.get('window').width/2,
          duration:600,easing:Easing.bounce
        }).start()
    })
  }
  constructor(props){
    super(props)
    this.springValue = new Animated.Value(1)

    this.state = {
      slideAnimation:new Animated.Value(-Dimensions.get('window').width*3/4),
      slideAnimation2:new Animated.Value(0),
      slideAnimation3:new Animated.Value(-300),
      slideAnimation4:new Animated.Value(-300),
      modalVisible:false,
      sideMenuString: ['About','Logout','Fix','Fix','Fix','Fix','Fix','Fix','Fix','Fix']
    }
  }
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.slideAnimation3,{
        toValue:0,
        duration:2000,easing:Easing.bounce
      }).start(),
      Animated.timing(this.state.slideAnimation4,{
        toValue:0,
        duration:2000,easing:Easing.bounce
      }).start()
    ])
  }
  componentDidUpdate() {

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
  _onClickAbout() {
    Alert.alert("This is a app manage print finger of VLTH")
  }
  render(){
    const marginLeft = this.state.slideAnimation
    const marginRight = this.state.slideAnimation2
    const marginLeft2 = this.state.slideAnimation3
    const marginRight2 = this.state.slideAnimation4
    return(
      <View style={styles.container}>
        <Animated.View style={{marginRight,flex:1}}>
        <LinearGradient style={{flex:1}} colors = {['#B7F8DB','#50A7C2']}>
         <View style={styles.toolbar}>
         <View style={{left:5,width:30}}>
         <TouchableHighlight
           activeOpacity={0 / 100}
           underlayColor = {'transparent'}
           onPress={() => {
           this.setModalVisible(true)
         }}>
           <Animated.View style={{transform: [{scale: this.springValue}]}}>
             <Image
               style={{
                 width: 30,
                 height:  30
               }}
               resizeMode={"cover"}
               source={require('../../image/vert.png')}
             />
          </Animated.View>
         </TouchableHighlight></View>
            <Text style={styles.toolbarTitle}>      Menu Quản Lý</Text>
            <Text style={styles.toolbarButton}> </Text>
        </View>
        <Animated.View style={{width:null,height:null,alignItems:'center',marginLeft:marginLeft2}}>
          <TouchableHighlight onPress={this._onClickDanhSach.bind(this)}
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Xem Danh Sách</Text>
          </TouchableHighlight>
        </Animated.View>
        <Animated.View style={{width:null,height:null,alignItems:'center',marginRight:marginRight2}}>
          <TouchableHighlight onPress={this._onClickRaVao.bind(this)}
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:17,color:'white',fontWeight:'bold'}}>Xem Danh Sách Ra Vào</Text>
          </TouchableHighlight>
        </Animated.View>




        <Animated.View style={{width:null,height:null,alignItems:'center',marginLeft:marginLeft2}}>
          <TouchableHighlight onPress={this._onClickAddMonHoc.bind(this)}
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:17,color:'white',fontWeight:'bold'}}>Add mon hoc cho sv</Text>
          </TouchableHighlight>
        </Animated.View>

        <Animated.View style={{width:null,height:null,alignItems:'center',marginRight:marginRight2}}>
          <TouchableHighlight onPress={this._onClickDangKyMon.bind(this)}
            style={{
              width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10
          }}>
            <Text style={{fontSize:17,color:'white',fontWeight:'bold'}}>Dang Ky Mon Hoc</Text>
          </TouchableHighlight>
        </Animated.View>



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
               backgroundColor:'rgba(0,0,0,0)'}}></View>
             <View style={{flex:1,flexDirection:'row'}}>
               <Animated.View style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width*3/4,marginLeft,transform: [{scale: this.springValue}]}}>
                 <LinearGradient colors = {['#B7F8DB','#50A7C2']} style={{flex:1}}>
                  <View style={{flex:1}}>
                    <View style={{height:30}}></View>
                    <View style={{flex:1,alignItems:'center'}}>
                      <View style={{
                          width:Dimensions.get('window').width*3/4,height:Dimensions.get('window').height/4,alignItems:'center'}}>

                      </View>
                      <View style={{width:Dimensions.get('window').width*3/4,height:Dimensions.get('window').height*3/4,backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <View style={{padding:10,flex:1,top:Dimensions.get('window').width*3/24 + 20}}>
                          <TouchableHighlight style={{height:Dimensions.get('window').height*3/4/this.state.sideMenuString.length,bottom:1}} onPress={()=>{this._onClickAbout.bind(this)}}>
                            <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{this.state.sideMenuString[0]}</Text>
                          </TouchableHighlight>
                          <TouchableHighlight style={{bottom:0}} onPress={()=>{this._onClickLogout()}}>
                            <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{this.state.sideMenuString[1]}</Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                      <LinearGradient
                        colors = {['#B7F8DB','rgba(255,255,255,0.00002)']}
                        style={{
                          alignItems:'center',justifyContent:'center',
                          position:'absolute',
                          marginTop:Dimensions.get('window').height/4-Dimensions.get('window').width*3/12/2,
                          width:Dimensions.get('window').width*3/12 + 10,
                          height:Dimensions.get('window').width*3/12 + 10,borderRadius:Dimensions.get('window').width*3/12/2 + 10
                        }}>
                        <Image
                          style={{
                            width:Dimensions.get('window').width*3/12,
                            height:Dimensions.get('window').width*3/12,borderRadius:Dimensions.get('window').width*3/12/2
                          }}
                          source={{uri: this.props.image}}
                        />
                      </LinearGradient>
                    </View>
                  </View>
                 </LinearGradient>
               </Animated.View>
               <View style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width/4}}>
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
    </Animated.View>
      </View>
    )
  }
}
