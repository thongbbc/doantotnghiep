import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex:1,justifyContent:'center',alignItems:'center',
    width:Dimensions.get('window').width,
    top:Dimensions.get('window').height - Dimensions.get('window').height/2 - 125 + 280,
    position: 'absolute',
  },
  button: {
    width: 200, justifyContent: 'center',alignItems: 'center',
    height:40,
    backgroundColor:"rgba(77,31,31,1)",borderRadius:50
  }
});

export default styles;