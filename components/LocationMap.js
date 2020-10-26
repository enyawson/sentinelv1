import React  from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { ScrollView } from 'react-native-gesture-handler';
// remove PROVIDER_GOOGLE import if not using Google Maps
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class LocationMap extends React.Component{
  constructor(props,navigation){
    super();
    this.state = {
       
    }
}


  render(){
    return(
      <View style={styles.container}>
     
        <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     >
     </MapView>
     
     
   </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    bottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

