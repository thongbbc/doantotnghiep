import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,flexDirection:'column',
    backgroundColor: '#F5FCFF'
  },
  toolbar:{
      backgroundColor:"rgba(164,132,132,1)",
      paddingTop:30,
      paddingBottom:10,justifyContent:'center',alignItems:'center',
      flexDirection:'row'    //Step 1
  },
  toolbarButton:{
      width: 60,            //Step 2
      color:'#fff',
      textAlign:'center',left:5
  },
  toolbarTitle:{
      color:'#fff',
      textAlign:'center',
      fontWeight:'bold',
      height:null,
         fontSize:20,      flex:1                //Step 3
  },
  btnXemDanhSach: {
    width:null,height:null,alignItems:'center'
  },
  btnXemRaVao: {
    width:null,height:null,alignItems:'center'
  }
});

export default styles;
