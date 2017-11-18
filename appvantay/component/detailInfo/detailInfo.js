import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,Image,
  TextInput,Dimensions,FlatList,
  ActivityIndicator,Platform
} from 'react-native'
import {LinearGradient} from 'expo'
import styles from './style'
export default class DetailInfo extends Component {
  constructor(props){
    super(props);
      dulieu=[];
      this.state={
        dataSource:[],
        animating: true,
        them:'',
        refreshing:false
      }

  }
  _onPress(data)
  {
    this.props.navigator.push({
        name:"listDetail",
        dulieu: {
          'id':this.props.id,
          'hoten':this.props.hoten
        }
      })
  }
 _renderLoadingView(){
     if (this.state.animating) {
      return <ActivityIndicator
      style={{position:'absolute',width:Dimensions.get('window').width,height:Dimensions.get('window').height,
      top:1,alignItems:'center',justifyContent:'center'}}
      animating={ this.state.animating }
      size={'small'}
      hidesWhenStopped={true}
      color={'black'}/>    }
  }
  _onClickBack() {
    this.props.navigator.pop()
  }
  _onChange(value){
    this.setState({them:value})
  }
  _renderRow(item,index){
    color = index%2?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.1)'
    image = item.typeTrip == true?require('../../image/goinside.png'):require('../../image/gooutside.png')
    return (
      <View style={{backgroundColor:color,height:50,width:null,flexDirection:'row',alignItems:'center'}}>
        <TouchableHighlight style={{flex:1}}onPress={this._onPress.bind(this,item)}>
          <View style={{height:50,alignItems:'center',width:null,flex:1,flexDirection:'row'}}>
            <View style={{flex:1,left:20,flex:1,alignItems:'flex-start'}}><Text  style={{textAlign:'center'}}>{item.id}</Text></View>
            <View style={{flex:3,alignItems:'center'}}><Text style={{textAlign:'center'}}>{item.date}</Text></View>
            <View style={{flex:2,alignItems:'center'}}><Text  style={{textAlign:'center'}}>{item.count}</Text></View>
            <View style={{flex:2}}><View style={{alignItems:'center'}}><Image source={image}/></View></View>
          </View>
        </TouchableHighlight>
      </View>
      );
  }
  componentDidMount() {
      this.fetchData()
   }
  fetchData() {
     fetch('https://doantotnghiep.herokuapp.com/countId?id='+this.props.id, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         dulieu = []
        this.setState({
          them:responseJson
        })
        this.state.them.map(function(value){
          dulieu.push(value)
        })
        this.setState({
          dataSource:dulieu,
          animating: false,
          refreshing:false
        });
      })
      .catch((error) => {
         console.error(error);
      });
  }
  refresh() {
    this.setState({
      refreshing:true
    })
    this.fetchData()
  }
  render() {
    return (
      <View style={styles.container} >
        <LinearGradient style={{flex:1}} colors = {['#B7F8DB','#50A7C2']}>
         <View style={styles.toolbar}>
          <TouchableHighlight style= {{height:30, justifyContent:'center'}}
            onPress={this._onClickBack.bind(this)}
            activeOpacity={75 / 100}
            underlayColor={"rgb(210,210,210)"}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableHighlight>
            <Text style={styles.toolbarTitle}>INFORMATION</Text>
            <Text style={styles.toolbarButton}>Add</Text>
        </View>
        <View style={{backgroundColor:"rgba(0,0,0,0.2)",alignItems:'flex-start',paddingLeft:10,padding:10,flexDirection:'row'}}>
          <Text style={{fontSize:15,fontWeight:'bold',backgroundColor:'transparent',color:'white'}}>Họ Tên: </Text>
          <Text style={{fontSize:15,fontWeight:'bold',backgroundColor:'transparent',color:'white'}}>{this.props.hoten}</Text>
        </View>
        <View style={{backgroundColor:"rgba(0,0,0,0.2)",paddingLeft:10,alignItems:'flex-start',padding:10,flexDirection:'row'}}>
        <Text style={{fontSize:15,fontWeight:'bold',backgroundColor:'transparent',color:'white'}}>ID: </Text>
        <Text style={{fontSize:15,fontWeight:'bold',backgroundColor:'transparent',color:'white'}}>{this.props.id}</Text>
        </View>

        <FlatList style={{flex:1,marginTop:10}}
              data = {this.state.dataSource}
              keyExtractor = {(x,i) => i}
              refreshing = {this.state.refreshing}
             onRefresh = {() =>
                this.refresh()
              }
              renderItem={({item,index}) =>
              this._renderRow(item,index)
          }>
          </FlatList>
          <View style={styles.btnXemChiTiet}>
          <TouchableHighlight onPress = {this._onPress.bind(this)} style={{
                width:220,marginTop:10,height:50,alignItems:'center',justifyContent:'center',backgroundColor:"rgba(226,127,127,1)",borderRadius:10}}>
                <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>Xem Toàn Bộ Lịch Sử Ra vào</Text>
          </TouchableHighlight></View>
        </LinearGradient>
        {this._renderLoadingView()}
      </View>
    );
  }
}
