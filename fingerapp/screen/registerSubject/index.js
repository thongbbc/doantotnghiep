import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList
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
import Modal from 'react-native-simple-modal';

import { allSubject } from '../../reducer/fetchDataReducer/index';

class RegisterSubjectScreen extends Component {
    constructor(props) {
        super(props)
        const date = new Date()
        this.state = {
            timeStart:'',
            timeEnd:'',
            dateStart:'',
            dateEnd:'',
            visibleModal:false,
            selectedSubject:''
        }
    }    
    componentDidMount() {
        this.props.fetchDataAllSubject()
        this.props.fetchDataAllStudent()        
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
        const {allSubject,allStudent} = this.props
        const {data} = allSubject
        const {visibleModal,selectedSubject} = this.state
        return(
            <View style = {{flex:1}}>
                <Header>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.goBack(null)
                    }}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style = {{flex:1,justifyContent:'center',alignItems:'center',paddingBottom:10}}
                    ><Text style = {{color:'white',fontSize:18}}>Register</Text></View>
                </Header>
                <View style = {{flex:1}}>
                <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
                    <View style = {{flex:1,paddingTop:20,alignItems:'center',justifyContent:'space-between'}}>
                        
                        <TouchableOpacity onPress = {()=>{
                            this.setState({visibleModal:true})}}>
                            <View style = {{width:width-40,height:40,backgroundColor:'rgba(255,255,255,0.2)',
                                borderRadius:20,justifyContent:'center',alignItems:'center'
                            }}>
                                <Text style = {{color:'white',fontSize:18,fontWeight:'500'}}>{selectedSubject}</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            selectedSubject?<FlatList
                            keyExtractor={item => item.id}
                            style = {{flex:1,top:30}}
                            ItemSeparatorComponent = {this.FlatListItemSeparator}
                            data={allStudent.data}
                            renderItem={({item,index}) =>
                                <View style = {{width,flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgba(255,255,255,0.2)',alignItems:'center'}}>
                                    <View style = {{flexDirection:'row'}}>
                                        <View style = {{width:60,height:60,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                                            <Text style = {{color:'white',fontSize:13,fontWeight:'bold'}}>{item.id}</Text>
                                        </View>
                                        <View style = {{paddingLeft:10,justifyContent:'center'}}>
                                            <Text style = {{backgroundColor:'transparent',marginBottom:5,fontSize:13,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>{item.hoten}</Text>
                                            <Text style = {{backgroundColor:'transparent',fontSize:10,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>MSSV:{item.mssv}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style = {{right:10,width:40,height:40,justifyContent:'center',alignItems:'center'}}>
                                        <View >
                                            <Entypo name="check" size={30} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            />:null
                        }
                    </View>
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
                        modalStyle={{
                            borderRadius: 2,
                            margin: 20,
                            padding: 10,
                            width:width-40,height:height/2,
                            backgroundColor: '#F5F5F5'
                        }}
                        disableOnBackPress={false}>
                        <View style = {{flex:1,height:500}}>
                            <FlatList
                            keyExtractor={item => item.tenMonHoc}
                            style = {{flex:1}}
                            ItemSeparatorComponent = {this.FlatListItemSeparator}
                            data={data}
                            renderItem={({item,index}) =>
                            <TouchableOpacity onPress = {()=>{this.setState({selectedSubject:item.tenMonHoc,visibleModal:false})}}>
                                <View style = {{width:width-40,flexDirection:'row',backgroundColor:'rgba(255,255,255,0.2)'}}>
                                    <View style = {{width:width/4,height:60,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                                        <Text style = {{color:'white',fontSize:13,fontWeight:'bold'}}>{item.tenMonHoc}</Text>
                                    </View>
                                    <View style = {{paddingLeft:10,justifyContent:'center'}}>
                                        <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Day of week: {item.thu}</Text>
                                        <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Date: {item.dateStart} - {item.dateEnd}</Text>
                                        <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Time: {item.timeStart} - {item.timeEnd}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            }
                            />
                        </View>
                    </Modal>
                    {Indicator(allSubject.isFetching && allStudent.isFetching)}
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
        fetchDataAllSubject: () => dispatch(fetchDataAllSubject()),
        fetchDataAllStudent: () => dispatch(fetchDataAllStudent())
        
    }
  }
export default connect (mapStateToProps,mapDispatchToProps)(RegisterSubjectScreen);