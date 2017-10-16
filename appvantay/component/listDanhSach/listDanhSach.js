import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ListView,
  TextInput,
  Dimensions,
  ActivityIndicatorIOS,
  FlatList,
  ProgressBarAndroid,
  Platform,
  ActivityIndicator
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'
import sampleSize from 'lodash/sampleSize'
import allGradients from '../../gradients.json'
import {LinearGradient} from 'expo'
import styles from './style'
export default class ListDanhSach extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    dulieu = [];
    this.state = {
      dataSource: [],
      them: [],
      animating: true,
      refreshing: false,
      gradients: []
    }

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
  _onClickBack() {
    this.props.navigator.pop()
  }
  _onPress(data)
  {
    this.props.navigator.push({
      name: "detailInfo",
      duLieu: {
        'id': data.id,
        'hoten': data.hoten
      }
    })
  }
  _onChange(value) {
    this.setState({them: value})
  }
  fetchData = async() => {
    fetch('https://doantotnghiep.herokuapp.com/allData1', {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
      this.setState({
        gradients: sampleSize(allGradients, responseJson.length)
      })
      dulieu = []
      for (i = 0; i < responseJson.length; i++) {
        gradient = this.state.gradients
        responseJson[i].color = gradient[i].colors
      }
      console.log(JSON.stringify(responseJson))

      this.setState({them: responseJson})
      this.state.them.map(function(value) {
        dulieu.push(value)
      })
      this.setState({dataSource: dulieu, animating: false, refreshing: false});
    }).catch((error) => {
      console.error(error);
    });
  }
  componentDidMount() {
    this.fetchData()
  }
  refresh() {
    this.setState({refreshing: true})
    this.fetchData()
  }
  _renderItem(item) {
    return (
      <View style={{
        height: 60,
        width: null,backgroundColor:'transparent',
        alignItems: 'center'
      }}>
        <LinearGradient style={{
          width: Dimensions.get('window').width - 10,
          height: 50,backgroundColor:'transparent',
          borderRadius: 10
        }} colors={item.color}>
          <TouchableHighlight onPress={this._onPress.bind(this,item)} style={{
            flex: 1,
            borderRadius: 10
          }}>
            <View style={{
              height: 50,
              backgroundColor: "rgba(255,255,255,0.5)",
              borderRadius:10,
              alignItems: 'center',
              width: null,
              flex: 1,
              flexDirection: 'row',
            }}>
              <View style={{
                flex: 1,
                left: 20,backgroundColor:'transparent',
                alignItems: 'flex-start'
              }}>
                <Text style={{
                  textAlign: 'center'
                }}>{item.id}</Text>
              </View>
              <View style={{
                flex: 3,
                alignItems: 'center'
              }}>
                <Text style={{
                  textAlign: 'center'
                }}>{item.hoten}</Text>
              </View>
              <View style={{
                flex: 2
              }}>
                <Text style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>{item.mssv}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </LinearGradient>
        <View style={{
          width: Dimensions.get('window').width,
          height: 10
        }}></View>
      </View>
    )
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
          <Text style={styles.toolbarTitle}>Danh Sách</Text>
          <Text style={styles.toolbarButton}>   </Text>
        </View>
        <View style={{
          height: 50,backgroundColor:'rgba(0,0,0,0.2)',
          flexDirection: 'row'
        }}>
          <View style={{
            left: 20,
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'white',
              textAlign: 'center',
              backgroundColor:'transparent',
              fontWeight: 'bold',
              fontSize: 20
            }}>ID</Text>
          </View>
          <View style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              backgroundColor:'transparent'
            }}>NAME</Text>
          </View>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor:'transparent',
              fontSize: 20
            }}>MSSV</Text>
          </View>
        </View>
        <FlatList style={{
          marginTop:5,
          flex: 1
        }} data={this.state.dataSource} keyExtractor= {(x,i) => i} refreshing={this.state.refreshing} onRefresh= {() => this.refresh() } renderItem={({item}) => this._renderItem(item)}></FlatList>
        </LinearGradient>
        {this._renderLoadingView()}
      </View>
    );
  }
}
