import React, { Component } from 'react';
import {
  Text,Dimensions,
  View,
  TouchableHighlight,TextInput,Platform,ActivityIndicator,FlatList
} from 'react-native'
import styles from './style'
import {LinearGradient} from 'expo'
export default class ListRaVao extends Component {
  _renderLoadingView(){
    if (this.state.animating) {
      return <ActivityIndicator
      style={{position:'absolute',width:Dimensions.get('window').width,height:Dimensions.get('window').height,
      top:1,alignItems:'center',justifyContent:'center'}}
      animating={ this.state.animating }
      size={'small'}
      hidesWhenStopped={true}
      color={'black'}/>    }
  };
  constructor(props){
    super(props);
      dulieu=[];
      dulieu2=[];
      this.state={
        animating : true,refreshing:false,
        dataSource:[],
        them:[]
      }

  }
  _onClickBack() {
    this.props.navigator.pop()
  }
  _renderRow(item,index){
    color = index%2?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.1)'
    return (
      <View style={{backgroundColor:color,height:50,width:null,flexDirection:'row',alignItems:'center'}}>
        <View style={{flex:1,left:20,flex:1,alignItems:'flex-start'}}><Text  style={{textAlign:'center',backgroundColor:'transparent'}} onPress={()=>alert(item.hoten)}>{item.id}</Text></View>
        <View style={{flex:3,alignItems:'center'}}><Text  style={{textAlign:'center',backgroundColor:'transparent'}} onPress={()=>alert(item)}>{item.hoten}</Text></View>
        <View style={{flex:2}}><Text  style={{textAlign:'center',backgroundColor:'transparent'}} onPress={()=>alert(item)}>{item.mssv}</Text></View>
      </View>
      );
  }

  _onChange(value){
    this.setState({them:value})
  }
  fetchData() {
    fetch('https://doantotnghiep.herokuapp.com/allData1', {
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
               fetch('https://doantotnghiep.herokuapp.com/allData2', {
                   method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJson) => {
                        dulieu2 = []
                         this.setState({
                           them:responseJson
                         })
                         this.state.them.map(function(value){
                             dulieu2.push(value)
                        })

                        for (var i =0 ;i<dulieu.length; i++) {
                          for (var j =0 ;j<dulieu2.length;j++) {
                            if(dulieu2[j].id == dulieu[i].id) {
                              dulieu2[j].hoten = dulieu[i].hoten
                              dulieu2[j].mssv = dulieu[i].mssv
                            }
                          }
                        }
                       this.setState({
                         dataSource:dulieu2,
                         animating : false,
                         refreshing:false
                       });
                })
                .catch((error) => {
                   console.error(error);
                });
      })
      .catch((error) => {
         console.error(error);
      });

  }
  componentDidMount() {
      this.fetchData()
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
            <Text style={styles.toolbarTitle}>Danh Sách Ra Vào</Text>
            <Text style={styles.toolbarButton}>Add</Text>
        </View>
        <View style={{backgroundColor:"rgba(0,0,0,0.2)",height:50,flexDirection:'row'}}>
          <View style={{left:20,flex:1,alignItems:'flex-start',justifyContent:'center'}}><Text style={{color:'white',backgroundColor:'transparent',textAlign:'center',fontWeight:'bold',fontSize:20}}>ID</Text></View>
          <View style={{flex:1,alignItems:'flex-start',justifyContent:'center'}}><Text style={{color:'white',backgroundColor:'transparent',textAlign:'center',fontWeight:'bold',fontSize:20}}>Ho Ten</Text></View>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white',backgroundColor:'transparent',textAlign:'center',fontWeight:'bold',fontSize:20}}>MSSV</Text></View>
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
