import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList,Alert,TouchableWithoutFeedback,Keyboard
    , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo,Foundation,MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from '../../helperScreen'
import {connect} from 'react-redux';
import {fetchDataAllSubject,fetchDataAllStudent} from '../../actions/fetchData'
import Header from '../../component/header'
import Indicator from '../../component/indicator'
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-simple-modal';

import { allSubject } from '../../reducer/fetchDataReducer/index';
var qs = require('qs');
import axios from 'axios'
class AddSubjectScreen extends Component {
    FlatListItemSeparator = () => {
        return (
        <View
            style={{
            height: 1,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            }}
        />
        );
    }
    constructor(props) {
        super(props)
        const date = new Date()
        this.state = {
            timeStart:'',
            timeEnd:'',
            dateStart:'',
            dateEnd:'',
            name:'',
            selectedDayOfWeek:0,
            visibleModal:false
        }
    }    
    componentDidMount() {
    }

    FlatListItemSeparator = () => {
        return (
        <View
            style={{
            height: 1,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            }}
        />
        );
    }
    render() {
        const currentTime = new Date()
        const {allSubject} = this.props
        const {name,dateStart,dateEnd,timeStart,timeEnd,selectedDayOfWeek,visibleModal} = this.state
        const {data} = allSubject
        const dayOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        
        return(
            <View style = {{flex:1}}>
                <Header>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.goBack(null)
                    }}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style = {{flex:1,justifyContent:'center',alignItems:'center',paddingBottom:10}}
                    ><Text style = {{color:'white',fontSize:18}}>Add subject</Text></View>
                </Header>
                <TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
                <View style = {{flex:1}}>
                <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
                    <View style = {{flex:1,paddingTop:20,alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                        <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                            fontWeight:'400',padding:10
                        }}>NAME</Text>
                        <TextInput 
                            onChangeText = {(text)=>{this.setState({name:text})}}
                            placeholderTextColor={'rgba(255,255,255,0.5)'}
                            placeholder = {'Name Subject'}
                        style = {{color:'white',textAlign:'center',width: width-40,marginBottom:10,backgroundColor:'rgba(255,255,255,0.1)',
                            height:40,borderRadius:20
                        }}/>
                        <View style = {{marginBottom:10,flexDirection:'row',alignItems:'center'}}>
                            <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                                fontWeight:'400',padding:10
                            }}>DATE</Text>
                            <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                                fontWeight:'400',paddingTop:10,paddingBottom:10
                            }}>-</Text>
                            <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                                fontWeight:'400',padding:10
                            }}>DAYOFWEEK:</Text>
                            <TouchableOpacity
                                onPress = {()=>this.setState({visibleModal:true})}
                            >
                                <View style = {{height:30,backgroundColor:'rgba(255,255,255,0.3)'
                                ,flexDirection:'row',borderRadius:20,
                                    alignItems:'center',padding:10
                                }}>
                                    <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                                    fontWeight:'400',padding:5,fontSize:17}}>{dayOfWeek[selectedDayOfWeek]}</Text>
                                    <Entypo name="select-arrows" size={20} color={'white'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <DatePicker
                            style={{width: width-40,marginBottom:10}}
                            date={this.state.dateStart}
                            mode="date"
                            placeholder="Start"
                            format="DD/MM/YYYY"
                            minDate={`${currentTime.getFullYear()-1}-01-01`}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({dateStart: date})}}
                        />
                        <DatePicker
                            style={{width: width-40,marginBottom:10}}
                            date={this.state.dateEnd}
                            mode="date"
                            placeholder="End"
                            format="DD/MM/YYYY"
                            minDate={`${currentTime.getFullYear()-1}-01-01`}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({dateEnd: date})}}
                        />
                        <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                            fontWeight:'400',padding:10
                        }}>TIME</Text>
                        <DatePicker
                            style={{width: width-40,marginBottom:10}}
                            date={this.state.timeStart}
                            mode="time"
                            placeholder="Start"
                            format="HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({timeStart: date})}}
                        />
                        <DatePicker
                            style={{width: width-40}}
                            date={this.state.timeEnd}
                            mode="time"
                            placeholder="End"
                            format="HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({timeEnd: date})}}
                        />
                        </View>
                        <TouchableOpacity
                            onPress = {()=>{
                                if (timeStart!=''&&timeEnd!=''&&dateStart!=''&&dateEnd!=''&&name!='') {
                                    Alert.alert(
                                        'Are you sure?',
                                        `Add Subject ${name}`,
                                        [
                                            {text: 'Cancel', onPress: () => {}},
                                            {text: 'OK', onPress: () => {
                                                const json = {
                                                    timestart:timeStart,
                                                    timeend:timeEnd,
                                                    datestart:dateStart,
                                                    thu:dayOfWeek[selectedDayOfWeek],
                                                    dateend:dateEnd,
                                                    tenmonhoc:name,
                                                }
                                                axios.post('https://doantotnghiep.herokuapp.com/addMonHoc',qs.stringify(json))
                                                .then(response => {
                                                    if (response.data.status == 'OK') {
                                                        alert("ADD SUCCESS")
                                                    } else {
                                                        alert("ADD FAILED")
                                                    }
                                                })
                                                .catch(error => {
                                                console.log(error);
                                                    alert("ADD FAILED")
                                                });
                                            }},
                                        ],
                                        { cancelable: true }
                                    )
                                }
                            }}
                        >
                            <View style = {{width:width-40,height:40,borderRadius:20,borderWidth:1,
                            borderColor:'white',backgroundColor:'#EE341E',marginBottom:50,
                            justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontSize:25,fontWeight:'bold'}}>+</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </LinearGradient>
                </View>
                </TouchableWithoutFeedback>
                <Modal
                        modalDidOpen={() => null}                                
                        modalDidClose={() => {
                            this.setState({visibleModal: false})}}
                        open={visibleModal}
                        offset={0}
                        overlayBackground={'rgba(0, 0, 0, 0.5)'}
                        animationDuration={200}
                        animationTension={40}
                        closeOnTouchOutside={true}
                        containerStyle={{
                            justifyContent: 'center'
                        }}
                        style = {{alignItems:'center'}}
                        modalStyle={{
                            borderRadius: 10,
                            margin: 50,
                            padding: 10,
                            width:width-100,height:height/2,
                            backgroundColor: '#F5F5F5'
                        }}
                        disableOnBackPress={false}>
                        <View style = {{width:width-120,height:30,
                        alignItems:'center',justifyContent:'center'}}><Text
                            style = {{fontWeight:'bold',fontSize:18,color:'rgba(0,0,0,0.5)'}}
                        >DAY OF WEEK</Text></View>
                        <FlatList
                            keyExtractor={item => item}
                            style = {{flex:1}}
                            ItemSeparatorComponent = {this.FlatListItemSeparator}
                            data={dayOfWeek}
                            renderItem={({item,index}) =>
                                <TouchableOpacity
                                    onPress = {() => {
                                        this.setState({selectedDayOfWeek:index,visibleModal:false})
                                    }}
                                >
                                    <View style = {{backgroundColor:'rgba(0,0,0,0.4)',justifyContent:'center',alignItems:'center',width:width-120,height:50}}>
                                        <Text style = {{fontSize:19,color:'white',fontWeight:'500'}}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            }/>
                        <TouchableOpacity
                            onPress = {() => {this.setState({visibleModal:false})}}
                        ><View style = {{width:width-120,height:40,marginTop:5,backgroundColor:'red',
                        alignItems:'center',justifyContent:'center'
                        }}><Text style = {{fontWeight:'bold',color:'white'}}>Cancel</Text></View></TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        animating:state.animatingDrawer,
        allStudent:state.allStudent,
        allSubject:state.allSubject
    }
};

function mapDispatchToProps (dispatch) {
    return {
        fetchDataAllSubject: () => dispatch(fetchDataAllSubject())
    }
  }
export default connect (mapStateToProps,mapDispatchToProps)(AddSubjectScreen);