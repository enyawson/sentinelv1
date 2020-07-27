import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import { AppRegistry,StyleSheet, Text, PermissionsAndroid, View, Image, Alert} from 'react-native';

export default class GPSLocationLogic extends React.Component{
    state = {
        longitude: null,
        latitude: null,
        loading: false,
        updatesEnabled: false,
        isPermissionEnabled: false,
        timeStamp: null,
        isWithinAccuracy: null,
    };
    componentDidMount = () => {
        let that = this;
        if (Platform.OS === 'ios'){
            this.callLocation(that)
        }else{
            async function requestLocationPermission() {
               try{
                 const granted = await PermissionsAndroid.request(
                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                     {
                         'title' : 'Location Access Required',
                         'message': 'This App needs access to your location'
                     }
                 )
                 if (granted === PermissionsAndroid.RESULTS.GRANTED){
                    
                     that.callLocation(that);
                 }else{
                     alert("Permission alert")
                 }
                 }catch( err ){

                     Alert.alert("err", err);
                     console.warn(err)
                     }
            }
            requestLocationPermission();
        }
    }
    //call location
    callLocation (that){
         this.setState({loading: true});
        if (this.state.loading === true){ 
            Geolocation.getCurrentPosition(
                (position) => {
                    const currentLongitude =  JSON.stringify(position.coords.longitude);
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    const locationTime = JSON.stringify (position.timestamp);
                    const locationAccuracy = JSON.stringify (position.coords.accuracy);
                    //setting state to re-render positions
                    this.setState({ longitude: currentLongitude,
                        latitude: currentLatitude,
                        loading: false,
                        timeStamp: Date(locationTime),
                        isWithinAccuracy : locationAccuracy});
                },
                (error) => {
                    Alert.alert(error.message);},
                { enableHighAccuracy: true,
                     timeout: 20000,
                     maximumAge: 0,
                     distanceFilter: 0, 
                     enableHighAccuracy: true
                    }
            );

        } 
        if (this.state.loading === false){
                that.watchID = Geolocation.watchPosition((position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const locationTime = JSON.stringify (position.timestamp);
                const locationAccuracy = JSON.stringify (position.coords.accuracy);
                that.setState({longitude: currentLongitude,
                    latitude: currentLatitude,
                    timeStamp: Date(locationTime),
                    isWithinAccuracy : locationAccuracy});
               
                console.log('lng :' + this.state.currentLongitude);
                console.log('lng :' + this.state.currentLatitude);

            },
            (error) => {Alert.alert(error.message)},
            {distanceFilter: 0.1, 
                interval: 10000, 
                fastestInterval:5000,
                enableHighAccuracy: true,
                useSignificantChanges: true
             });
        }
        
    }
    //remove location updates
    removeLocationUpdates = () => {
        if (this.watchID !== null){
            Geolocation.clearWatch(this.watchID);
        }
    }
    componentWillUnmount = () => {
     //  Geolocation.clearWatch(this.watchID);
    }
    
    render(){
        return (
            <View style={{flexDirection: 'column'}}>
                    <View style={styles.gpsContainer}>
                    <Text style={styles.text}>
                        Lng:{this.state.longitude}   
                    </Text>
                    <Text style={{fontSize: 16, color: 'white', marginLeft: 5}} >
                    Lat:{this.state.latitude}
                    </Text>
                    
                    </View>
                <View>
                    <Text style={{fontSize: 16, color: 'white', marginLeft: 5}} >
                    Time:{this.state.timeStamp}
                    </Text>
                    <Text style={{fontSize: 16, color: 'white', marginLeft: 5, alignItems: 'center'}} >
                    acc:{this.state.isWithinAccuracy}
                    </Text>
                </View>
            </View>
           
          
            
        )
    }
}
const styles = StyleSheet.create({
    gpsContainer: {
      flexDirection: 'row',
      justifyContent:'space-evenly',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: 'white',
    },
});