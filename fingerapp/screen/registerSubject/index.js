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
import {fetchDataAllSubject,fetchDataAllStudent,fetchDataRegisterSubject,changeCheck,} from '../../actions/fetchData'
import Header from '../../component/header'
import Indicator from '../../component/indicator'
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-simple-modal';
import {sendRegisterSubject,sendRemoveRegisterSubject} from '../../api/registerSubject'
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
            selectedSubject:'Click for select a subject'
        }
    }    
    componentDidMount() {
        this.props.fetchDataAllSubject()
        // this.props.fetchDataAllStudent()        
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
        const {allSubject,allStudent,getRegisterSubjectData,changeCheck} = this.props
        const {data} = allSubject
        const {visibleModal,selectedSubject} = this.state
        return(
            <View style = {{flex:1}}>
                <Header>
                    <TouchableOpacity onPress = {()=>{
                        this.setState({selectedSubject:'Click for select a subject'})
                        this.props.navigation.goBack(null)
                    }}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style = {{flex:1,justifyContent:'center',alignItems:'center',paddingBottom:10}}
                    ><Text style = {{color:'white',fontSize:18}}>Register</Text></View>
                    
                    <TouchableOpacity onPress = {(getRegisterSubjectData.data.length!=0&&selectedSubject!='Click for select a subject')?
                    ()=>{
                            var data = []
                            getRegisterSubjectData.data.map((value)=> {
                                if (value.check) {
                                    data.push(value)
                                }
                            })
                            sendRemoveRegisterSubject(selectedSubject).then(()=>{
                                sendRegisterSubject(data).then((message)=>{
                                    alert(message)
                                }).catch((error)=> {
                                    alert('ERROR')
                                })
                            }).catch((error) => {
                                alert('ERROR')
                            })
                    }:null}>
                        <Foundation name="save" size={30} color={(getRegisterSubjectData.data.length!=0&&selectedSubject!='Click for select a subject')?
                        "white":'black'} />
                    </TouchableOpacity>
                </Header>
                <View style = {{flex:1}}>
                <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
                    <View style = {{flex:1,paddingTop:20,alignItems:'center',justifyContent:'space-between'}}>
                        
                        <TouchableOpacity onPress = {()=>{
                            this.setState({visibleModal:true})}}>
                            <View style = {{width:width-40,height:40,backgroundColor:'rgba(255,255,255,0.2)',
                                borderRadius:20,borderWidth:1,borderColor:'white',justifyContent:'center',alignItems:'center'
                            }}>
                                <Text style = {{color:'white',fontSize:18,fontWeight:'500'}}>{selectedSubject}</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            selectedSubject!='Click for select a subject'?<FlatList
                            keyExtractor={item => item.id}
                            style = {{flex:1,top:30}}
                            ItemSeparatorComponent = {this.FlatListItemSeparator}
                            data={getRegisterSubjectData.data}
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
                                    <TouchableOpacity 
                                    onPress = {() => {
                                        changeCheck(index)
                                    }}
                                    style = {{right:10,width:40,height:40,justifyContent:'center',alignItems:'center'}}>
                                        <View >
                                            {item.check?<Entypo name="check" size={30} color="white" />:<Entypo name="check" size={30} color="black" />}
                                            
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
                            <TouchableOpacity onPress = {()=>{
                                this.setState({selectedSubject:item.tenMonHoc,visibleModal:false})
                                this.props.fetchDataRegisterSubject(item.tenMonHoc)
                                console.log(this.props.getRegisterSubjectData)
                                }}>
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
                    {Indicator(getRegisterSubjectData.isFetching || allSubject.isFetching)}
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
        allSubject:state.allSubject,
        getRegisterSubjectData:state.getRegisterSubjectData
    }
};

function mapDispatchToProps (dispatch) {
    return {
        fetchDataAllSubject: () => dispatch(fetchDataAllSubject()),
        fetchDataAllStudent: () => dispatch(fetchDataAllStudent()),
        fetchDataRegisterSubject: (monHoc)=>dispatch(fetchDataRegisterSubject(monHoc)),
        changeCheck: (index) => dispatch(changeCheck(index))
        
    }
  }
export default connect (mapStateToProps,mapDispatchToProps)(RegisterSubjectScreen);