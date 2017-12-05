import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList
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

import { allSubject } from '../../reducer/fetchDataReducer/index';

class AddSubjectScreen extends Component {
    constructor(props) {
        super(props)
        const date = new Date()
        this.state = {
            timeStart:'',
            timeEnd:'',
            dateStart:'',
            dateEnd:'',
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
                <View style = {{flex:1}}>
                <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
                    <View style = {{flex:1,paddingTop:20,alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                        <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                            fontWeight:'400',padding:10
                        }}>NAME</Text>
                        <TextInput 
                            placeholderTextColor={'rgba(255,255,255,0.5)'}
                            placeholder = {'Name Subject'}
                        style = {{textAlign:'center',width: width-40,marginBottom:10,backgroundColor:'rgba(255,255,255,0.1)',
                            height:40,borderRadius:20
                        }}/>
                        <Text style = {{color:'white',backgroundColor:'transparent',textAlign:'left',
                            fontWeight:'400',padding:10
                        }}>DATE</Text>
                        <DatePicker
                            style={{width: width-40,marginBottom:10}}
                            date={this.state.dateStart}
                            mode="date"
                            placeholder="Start"
                            format="DD-MM-YYYY"
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
                            format="DD-MM-YYYY"
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
                        <TouchableOpacity>
                            <View style = {{width:width-40,height:40,borderRadius:20,borderWidth:1,
                            borderColor:'white',backgroundColor:'#EE341E',marginBottom:50,
                            justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontSize:25,fontWeight:'bold'}}>+</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </LinearGradient>
                </View>
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