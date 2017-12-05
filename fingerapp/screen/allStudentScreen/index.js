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
import * as action from '../../actions/actionMain'


import Header from '../../component/header'

class AllStudentScreen extends Component {
    constructor(props) {
        super(props)
    }    
 



    render() {
        



        return(
            <View style = {{flex:1}}>
                <Header>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.goBack(null)
                    }}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="white" />
                    </TouchableOpacity>
                </Header>
                <View style = {{flex:1,backgroundColor:'white'}}>
                    {/* <FlatList
                        keyExtractor={item => item.title}
                        style = {{flex:1}}
                        data={[{title:'Information all students'}, 
                            {title: 'Information Trip'},
                            {title: 'Add Student'},
                            {title: 'Add Subject'},
                            {title: 'Register Subject For Student'},
                        ]}
                        renderItem={({item,index}) => {
                           
                        }}
                    /> */}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        animating:state.animatingDrawer
    }
};
export default connect (mapStateToProps,action)(AllStudentScreen);