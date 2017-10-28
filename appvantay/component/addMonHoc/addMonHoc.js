import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  ListView,
  Alert,
  Picker,
  Animated,
  Keyboard,DatePickerAndroid,
  DatePickerIOS,
  TextInput,TimePickerAndroid,
  Dimensions,
  ActivityIndicatorIOS,
  FlatList,
  ProgressBarAndroid,
  Platform,
  ActivityIndicator
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'
import {LinearGradient} from 'expo'
import styles from './style'
export default class AddMonHoc extends Component {
  constructor(props) {
    super(props)
    this.springValue1 = new Animated.Value(1)
    this.springValue2 = new Animated.Value(1)
    this.springValue3 = new Animated.Value(1)
    this.springValue4 = new Animated.Value(1)

    dulieu = []
    thu = [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
    ]
    const dateNew = new Date()
    this.state = {
      them: '',
      animating: false,
      refreshing: false,
      dataSource: [],
      tenMonHoc: '',
      selectedThu: 'Mon',
      timeStart: dateNew,
      timeEnd: dateNew,
      startString: dateNew.getHours().toString()+':'+dateNew.getMinutes().toString(),
      endString: dateNew.getHours().toString()+':'+dateNew.getMinutes().toString(),
      dateStart: dateNew,
      dateEnd: dateNew,
      dateStartString:dateNew.getDate().toString()+'/'+(dateNew.getMonth()+1).toString()+'/'+dateNew.getFullYear().toString(),
      dateEndString:dateNew.getDate().toString()+'/'+(dateNew.getMonth()+1).toString()+'/'+dateNew.getFullYear().toString(),
      hideDatePicker:true,
      choose: true,
      hide: true
    }
  }
  spring1() {
    this.springValue1.setValue(0.3)
    Animated.spring(this.springValue1, {
      toValue: 1,
      friction: 2
    }).start()
  }
  spring2() {
    this.springValue2.setValue(0.3)
    Animated.spring(this.springValue2, {
      toValue: 1,
      friction: 2
    }).start()
  }
  spring3() {
    this.springValue3.setValue(0.3)
    Animated.spring(this.springValue3, {
      toValue: 1,
      friction: 2
    }).start()
  }
  spring4() {
    this.springValue4.setValue(0.3)
    Animated.spring(this.springValue4, {
      toValue: 1,
      friction: 2
    }).start()
  }
  componentDidMount() {}
  //getAll ID student
  fetchData = async() => {
    fetch(`https://doantotnghiep.herokuapp.com/saveMonHoc/?tenmonhoc=${this.state.tenMonHoc}&timestart=${this.state.startString}&timeend=${this.state.endString}&thu=${this.state.selectedThu}&datestart=${this.state.dateStartString}&dateend=${this.state.dateEndString}`, {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status == 'OK') {
        Alert.alert("Add Môn Học Thành Công");
      } else {
        Alert.alert("ERROR (Lỗi)");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  _renderItem() {
    return (thu.map((value, index) => (<Picker.Item key={index} label={value} value={value}/>)))
  }
  _onClickBack() {
    this.props.navigator.pop()
  }
  onDateChange(date) {
    const {choose: luachon} = this.state
    if (luachon == true) {
      this.setState({
        timeStart: date,
        startString: date.getHours().toString() + ':' + (date.getMinutes()).toString()
      });
    } else {
      this.setState({
        timeEnd: date,
        endString: date.getHours().toString() + ':' + (date.getMinutes()).toString()
      });
    }
  }
  onDatePickerChange(date) {
    const {choose: luachon} = this.state
    if (luachon == true) {
      this.setState({
        dateStart: date,
        dateStartString: date.getDate().toString() + '/' + (date.getMonth()+1).toString()+"/"+(date.getFullYear()).toString()
      });
    } else {
      this.setState({
        dateEnd: date,
        dateEndString: date.getDate().toString() + '/' + (date.getMonth()+1).toString()+"/"+(date.getFullYear()).toString()
      });
    }
  }
  onClickAddMonHoc() {
    const {dateStartString,dateEndString,tenMonHoc,startString,endString} = this.state
    if (dateStartString!='' && dateEndString!='' && tenMonHoc!='' && startString!='' && endString!='') {
      this.fetchData()
    } else {
      alert("PLEASE PRESS FULL INFORMATION")
    }
  }
  _onPressHideDatePicker() {
    this.setState({hide: true,hideDatePicker:true})
  }
  //Hiển thị DatePickerIOS
  checkHide() {
    const {hide: hide} = this.state
    if (hide == false) {
      if (Platform.OS == 'ios') {
        return (
          <View style={{
            position: 'absolute',
            height: Dimensions.get('window').height,
            justifyContent: 'flex-end'
          }}>
            <View style={{
              flex: 1
            }}>
              <TouchableHighlight onPress={this._onPressHideDatePicker.bind(this)} style={{
                flex: 1
              }}>
                <View style={{
                  flex: 1
                }}></View>
              </TouchableHighlight>
            </View>
            <View style={{
              backgroundColor: 'white',
              height: null
            }}>
              <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: Dimensions.get('window').width,
                height: 30,
                backgroundColor: '#D2D5DA'
              }}>
                <TouchableHighlight onPress={this._onPressHideDatePicker.bind(this)} style={{
                  marginLeft: 5,
                  justifyContent: 'center',
                  height: 30
                }}>
                  <Text style={{
                    fontSize: 15,
                    color: 'blue'
                  }}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressHideDatePicker.bind(this)} style={{
                  marginRight: 5,
                  justifyContent: 'center',
                  height: 30
                }}>
                  <Text style={{
                    fontSize: 15,
                    color: 'blue'
                  }}>OK</Text>
                </TouchableHighlight>
              </View>
              <View>
                <DatePickerIOS date={this.state.choose == true
                  ? this.state.timeStart
                  : this.state.timeEnd} mode="time" timeZoneOffsetInMinutes={7 * 60} onDateChange={(date) => this.onDateChange(date)}/>
              </View>
            </View>
          </View>
        )
      } else {
        if (this.state.choose == true) {
          this.openDatePickerAndroid(true)
        } else {
          this.openDatePickerAndroid(false)
        }
      }
    }
  }
  checkDate() {
    const {hideDatePicker} = this.state
    if (hideDatePicker == false) {
      if (Platform.OS == 'ios') {
        return (
          <View style={{
            position: 'absolute',
            height: Dimensions.get('window').height,
            justifyContent: 'flex-end'
          }}>
            <View style={{
              flex: 1
            }}>
              <TouchableHighlight onPress={this._onPressHideDatePicker.bind(this)} style={{
                flex: 1
              }}>
                <View style={{
                  flex: 1
                }}></View>
              </TouchableHighlight>
            </View>
            <View style={{
              backgroundColor: 'white',
              height: null
            }}>
              <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: Dimensions.get('window').width,
                height: 30,
                backgroundColor: '#D2D5DA'
              }}>
                <TouchableHighlight onPress={this._onPressHideDatePicker.bind(this)} style={{
                  marginLeft: 5,
                  justifyContent: 'center',
                  height: 30
                }}>
                  <Text style={{
                    fontSize: 15,
                    color: 'blue'
                  }}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressHideDatePicker.bind(this)} style={{
                  marginRight: 5,
                  justifyContent: 'center',
                  height: 30
                }}>
                  <Text style={{
                    fontSize: 15,
                    color: 'blue'
                  }}>OK</Text>
                </TouchableHighlight>
              </View>
              <View>
                <DatePickerIOS date={this.state.choose == true
                  ? this.state.dateStart
                  : this.state.dateEnd} mode="date" timeZoneOffsetInMinutes={7 * 60} onDateChange={(date) => this.onDatePickerChange(date)}/>
              </View>
            </View>
          </View>
        )
      } else {
        if (this.state.choose == true) {
          this.openDatePickerAndroid2(true)
        } else {
          this.openDatePickerAndroid2(false)
        }
      }
    }
  }
  async openDatePickerAndroid2(check) {
    k = new Date()
    if (check == true){
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date(2020, 4, 25)

            });
            if (action === DatePickerAndroid.dateSetAction) {
              k.setDate(date.getDate())
              k.setMonth(date.getMonth())
              k.setFullYear(date.getFullYear())
              this.setState({hideDatePicker:true,dateStartString:k.getDate()+'/'+(k.getMonth()+1)+'/'+
                k.getFullYear(),dateStart:k})
            } else if (action === DatePickerAndroid.dismissedAction) {

            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    } else {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date(2020, 4, 25)

            });
            if (action === DatePickerAndroid.dateSetAction) {
              k.setDate(date.getDate())
              k.setMonth(date.getMonth())
              k.setFullYear(date.getFullYear())
              this.setState({hideDatePicker:true,dateEndString:k.getDate()+'/'+(k.getMonth()+1)+'/'+
                k.getFullYear(),dateEnd:k})
            } else if (action === DatePickerAndroid.dismissedAction) {

            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    }
  }
  async openDatePickerAndroid(check) {
    k = new Date()
    if (check == true){
      try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 14,
              minute: 0,
              is24Hour: true, // Will display '2 PM'
            });
            if (action === TimePickerAndroid.timeSetAction) {
              k.setHours(hour,minute,0)
              this.setState({hide:true,startString:k.getHours()+':'+k.getMinutes(),timeStart:k})
            } else if (action === TimePickerAndroid.dismissedAction) {

            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    } else {
      try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 14,
              minute: 0,
              is24Hour: true, // Will display '2 PM'
            });
            if (action == TimePickerAndroid.timeSetAction) {
              k.setHours(hour,minute,0)
              this.setState({hide:true,endString:k.getHours()+':'+k.getMinutes(),timeEnd:k})
            }
            else if (action == TimePickerAndroid.dismissedAction) {

           }
          //  this.setState({endString:k.getHours+':'+k.getMinutes,timeEnd:k})
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    }
  }
  onPressTimeStart() {
    console.log("Click timeSTART")
    this.setState({hide: false, choose: true})
    Keyboard.dismiss()
    this.spring1()
  }
  onPressTimeEnd() {
    this.setState({hide: false, choose: false})
    Keyboard.dismiss()
    this.spring2()
  }
  _onPressDateStart() {
    this.setState({hideDatePicker: false, choose: true})
    Keyboard.dismiss()
    this.spring3()
  }
  onPressDateEnd() {
    this.setState({hideDatePicker: false, choose: false})
    Keyboard.dismiss()
    this.spring4()
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient style={{flex:1}} colors = {['#B7F8DB','#50A7C2']}>
        <View style={styles.toolbar}>
          <TouchableHighlight style={{
            height: 30,
            justifyContent: 'center'
          }} onPress={this._onClickBack.bind(this)} activeOpacity={75 / 100} underlayColor={"rgb(210,210,210)"}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableHighlight>
          <Text style={styles.toolbarTitle}>ADD MON HOC</Text>
          <TouchableHighlight style={{
            height: 30,
            justifyContent: 'center'
          }} onPress={this.onClickAddMonHoc.bind(this)} activeOpacity={75 / 100} underlayColor={"rgb(210,210,210)"}>
            <Text style={styles.toolbarButton}>Add</Text>
          </TouchableHighlight>
        </View>
        <View style={{
          flex: 1,backgroundColor:"rgba(0,0,0,0)",
          alignItems: 'center'
        }}>
          <View style={{
            marginTop: 20
          }}>
            {Platform.OS == 'ios'
              ? <TextInput onChangeText={(value) => {
                  this.setState({tenMonHoc: value})
                }} style={{
                  fontWeight: 'bold',
                  borderRadius:20,
                  fontSize: 13,
                  paddingLeft:10,
                  paddingTop:5,paddingRight:5,paddingBottom:5,
                  width: Dimensions.get('window').width - 60,
                  height: (Dimensions.get('window').height / 2 - 90) / 6,
                  backgroundColor: "rgba(255,255,255,0.5)",
                  color: "black"
                }} underlineColorAndroid={"transparent"} placeholder={'Tên Môn Học'} placeholderTextColor={"rgba(0,0,0,0.5)"}/>
              : <TextInput onChangeText={(value) => {
                this.setState({tenMonHoc: value})
              }} style={{
                fontWeight: 'bold',
                width: Dimensions.get('window').width - 60,
                padding: 5,
                fontSize: 13,
                borderRadius:20,
                backgroundColor: 'transparent',
                height: (Dimensions.get('window').height / 2 - 90) / 6,
                backgroundColor: "rgba(255,255,255,0.5)",
                color: "black"
              }} underlineColorAndroid={"transparent"} placeholder={'Tên Môn Học'} placeholderTextColor={"rgba(0,0,0,0.5)"}/>}
          </View>
          <View style={{
            marginTop: 10,
            height: null,
            width: Dimensions.get('window').width
          }}>
            <Text style={{
              left: 30,
              width: Dimensions.get('window').width,
              backgroundColor:'transparent',
              textAlign: 'left',
              fontSize: 12,paddingTop:10,paddingBottom:10,
              fontWeight: 'bold'
            }}>Time Start & Date Start</Text>
            <View style={{
              width: Dimensions.get('window').width,flexDirection:'row',
              alignItems: 'center',justifyContent:'center'
            }}>
              {Platform.OS == 'ios'
                ? <Animated.Text onPress={this.onPressTimeStart.bind(this)} style={{
                    transform: [
                      {
                        scale: this.springValue1
                      }
                    ],
                    fontWeight: 'bold',
                    padding: 5,
                    fontSize: 13,right:10,
                    borderRadius:20,
                    width: (Dimensions.get('window').width - 60-5)/2,
                    height: (Dimensions.get('window').height / 2 - 90) / 6,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "black"
                  }} underlineColorAndroid={"transparent"}>{this.state.timeStart.getHours().toString()}:{(this.state.timeStart.getMinutes()).toString()}</Animated.Text>
                : <Animated.Text onPress={this.onPressTimeStart.bind(this)} style={{
                  transform: [
                    {
                      scale: this.springValue1
                    }
                  ],
                  fontWeight: 'bold',
                  width: (Dimensions.get('window').width - 60-5)/2,
                  padding: 5,
                  borderRadius:20,right:10,
                  fontSize: 13,
                  backgroundColor: 'transparent',
                  height: (Dimensions.get('window').height / 2 - 90) / 6,
                  backgroundColor: "rgba(255,255,255,0.5)",
                  color: "black"
                }} underlineColorAndroid={"transparent"}>{this.state.timeStart.getHours().toString()}:{(this.state.timeStart.getMinutes()).toString()}</Animated.Text>}

                {Platform.OS == 'ios'
                  ? <Animated.Text onPress={this._onPressDateStart.bind(this)} style={{
                      transform: [
                        {
                          scale: this.springValue3
                        }
                      ],
                      fontWeight: 'bold',
                      padding: 5,
                      fontSize: 13,
                      borderRadius:20,
                      width: (Dimensions.get('window').width - 60)/2,
                      height: (Dimensions.get('window').height / 2 - 90) / 6,
                      backgroundColor: "rgba(255,255,255,0.5)",
                      color: "black"
                    }} underlineColorAndroid={"transparent"}>{this.state.dateStart.getDate().toString()}/{(this.state.dateStart.getMonth()+1).toString()}/{(this.state.dateStart.getFullYear()).toString()}</Animated.Text>
                  : <Animated.Text onPress={this._onPressDateStart.bind(this)} style={{
                    transform: [
                      {
                        scale: this.springValue3
                      }
                    ],
                    fontWeight: 'bold',
                    width: (Dimensions.get('window').width - 60)/2,
                    padding: 5,
                    borderRadius:20,
                    fontSize: 13,
                    backgroundColor: 'transparent',
                    height: (Dimensions.get('window').height / 2 - 90) / 6,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "black"
                  }} underlineColorAndroid={"transparent"}>{this.state.dateStart.getDate().toString()}/{(this.state.dateStart.getMonth()+1).toString()}/{(this.state.dateStart.getFullYear()).toString()}</Animated.Text>
              }
            </View>
            <Text style={{
              left: 30,
              width: Dimensions.get('window').width,
              textAlign: 'left',
              backgroundColor:'transparent',
              fontSize: 12,paddingTop:10,paddingBottom:10,
              fontWeight: 'bold'
            }}>Time End & Date End</Text>
            <View style={{
              width: Dimensions.get('window').width,
              alignItems: 'center',
            }}>
            <View style={{width:Dimensions.get('window').width,flexDirection:'row',justifyContent:'center',
            alignItems:'center'}}>
              {Platform.OS == 'ios'
                ? <Animated.Text onPress={this.onPressTimeEnd.bind(this)} style={{
                    transform: [
                      {
                        scale: this.springValue2
                      }
                    ],
                    fontWeight: 'bold',
                    padding: 5,
                    borderRadius:20,right:10,
                    fontSize: 13,
                    width: (Dimensions.get('window').width - 60 -5)/2,
                    height: (Dimensions.get('window').height / 2 - 90) / 6,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "black"
                  }} underlineColorAndroid={"transparent"}>{this.state.timeEnd.getHours().toString()}:{(this.state.timeEnd.getMinutes()).toString()}</Animated.Text>
                : <Animated.Text onPress={this.onPressTimeEnd.bind(this)} style={{
                  transform: [
                    {
                      scale: this.springValue2
                    }
                  ],
                  fontWeight: 'bold',
                  width: (Dimensions.get('window').width - 60 -5)/2,
                  padding: 5,
                  fontSize: 13,
                  borderRadius:20,right:10,
                  backgroundColor: 'transparent',
                  height: (Dimensions.get('window').height / 2 - 90) / 6,
                  backgroundColor: "rgba(255,255,255,0.5)",
                  color: "black"
                }} underlineColorAndroid={"transparent"}>{this.state.timeEnd.getHours().toString()}:{(this.state.timeEnd.getMinutes()).toString()}</Animated.Text>}


                {Platform.OS == 'ios'
                  ? <Animated.Text onPress={this.onPressDateEnd.bind(this)} style={{
                      transform: [
                        {
                          scale: this.springValue4
                        }
                      ],
                      fontWeight: 'bold',
                      padding: 5,
                      borderRadius:20,
                      fontSize: 13,
                      width: (Dimensions.get('window').width - 60 -5)/2,
                      height: (Dimensions.get('window').height / 2 - 90) / 6,
                      backgroundColor: "rgba(255,255,255,0.5)",
                      color: "black"
                    }} underlineColorAndroid={"transparent"}>{this.state.dateEnd.getDate().toString()}/{(this.state.dateEnd.getMonth()+1).toString()}/{this.state.dateEnd.getFullYear().toString()}</Animated.Text>
                  : <Animated.Text onPress={this.onPressDateEnd.bind(this)} style={{
                    transform: [
                      {
                        scale: this.springValue4
                      }
                    ],
                    fontWeight: 'bold',
                    width: (Dimensions.get('window').width - 60 -5)/2,
                    padding: 5,
                    fontSize: 13,
                    borderRadius:20,
                    backgroundColor: 'transparent',
                    height: (Dimensions.get('window').height / 2 - 90) / 6,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "black"
                  }} underlineColorAndroid={"transparent"}>{this.state.dateEnd.getDate().toString()}/{(this.state.dateEnd.getMonth()+1).toString()}/{this.state.dateEnd.getFullYear().toString()}</Animated.Text>
              }
                </View>
                <View style={{width: Dimensions.get('window').width - 60}}>
                  <Picker selectedValue={this.state.selectedThu} onValueChange={(thu) => this.setState({selectedThu: thu})}>
                    {this._renderItem()}
                  </Picker>
                </View>
            </View>

          </View>
        </View>
        </LinearGradient>
        {this.checkHide()}
        {this.checkDate()}
      </View>
    );
  }
}
