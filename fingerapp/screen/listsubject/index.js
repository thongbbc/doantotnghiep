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
import { allSubject } from '../../reducer/fetchDataReducer/index';

class ListSubjectScreen extends Component {
    constructor(props) {
        super(props)
    }    
    componentDidMount() {
        this.props.fetchDataAllSubject()
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
                    ><Text style = {{color:'white',fontSize:18}}>List subject</Text></View>
                </Header>
                <View style = {{flex:1}}>
                <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
                    <FlatList
                        keyExtractor={item => item.tenMonHoc}
                        style = {{flex:1}}
                        ItemSeparatorComponent = {this.FlatListItemSeparator}
                        data={data}
                        renderItem={({item,index}) =>
                            <View style = {{width,flexDirection:'row',backgroundColor:'rgba(255,255,255,0.2)'}}>
                                <View style = {{width:width/3,height:60,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                                    <Text style = {{color:'white',fontSize:13,fontWeight:'bold'}}>{item.tenMonHoc}</Text>
                                </View>
                                <View style = {{paddingLeft:10,justifyContent:'center'}}>
                                    <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Day of week: {item.thu}</Text>
                                    <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Date: {item.dateStart} - {item.dateEnd}</Text>
                                    <Text style = {{backgroundColor:'transparent',fontSize:12,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>Time: {item.timeStart} - {item.timeEnd}</Text>
                                </View>
                            </View>
                        }
                    />
                </LinearGradient>
                {Indicator(allSubject.isFetching)}
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
export default connect (mapStateToProps,mapDispatchToProps)(ListSubjectScreen);