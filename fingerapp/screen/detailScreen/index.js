import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList,Alert,ScrollView
    , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo,Foundation,MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from '../../helperScreen'
import {connect} from 'react-redux';
import {fetchDataAllSubject,fetchDataAllStudent,fetchDataRegisterSubject,changeCheck,} from '../../actions/fetchData'
import Header from '../../component/header'
import Indicator from '../../component/indicator'
import Swipeout from 'react-native-swipeout';
import Modal from 'react-native-simple-modal';

var qs = require('qs');
import axios from 'axios'
class DetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedSubject:'Click for select a subject',            
            visibleModal:false,
            subjectWasJoin:[],
            isFetching:true,
            selectedItem:{},
            percent:'0',
            history:[]
        }
    }    
    componentDidMount() {
        const {id,hoten,mssv} = this.props.navigation.state.params
        
        new Promise(() => {
            fetch('http://doantotnghiep.herokuapp.com/getMonDangKy?id='+id, {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                this.setState({subjectWasJoin:responseJson,isFetching:false})
            }).catch((error) => {
                console.error(error);
                this.setState({isFetching:false})
                alert('ERROR')
            });
        })
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
        
        const {allSubject,allStudent} = this.props
        const {id,hoten,mssv} = this.props.navigation.state.params
        const {data} = allSubject
        const {visibleModal,selectedSubject,subjectWasJoin,isFetching,selectedItem,percent} = this.state
        
        return(
            <View style = {{flex:1}}>
                <Header>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.goBack(null)
                    }}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style = {{flex:1,justifyContent:'center',alignItems:'center',paddingBottom:10}}
                    ><Text style = {{color:'white',fontSize:18}}>Information all students</Text></View>
                </Header>
                <View style = {{flex:1}}>
                <LinearGradient style = {{flex:1,alignItems:'center'}} colors = {['#F58163','#945A4A','#372416']}>
                    <TouchableOpacity style = {{top:20}} onPress = {()=> {
                        this.setState({visibleModal:true})
                    }}>
                        <View style = {{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,255,255,0.3)',
                        width:width-40,height:40,borderRadius:20,borderColor:'white',borderWidth:1}}>
                            <Text style = {{color:'white',fontWeight:'bold'}}>{selectedSubject}</Text>
                        </View>
                    </TouchableOpacity>
                    {selectedSubject!='Click for select a subject'?<ScrollView style = {{top:30}}>
                    <View style = {{width:width-40,flex:1,backgroundColor:'rgba(255,255,255,0.2)',top:40,
                    alignItems:'flex-start',paddingLeft:20,paddingRight:20,justifyContent:'space-between'}}>
                        <View style = {{paddingTop:10,paddingBottom:10,flexDirection:'row',width:width-40-40,justifyContent:'space-between'}}><Text style = {{color:'white',fontWeight:'bold'}}>Id:</Text><Text style = {{color:'white',fontWeight:'bold'}}>{id}</Text></View>
                        <View style = {{paddingTop:10,paddingBottom:10,flexDirection:'row',width:width-40-40,justifyContent:'space-between'}}><Text style = {{color:'white',fontWeight:'bold'}}>MSSV:</Text><Text style = {{color:'white',fontWeight:'bold'}}>{mssv}</Text></View>
                        <View style = {{paddingTop:10,paddingBottom:10,flexDirection:'row',width:width-40-40,justifyContent:'space-between'}}><Text style = {{color:'white',fontWeight:'bold'}}>Name:</Text><Text style = {{color:'white',fontWeight:'bold'}}>{hoten}</Text></View>
                        <View style = {{paddingTop:10,paddingBottom:10,flexDirection:'row',width:width-40-40,justifyContent:'space-between'}}><Text style = {{color:'white',fontWeight:'bold'}}>Subject:</Text><Text style = {{color:'white',fontWeight:'bold'}}>{selectedItem.tenMonHoc}</Text></View>
                        <View style = {{paddingTop:10,paddingBottom:10,flexDirection:'row',width:width-40-40,justifyContent:'space-between'}}><Text style = {{color:'white',fontWeight:'bold'}}>Time:</Text><Text style = {{color:'white',fontWeight:'bold'}}>{selectedItem.timeStart} - {selectedItem.timeEnd}</Text></View>
                        <View style = {{paddingTop:10,paddingBottom:10,flexDirection:'row',width:width-40-40,justifyContent:'space-between'}}><Text style = {{color:'white',fontWeight:'bold'}}>Total Time Join:</Text><Text style = {{color:'white',fontWeight:'bold'}}>{percent}%</Text></View>
                        <View style = {{paddingTop:10,paddingBottom:10,flexDirection:'row',width:width-40-40,justifyContent:'space-between'}}><Text style = {{color:'white',fontWeight:'bold'}}>History:</Text><View>
                                {
                                    this.state.history.map((value,index)=> <Text key = {index} style = {{color:'white',fontWeight:'bold'}}>{value.date}</Text>)
                                }
                            </View></View>



                    </View></ScrollView>:null
                    }
                </LinearGradient>
                {Indicator(isFetching)}
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
                            data={subjectWasJoin}
                            renderItem={({item,index}) =>
                            <TouchableOpacity onPress = {()=>{
                                const self = this
                                this.setState({isFetching:true})
                                axios.post('https://doantotnghiep.herokuapp.com/listDiemDanh',qs.stringify({monHoc:item.tenMonHoc}))
                                .then(response => {
                                    if (response.data) {
                                        const getData = response.data.find((value)=> {
                                            return value.id == self.props.navigation.state.params.id
                                        })
                                        self.setState({percent:getData.percent,isFetching:false})
                                        self.setState({isFetching:true})
                                        
                                        fetch('http://doantotnghiep.herokuapp.com/dataDiemDanh', {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
                                            if(responseJson) {
                                                var data = []
                                                responseJson.map((value)=> {
                                                    if (value.id == self.props.navigation.state.params.id && value.tenmonhoc == item.tenMonHoc) {
                                                        data.push(value)
                                                    }
                                                })
                                                self.setState({history:data})
                                                self.setState({isFetching:false})        
                                                // self.setState({isFetching:true})                                                
                                                // alert('http://doantotnghiep.herokuapp.com/check?start='+item.timeStart+'&end='+item.timeEnd+'&thu='+item.thu)
                                                // fetch('http://doantotnghiep.herokuapp.com/check?start='+item.timeStart+'&end='+item.timeEnd+'&thu='+item.thu).then((response) => response.json()).then((responseJson) => {
                                                //     if(responseJson) {
                                                //         var data = []
                                                //         responseJson.day.map((value)=> {
                                                //             if (value.id == self.props.navigation.state.params.id && value.tenmonhoc == item.tenMonHoc) {
                                                //                 data.push(value)
                                                //             }
                                                //         })
                                                //         self.setState({isFetching:false})                                                
                                                //         console.log(JSON.stringify(responseJson))
                                                //     } else {
                                                //         console.error(error);
                                                //         alert("ERROR")
                                                //         self.setState({isFetching:false})                                                                                                
                                                //     }
                                                // }).catch((error) => {
                                                //     console.error(error);
                                                //     alert("ERROR")                                            
                                                //     self.setState({isFetching:false})                                                                                            
                                                // });

                                            } else {
                                                console.error(error);
                                                alert("ERROR")
                                                self.setState({isFetching:false})                                                                                                
                                            }
                                        }).catch((error) => {
                                            console.error(error);
                                            alert("ERROR")                                            
                                            self.setState({isFetching:false})                                                                                            
                                        });

                                    } else {
                                        alert("ERROR")
                                        self.setState({percent:getData.percent,isFetching:false})                                        
                                    }
                                })
                                .catch(error => {
                                console.log(error);
                                    alert("ERROR")
                                    self.setState({percent:getData.percent,isFetching:false})                                    
                                });
                                this.setState({selectedSubject:item.tenMonHoc,selectedItem:item,visibleModal:false})
                                }}>
                                <View style = {{width:width-40,flexDirection:'row',backgroundColor:'rgba(255,255,255,0.2)'}}>
                                    <View style = {{width:width/4,height:60,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                                        <Text style = {{color:'white',fontSize:13,fontWeight:'bold'}}>{item.tenMonHoc}</Text>
                                    </View>
                                    <View style = {{paddingLeft:10,justifyContent:'center'}}>
                                        <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Day of week: <Text style = {{color:'red'}}>{item.thu}</Text></Text>
                                        <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Time: {item.timeStart} - {item.timeEnd}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            }
                            />
                        </View>
                    </Modal>
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
export default connect (mapStateToProps,mapDispatchToProps)(DetailScreen);