import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList,Alert
    , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { EvilIcons,Ionicons,Entypo,Foundation,MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {LinearGradient} from 'expo'
import {width,height} from '../../helperScreen'
import {connect} from 'react-redux';
import {fetchDataAllStudent} from '../../actions/fetchData'
import Header from '../../component/header'
import Indicator from '../../component/indicator'
import Swipeout from 'react-native-swipeout';
var qs = require('qs');
import axios from 'axios'
class TripTypeScreen extends Component {
    constructor(props) {
        super(props)
    }    
    componentDidMount() {
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
        
        const {allStudent} = this.props
        const {data} = allStudent
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
                <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
                    <FlatList
                        keyExtractor={item => item.id}
                        style = {{flex:1}}
                        ItemSeparatorComponent = {this.FlatListItemSeparator}
                        data={data}
                        renderItem={({item,index}) =>
                        {
                            let swipeBtns = [{
                                text: 'Delete',
                                backgroundColor: 'red',
                                fontWeight:'bold',
                                underlayColor: '#fff',
                                onPress: () => {
                                    Alert.alert(
                                        'Are you sure?',
                                        `Delete student ${item.hoten}`,
                                        [
                                            {text: 'Cancel', onPress: () => {}},
                                            {text: 'OK', onPress: () => {
                                                axios.post('https://doantotnghiep.herokuapp.com/deleteSV/',qs.stringify({
                                                    id:item.id
                                                }))
                                                .then(response => {
                                                      if (response.data.status == 'OK') {
                                                        this.props.fetchDataAllStudent()                                            
                                                      } else {
                                                          alert("DELETE FAILED")
                                                      }
                                                }).then(()=>{
                                                    alert("DELETE SUCCESS")                                        
                                                })
                                                .catch(error => {
                                                  console.log(error);
                                                      alert("DELETE FAILED")
                                                });
                                            }},
                                        ],
                                        { cancelable: true }
                                      )
                                }
                            },
                            {
                                text: 'Detail',
                                backgroundColor: 'rgba(255,255,255,1)',
                                fontWeight:'bold',
                                color:'black',
                                underlayColor: '#fff',
                                onPress: () => {
                                    this.props.navigation.navigate('DetailScreen',{id:item.id,hoten:item.hoten,mssv:item.mssv})
                                }
                            }];
                            return <Swipeout right={swipeBtns}
                            autoClose={true}
                            backgroundColor= 'transparent'>
                                <View style = {{width,flexDirection:'row',backgroundColor:'rgba(255,255,255,0.2)'}}>
                                    <View style = {{width:60,height:60,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                                        <Text style = {{color:'white',fontSize:13,fontWeight:'bold'}}>{item.id}</Text>
                                    </View>
                                    <View style = {{paddingLeft:10,justifyContent:'center'}}>
                                        <Text style = {{backgroundColor:'transparent',marginBottom:5,fontSize:13,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>{item.hoten}</Text>
                                        <Text style = {{backgroundColor:'transparent',fontSize:10,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>MSSV:{item.mssv}</Text>
                                    </View>
                                </View>
                            </Swipeout>
                        }
                        }
                    />
                </LinearGradient>
                {Indicator(allStudent.isFetching)}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        animating:state.animatingDrawer,
        allStudent:state.allStudent
    }
};

function mapDispatchToProps (dispatch) {
    return {
      fetchDataAllStudent: () => dispatch(fetchDataAllStudent())
    }
  }
export default connect (mapStateToProps,mapDispatchToProps)(TripTypeScreen);