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
       region ={{
      latitude: this.props.lat,
      longitude: this.props.lng,
      latitudeDelta: 0.0,
      longitudeDelta: 0.015,
       }}
       
       showPointOfInterest={true}
      >
      
      <Marker
      
      coordinate={ {
        latitude: this.props.lat,
        longitude: this.props.lng,
      } }
      title={this.props.incidence}
      description={this.props.description}
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
    borderWidth:0,
    borderColor:'#1D5179',
    borderRadius:6,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

