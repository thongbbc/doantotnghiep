import {
  StyleSheet,Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  logo: {
  	top:Dimensions.get('window').height/2 - 50 - 30 - Dimensions.get('window').height/4,
    justifyContent: 'center',alignItems: 'center',
    height:100,width:100,backgroundColor:"rgba(255,164,164,1)",borderRadius:100/2
  }
});

export default styles;
