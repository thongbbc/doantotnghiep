import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Alert,
  Picker,
  Animated,
  Keyboard,
  DatePickerIOS,Image,
  Dimensions,
  FlatList,
  ProgressBarAndroid,
  Platform,
  ActivityIndicator
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'
import {LinearGradient} from 'expo'
import styles from './style'
export default class DangKyMonHoc extends Component {
  fetchUpdateDangKyMon = async() => {
    fetch(`https://doantotnghiep.herokuapp.com/removeDangKyMonHoc/?monHoc=${this.state.selectedMon.tenMonHoc}`, {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status == 'OK') {
        const { dataSource } = this.state;
        data = []
        var objectMonHoc = this.state.dsMonHoc.find((value) => {
          return value.tenMonHoc == this.state.selectedMon.tenMonHoc
        })
        dataSource.map((value,index) => {
          if (value.check) {
            value.tenMonHoc = objectMonHoc.tenMonHoc
            value.timeStart = objectMonHoc.timeStart
            value.timeEnd = objectMonHoc.timeEnd
            value.thu = objectMonHoc.thu
            data.push(value)
          }
        })
        fetch('https://doantotnghiep.herokuapp.com/saveJsonDangKyMon/?json='+JSON.stringify(data), {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
          if(responseJson.status == 'OK') {
            Alert.alert("Đăng Ký Môn Thành Công")
            this.refresh()
          } else {
            Alert.alert("Đăng Ký Môn Fail")
          }
        }).catch((error) => {
          console.error(error);
          Alert.alert("Đăng Ký Môn Fail")
        });
      } else {
        Alert.alert("Đăng Ký Môn Fail")
      }
    }).catch((error) => {
      console.error(error);
      Alert.alert("Đăng Ký Môn Fail")
    });
  }
  fetchDataDangKyMon = async() => {
    fetch('https://doantotnghiep.herokuapp.com/dangKyMonHoc', {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
      if (responseJson.length != 0) {
        dulieu = []
        dulieu = this.state.dataSource
        dulieu.map((value,index) => {
          value.check = false
          value.icon = require('../../image/uncheck.png')
        })
        responseJson.map((value,index) => {
          dulieu.map((value2,index) => {
            if (value.id == value2.id && value.tenMonHoc == this.state.selectedMon.tenMonHoc) {
              value2.check = true
              if (value2.check == true) {
                value2.icon = require('../../image/check.png')
              } else {
                value2.icon = require('../../image/uncheck.png')
              }
            }
          })
        })
        this.setState({dataSource:dulieu,refreshing:false,animating:false})
      }else 
      this.setState({refreshing:false,animating:false})
      
    }).catch((error) => {
      console.error(error);
    });
  }
  fetchDataDanhSach = async() => {
    fetch('https://doantotnghiep.herokuapp.com/allData1', {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
      dulieu = []
      responseJson.map(function(value) {
        value.check = false
        if (value.check == true) {
          value.icon = require('../../image/check.png')
        } else {
          value.icon = require('../../image/uncheck.png')
        }
        dulieu.push(value)
      })
      this.setState({dataSource: dulieu, animating: false, refreshing: false});
      this.fetchDataDangKyMon()
      console.log(JSON.stringify(this.state.dataSource))
    }).catch((error) => {
      console.error(error);
    });
  }
  _renderLoadingView() {
    if (this.state.animating) {
      return <ActivityIndicator style={{
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        top: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }} animating={this.state.animating} size={'small'} hidesWhenStopped={true} color={'black'}/>
    }
  }
  constructor(props) {
    super(props)
    dulieu = []
    this.state = {
      dsMonHoc: [{'tenMonHoc':'KhongCoMonHoc'}],
      selectedMon: {'tenMonHoc':'KhongCoMonHoc'},
      dataSource:[],
      refreshing:false,
      animating:false
    }
  }
  componentDidMount() {
    this.setState({animating:true})
    this.fetchDataMon()
  }
  _onClickItem(item) {
    dulieu = this.state.dataSource
    dulieu.map((value,index) => {
      if (value.id == item.id) {
        value.check = !value.check
        if (value.check == true) {
          value.icon = require('../../image/check.png')
        } else {
          value.icon = require('../../image/uncheck.png')
        }
      }
    })
    this.setState({dataSource:dulieu})
  }
  _onPressDangKyMon() {
    this.setState({animating:true})
    this.fetchUpdateDangKyMon()
  }
  _renderRow(item) {
    return(
      <View style={{height:70,padding:10,width: Dimensions.get('window').width}}>
        <TouchableHighlight style={{flex:1}} onPress = {this._onClickItem.bind(this,item)}>
          <View style={{flexDirection:'row',flex:1}}>
            <View style={{flex:1,justifyContent:'center'}}><Text style={{width: (Dimensions.get('window').width - 20)/3,textAlign:'center'}}>{item.id}</Text></View>
            <View style={{flex:1,justifyContent:'center'}}><Text style={{width: (Dimensions.get('window').width - 20)/3,textAlign:'center'}}>{item.hoten}</Text></View>
            <View style={{flex:1,justifyContent:'center'}}><Text style={{width: (Dimensions.get('window').width - 20)/3,textAlign:'center'}}>{item.mssv}</Text></View>
            <View style={{flex:1,justifyContent:'center'}}><View style={{width: (Dimensions.get('window').width - 20)/3,alignItems:'center'}}><Image style={{width:30,height:30}} source={item.icon} /></View></View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
  refresh() {
    this.setState({refreshing:true})
    // this.fetchDataDanhSach()
    let monHoc = this.state.dsMonHoc.find((value) => {
      return value.tenMonHoc == this.state.selectedMon.tenMonHoc
    })
    this.setState({selectedMon: monHoc})
    this.fetchDataDangKyMon()
  }
  _onClickBack() {
    this.props.navigator.pop()
  }
  _renderItem() {
    return (this.state.dsMonHoc.map((value, index) => (<Picker.Item key={index} label={value.tenMonHoc} value={value.tenMonHoc}/>)))
  }
  fetchDataMon = async() => {
    fetch(`https://doantotnghiep.herokuapp.com/monHoc`, {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
      dulieu = []
      responseJson.map((value, index) => {
        dulieu.push(value)
      })
      console.log(JSON.stringify(dulieu))
      this.setState({dsMonHoc: dulieu, selectedMon: dulieu[0]})
      this.fetchDataDanhSach()
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient style={{flex:1}} colors={['#B7F8DB','#50A7C2']}>
        <View style={styles.toolbar}>
          <TouchableHighlight style={{
            height: 30,
            justifyContent: 'center'
          }} onPress={this._onClickBack.bind(this)} activeOpacity={75 / 100} underlayColor={"rgb(210,210,210)"}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableHighlight>
          <Text style={styles.toolbarTitle}>Đăng Ký Môn</Text>
            <TouchableHighlight style={{
              height: 30,
              justifyContent: 'center'
            }} onPress={this._onPressDangKyMon.bind(this)} activeOpacity={75 / 100} underlayColor={"rgb(210,210,210)"}>
              <Text style={styles.toolbarButton}>OK!</Text>
            </TouchableHighlight>
        </View>
        <View style={{flex:1,
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0)'
        }}>
          <View style={{
            flex:1
                    }}>
            <Picker selectedValue={this.state.selectedMon.tenMonHoc} onValueChange={(mon) => {
                let monHoc = this.state.dsMonHoc.find((value) => {
                  return value.tenMonHoc == mon
                })
                this.setState({selectedMon: monHoc,animating:true})
                this.fetchDataDangKyMon()
            }}>
              {this._renderItem()}
            </Picker>
            <FlatList style={{
              flex: 1
            }} data={this.state.dataSource} keyExtractor= {(x,i) => i} refreshing={this.state.refreshing} onRefresh= {() => this.refresh() } renderItem={({item}) => this._renderRow(item)}></FlatList>
          </View>
        </View>
        </LinearGradient>
        {this._renderLoadingView()}
      </View>
    )
  }
}
