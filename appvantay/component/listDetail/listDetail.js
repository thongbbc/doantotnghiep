import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,Dimensions,FlatList,
  ActivityIndicator,Platform,Image
} from 'react-native'
import {LinearGradient} from 'expo'
import styles from './style'
export default class ListDetail extends Component {
  constructor(props){
    super(props);
      dulieu=[];
      this.state={
        dataSource:[],
        them:[],
        animating: true,refreshing:false
      }

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
  _renderRow(item,index){
    color = index%2?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.1)'
    image = item.typeTrip == true?require('../../image/goinside.png'):require('../../image/gooutside.png')
    return (
      <View style={{backgroundColor:color,height:50,width:null,flexDirection:'row',alignItems:'center'}}>
        <View style={{flex:1,left:20,flex:1,alignItems:'flex-start'}}><Text style={{backgroundColor:'transparent'}} onPress={()=>alert(item)}>{item.id}</Text></View>
        <View style={{flex:3}}><Text style={{textAlign:'center',backgroundColor:'transparent'}} onPress={()=>alert(item)}>{item.time}</Text></View>
        <View style={{flex:2}}><Text style={{textAlign:'center',backgroundColor:'transparent'}} onPress={()=>alert(item)}>{item.date}</Text></View>
        <View style={{flex:2}}><View style={{alignItems:'center'}}><Image source={image}/></View></View>
      </View>
      );
  }

  _onPress()
  {
    dulieu.push(this.state.them)
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(dulieu)
    });
    //alert(this.state.them)
  }
  _onChange(value){
    this.setState({them:value})
  }
  componentDidMount() {
      this.fetchData()
   }
  fetchData() {
      fetch('https://doantotnghiep.herokuapp.com/getId?id='+this.props.id, {
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
                dataSource:dulieu
                });
              this.setState({
                animating: false,refreshing:false
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
        <LinearGradient style={{flex:1}} colors={['#B7F8DB','#50A7C2']}>
         <View style={styles.toolbar}>
          <TouchableHighlight style= {{height:30, justifyContent:'center'}}
            onPress={this._onClickBack.bind(this)}
            activeOpacity={75 / 100}
            underlayColor={"rgb(210,210,210)"}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableHighlight>
            <Text style={styles.toolbarTitle}>{this.props.hoten}</Text>
            <Text style={styles.toolbarButton}>Add</Text>
        </View>
        <View style={{backgroundColor:'rgba(0,0,0,0.2)',height:50,flexDirection:'row'}}>
          <View style={{left:20,flex:1,alignItems:'flex-start',justifyContent:'center'}}><Text style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:20}}>ID</Text></View>
          <View style={{flex:3,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:20,backgroundColor:'transparent'}}>TIME</Text></View>
          <View style={{flex:2,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:20,backgroundColor:'transparent'}}>DATE</Text></View>
          <View style={{flex:2,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:20,backgroundColor:'transparent'}}>STATUS</Text></View>
        </View>


          <FlatList style={{flex:1}}
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
        </LinearGradient>
        {this._renderLoadingView()}
      </View>
    );
  }
}
