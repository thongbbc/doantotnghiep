import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',alignItems:'center',flexDirection:'row',
    height:null,marginTop:10,
    width:Dimensions.get('window').width - 40,
  },
  button: {
    marginTop:5,marginRight:5,marginLeft:5,
    width:(Dimensions.get('window').width - 40)/2 - 15,
    padding:5, justifyContent: 'center',alignItems: 'center',flexDirection:'row',
    backgroundColor:"rgba(59,89,152,1)"
  },
  button2: {
    marginTop:5,marginRight:5,marginLeft:5,
    width:(Dimensions.get('window').width - 40)/2 - 15,
    padding:5, justifyContent: 'center',alignItems: 'center',flexDirection:'row',
    backgroundColor:"rgba(221,75,57,1)"
  }
});

export default styles;
