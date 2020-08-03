import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { AppRegistry,StyleSheet, Text, PermissionsAndroid, View, Image, Alert} from 'react-native';

export default class GPSLocationLogic extends Component{
    constructor(){
        super();
     this.state = {
        longitude: null,
        latitude: null,
       
        updatesEnabled: false,
        isPermissionEnabled: false,
        timeStamp: null,
        date: null,
        dateTime: null,
        isWithInAccuracy: null, // receives the accuracy of the coordinates
        captureSwitch: false, // turns camera or video on and off
    };
    }
   
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
                      that.getDateOfLocation();
                      that.getTimeOfLocation();
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
    /**
     * This function gets date and Time
     */
    getDateOfLocation(){
        setInterval(()=> {
            let datePic = new Date().getDate(); //current date
            let month = new Date().getMonth() + 1; //current Month
            let year = new Date().getFullYear(); //current year
            // let hours = new Date().getHours(); //current hours
            // let min = new Date().getMinutes(); //current minutes
            // let sec = new Date().getSeconds(); //current getSeconds
            //setting sate to time
            const dateString = ( datePic + '/' + month + '/' + year) 
            // const timeString = (hours + ':' + min + ':' + sec)
            this.setState({
                date: dateString,
                // dateTime: timeString
            });
        }, 1000)
        
    }
getTimeOfLocation() {
    setInterval(() => {
        let hours = new Date().getHours(); //current hours
            let min = new Date().getMinutes(); //current minutes
            let sec = new Date().getSeconds(); //current getSeconds
            const timeString = (hours + ':' + min + ':' + sec)
            this.setState({
                dateTime: timeString
            });
    }, 1000);
    
}

         
    //call location
    callLocation (that){
         this.setState({loading: true});
        
            Geolocation.getCurrentPosition(
                (position) => {
                    const currentLongitude =  JSON.stringify(position.coords.longitude);
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    const locationTime = this.state.date;
                    const locationAccuracy = position.coords.accuracy;
                    console.log('I happened'); // console log
                    console.log(position);  // console log
                     
                    //setting state to re-render positions
                    this.setState({ longitude: currentLongitude,
                        latitude: currentLatitude,
                        timeStamp: locationTime,
                        isWithinAccuracy : locationAccuracy});
                        
                },
                (error) => {
                    Alert.alert(error.message)
                },
                {    enableHighAccuracy: true,
                     timeout: 20000,
                     maximumAge: 5000,
                     distanceFilter: 5, 
                     enableHighAccuracy: true
                    }
            );
                that.watchID = Geolocation.watchPosition((position) => {
                console.log('change in position'); //console log
                console.log(position); //console log
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const locationTime =  this.state.date;
                const locationAccuracy = position.coords.accuracy;
               
                
                that.setState({longitude: currentLongitude,
                latitude: currentLatitude,
                timeStamp: locationTime,
                isWithinAccuracy : locationAccuracy});
            },
            (error) => {Alert.alert(error.message)},
            {distanceFilter: 0.1, 
                interval: 10000, 
                fastestInterval:5000,
                enableHighAccuracy: true,
                useSignificantChanges: true
             });
        
        
    }
    //remove location updates on component unmount
    componentWillUnmount = () => {
     Geolocation.clearWatch(this.watchID);
     console.log('unmounted successfully'); // console log
    }
    
    render(){
        return (
            <View style={{flexDirection: 'column'}}>
                <View style={styles.gpsContainer}>
                   
                    <Text style={{fontSize: 16, color: 'white', marginLeft: 10}} >
                     {this.state.latitude} 
                    </Text>
                    <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>
                         {this.state.longitude}   
                    </Text>
                    <Text style={{fontSize: 16, color: 'white', alignItems: 'center',
                     alignSelf:'center', marginLeft: 5, marginBottom:0}} >
                    acc:{Math.round(this.state.isWithinAccuracy).toFixed(3)} 
                    </Text>
                </View>
                <View style={{marginBottom: 70, alignSelf: 'center'}}>
                    <Text style={{fontSize: 16, color: 'white', marginLeft: 5}} >
                    Date:{this.state.date} time: {this.state.dateTime}
                    </Text>
                    
                </View>
            </View>
           
          
            
        )
    }
}
const styles = StyleSheet.create({
    gpsContainer: {
      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'center',
      
    },
});
AppRegistry.registerComponent('App', () => GPSLocationLogic);