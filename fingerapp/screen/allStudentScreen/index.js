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
import {fetchDataAllStudent} from '../../actions/fetchData'
import Header from '../../component/header'
import Indicator from '../../component/indicator'

class AllStudentScreen extends Component {
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
                            <View style = {{width,flexDirection:'row',backgroundColor:'rgba(255,255,255,0.2)'}}>
                                <View style = {{width:60,height:60,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                                    <Text style = {{color:'white',fontSize:13,fontWeight:'bold'}}>{item.id}</Text>
                                </View>
                                <View style = {{paddingLeft:10,justifyContent:'center'}}>
                                    <Text style = {{backgroundColor:'transparent',marginBottom:5,fontSize:13,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>{item.hoten}</Text>
                                    <Text style = {{backgroundColor:'transparent',fontSize:10,fontWeight:'400',color:'rgba(0,0,0,0.8)'}}>MSSV:{item.mssv}</Text>
                                </View>
                            </View>
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
export default connect (mapStateToProps,mapDispatchToProps)(AllStudentScreen);