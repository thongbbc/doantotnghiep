import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - Dimensions.get('window').height/2 - 90,
    justifyContent: 'center',    alignItems: 'center',
    borderRadius:10,  shadowColor: '#000',borderWidth:5,borderColor:"rgba(202,187,187,1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    top:270,left:30,right:30,
    position: 'absolute',
    backgroundColor: "rgba(255,255,255,1)"
  }
});

export default styles;