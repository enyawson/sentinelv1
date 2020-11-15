import React  from 'react';
import MapView ,{Marker} from 'react-native-maps'; 
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
      style={styles.map}
       LatLng ={{
      latitude: 37.78825,
      longitude: -122.4324,
        
       }}
     >
      <Marker
      coordinate={ {
        latitude: 37.78825,
        longitude: -122.4324,
      } }
      title={'Incidence'}
      description={'Peaceful voting'}
    />
     </MapView>
     
     
   </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 2,
    bottom: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth:3,
    borderColor:'#1D5179',
    borderRadius:6,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

