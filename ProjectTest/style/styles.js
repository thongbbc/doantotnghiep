import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  toolbar: {
    paddingTop:30,
    paddingBottom:10,
    backgroundColor:"rgba(164,132,132,1)",
    width:Dimensions.get('window').width,
    flexDirection:'row'
  },
  viewTop: {
    flex: 0.5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',    alignItems: 'center',
    backgroundColor: "rgba(77,31,31,1)"
  },
   toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
  },
  viewBottom: {
     flex: 0.5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,1)"
  }
});

export default styles;