import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  toolbar:{
      backgroundColor:'rgba(0,0,0,0.3)',
      paddingTop:30,
      paddingBottom:10,
      flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
    },
  viewTop: {
    flex: 0.5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',    alignItems: 'center',
    // backgroundColor: "rgba(77,31,31,1)"
  },
  viewBottom: {
     flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, alignItems:'center' // backgroundColor: "rgba(255,255,255,1)"
  }
});

export default styles;
