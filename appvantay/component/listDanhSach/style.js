import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,flexDirection:'column',
    backgroundColor: '#F5FCFF'
  },
    toolbar:{
      width:Dimensions.get('window').width,
      backgroundColor:"rgba(164,132,132,1)",
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
      height:null,
      fontSize:20,      flex:1      //Step 3
  }
});
export default styles;
