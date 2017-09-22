import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,ListView,TextInput
} from 'react-native'
import styles from './style'
export default class ListRaVao extends Component {
  constructor(props){
    super(props);
      const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
      dulieu=[];
      this.state={
        dataSource:ds.cloneWithRows(dulieu),
        them:[]
      }
      
  }
  _onClickBack() {
    this.props.navigator.pop()
  }
  _renderRow(dataSource){
    return (
      <View style={{height:50,width:null,flexDirection:'row',alignItems:'center'}}>
        <View style={{flex:1,left:20,flex:1,alignItems:'flex-start'}}><Text style={{flex:1,textAlign:'center'}} onPress={()=>alert(dataSource)}>{dataSource.id}</Text></View>
        <View style={{flex:3,alignItems:'center'}}><Text style={{flex:1,textAlign:'center'}} onPress={()=>alert(dataSource)}>{dataSource.hoten}</Text></View>
        <View style={{flex:2}}><Text style={{flex:1,textAlign:'center'}} onPress={()=>alert(dataSource)}>{dataSource.mssv}</Text></View>
      </View>
      );
  }
  _renderSeparator(sectionID,rowID,rowSelected){
    //alert(rowID)
    return(
        <View key={sectionID+" - "+rowID} style={{height:1,backgroundColor:"#CCC"}}></View>
      )
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
      fetch('http://192.168.1.79:9999/allData2', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
               this.setState({
                 them:responseJson
               })
               this.state.them.map(function(value){
                   dulieu.push(value)
              })
                this.setState({
                dataSource:this.state.dataSource.cloneWithRows(dulieu)
                });
      })
      .catch((error) => {
         console.error(error);
      });
   }
  
  render() {
    return (
      <View style={styles.container} >
         <View style={styles.toolbar}>
          <TouchableHighlight
            onPress={this._onClickBack.bind(this)}
            activeOpacity={75 / 100}
            underlayColor={"rgb(210,210,210)"}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableHighlight>
            <Text style={styles.toolbarTitle}>Danh Sách Ra Vào</Text>
            <Text style={styles.toolbarButton}>Add</Text>
        </View>
        <View style={{height:50,flexDirection:'row'}}>
          <View style={{left:20,flex:1,alignItems:'flex-start',justifyContent:'center'}}><Text style={{color:'red',textAlign:'center',fontWeight:'bold',fontSize:20}}>ID</Text></View>
          <View style={{flex:1,alignItems:'flex-start',justifyContent:'center'}}><Text style={{color:'red',textAlign:'center',fontWeight:'bold',fontSize:20}}>Ho Ten</Text></View>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{color:'red',textAlign:'center',fontWeight:'bold',fontSize:20}}>MSSV</Text></View>
        </View>
        <ListView
        enableEmptySections = {true}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
        />
      </View>
    );
  }
}
