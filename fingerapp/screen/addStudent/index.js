import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList,Alert,Keyboard,TouchableWithoutFeedback
    , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo,Foundation,MaterialIcons, FontAwesome ,MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from '../../helperScreen'
import {connect} from 'react-redux';
import {fetchDataAllSubject,fetchDataAllStudent} from '../../actions/fetchData'
import Header from '../../component/header'
import Indicator from '../../component/indicator'
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import { allSubject } from '../../reducer/fetchDataReducer/index';
var qs = require('qs');

class AddStudentScreen extends Component {
    constructor(props) {
        super(props)
        const date = new Date()
        this.state = {
            mssv:'',
            id:'',
            name:'',
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
        const {data} = allSubject
        const {mssv,name,id} = this.state
        return(
            <View style = {{flex:1}}>
                <Header>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.goBack(null)
                    }}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style = {{flex:1,justifyContent:'center',alignItems:'center',paddingBottom:10}}
                    ><Text style = {{color:'white',fontSize:18}}>Add student</Text></View>
                </Header>
                <TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
                <View style = {{flex:1}}>
                <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
                    <View style = {{flex:1,paddingTop:20,alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                            <View style = {{paddingLeft:20,flexDirection:'row',width:width-40,height:40,marginBottom:10,backgroundColor:'rgba(255,255,255,0.1)',
                                borderRadius:20,alignItems:'center'}}>
                                <MaterialIcons name="person" size={30} color="rgba(255,255,255,0.6)" />
                                <TextInput
                                onChangeText = {(text)=>{this.setState({name:text})}}
                                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                                    placeholder = {'Name student'}
                                style = {{flex:1,paddingLeft:20,width:width-40-30,paddingRight:10}}/>
                            </View>
                            <View style = {{paddingLeft:20,flexDirection:'row',width:width-40,height:40,marginBottom:10,backgroundColor:'rgba(255,255,255,0.1)',
                                borderRadius:20,alignItems:'center'}}>
                                <MaterialCommunityIcons name="matrix" size={30} color="rgba(255,255,255,0.6)" />
                                <TextInput
                                    keyboardType = {'numeric'}
                                    onChangeText = {(text)=>{this.setState({mssv:text})}}
                                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                                    placeholder = {'MSSV'}
                                style = {{flex:1,width:width-40-30,paddingLeft:20,paddingRight:10}}/>
                            </View>
                            <View style = {{paddingLeft:20,flexDirection:'row',width:width-40,height:40,marginBottom:10,backgroundColor:'rgba(255,255,255,0.1)',
                                borderRadius:20,alignItems:'center'}}>
                                <MaterialCommunityIcons name="matrix" size={30} color="rgba(255,255,255,0.6)" />
                                <TextInput
                                    keyboardType = {'numeric'}
                                    onChangeText = {(text)=>{this.setState({id:text})}}
                                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                                    placeholder = {'ID'}
                                style = {{flex:1,paddingLeft:20,width:width-40-30,paddingRight:10}}/>
                            </View>
                        </View>
                        <TouchableOpacity onPress = {()=>{
                            if (id != '' && name != '' && mssv != '') {
                                Alert.alert(
                                    'Are you sure?',
                                    `Add Student ${name} for Id ${id}`,
                                    [
                                        {text: 'Cancel', onPress: () => {}},
                                        {text: 'OK', onPress: () => {
                                            const json = {
                                                id,hoten:name,mssv
                                            }
                                            axios.post('https://doantotnghiep.herokuapp.com/saveSV/',qs.stringify(json))
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
                                
                            } else {
                                alert("PLEASE PRESS FULL INFORMATION")
                            }
                        }}>
                        <View style = {{width:width-40,height:40,marginBottom:20,backgroundColor:'transparent',
                            borderRadius:20,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                            <Entypo name="check" size={30} color="#7ECD4D" />
                        </View>
                        </TouchableOpacity>


                    </View>
                </LinearGradient>
                </View>
                </TouchableWithoutFeedback>
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
export default connect (mapStateToProps,mapDispatchToProps)(AddStudentScreen);