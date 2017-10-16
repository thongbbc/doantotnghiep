import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex:1,justifyContent:'center',alignItems:'center',
    width:Dimensions.get('window').width,
    top:Dimensions.get('window').height/2-10 + Dimensions.get('window').height/2 - Dimensions.get('window').height/6 - Dimensions.get('window').height/14/2,
    position: 'absolute',
  },
  button: {
    width: Dimensions.get('window').width/2, justifyContent: 'center',alignItems: 'center',
    height:Dimensions.get('window').height/14,
    backgroundColor:"rgba(77,31,31,1)",borderRadius:50
  }
});

export default styles;
