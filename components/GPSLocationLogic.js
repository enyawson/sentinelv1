import React, { Component } from 'react';
import Geolocation, { stopObserving } from 'react-native-geolocation-service';
import { AppRegistry,StyleSheet, Text, PermissionsAndroid, View, Image, Alert} from 'react-native';



export default class GPSLocationLogic extends Component{
   

    constructor(props){
        super(props);
     this.state = {
        longitude: null,
        latitude: null,
        isPermissionEnabled: false,
        timeStamp: null,
        date: null,
        dateTime: null,
        isWithInAccuracy: null, // receives the accuracy of the coordinates
        disableCameraButton: false,
        standardAccuracyValue: 6,
        
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
                //setting sate to time
                const dateString = ( datePic + '/' + month + '/' + year) 
                // const timeString = (hours + ':' + min + ':' + sec)
                this.setState({
                    date: dateString,
                    // dateTime: timeString
                });
            }, 1000)
            
    }

    //This function sets time 
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
         
    /**
     * This method generates the gps location of the device using react native
     * geolocation
     * @param {*} that is the activity context (this)
     */
    callLocation (that){
            //this method finds the geolocation of the device
            Geolocation.getCurrentPosition(
                (position) => {
                    const currentLongitude =  JSON.stringify(position.coords.longitude);
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    const locationTime = this.state.date;
                    const locationAccuracy = position.coords.accuracy;
                    console.log('I happened'); // console log
                    console.log(position);  // console log
                    //this set the disableCameraButton to true
                    if(position.coords.accuracy > this.state.standardAccuracyValue){
                        this.setState({disableCameraButton: true,})
                        console.log('abooozegi true :' + this.state.disableCameraButton);
                    }
                     
                    //setting state to re-render positions
                    this.setState({ longitude: currentLongitude,
                        latitude: currentLatitude,
                        timeStamp: locationTime,
                        isWithInAccuracy : locationAccuracy,
                      
                    });

                    
                    /*This passes the state of the activity to PhotoLogic,
                    accuracy and disableCameraButton is retrieved from this to 
                    create the logic of disabling camera button when below standardValue*/
                    that.props.customProp(this.state);
                    console.log('hello'+ this.state);
                    
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
               
                /*set the state(disableCameraButton) to false or true when
                 below or above standardValue*/
                if(position.coords.accuracy > this.state.standardAccuracyValue){
                    this.setState({disableCameraButton: true,});
                    console.log('abooozegi true :' + this.state.disableCameraButton);
                }else{
                    this.setState({disableCameraButton: false,});
                    console.log('abooozegi false :' + this.state.disableCameraButton);
                }

                that.setState({longitude: currentLongitude,
                latitude: currentLatitude,
                timeStamp: locationTime,
                isWithInAccuracy : locationAccuracy});

                that.props.customProp(this.state);

                //console test for state passed to photologic 
                console.log('hello '+ this.state); 
                
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
      componentWillUnmount(){
       
        Geolocation.clearWatch(this.watchID);
        console.log('unmounted successfully'); // console log

        //this fixes react can't set state on an unmount
        this.setState = (state, callback) =>{
            return;
        };
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
                    acc:{Math.round(this.state.isWithInAccuracy).toFixed(3)} 
                    </Text>
                </View>
                <View style={{marginBottom: 75, alignSelf: 'center'}}>
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