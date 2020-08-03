// import React from 'react-native';
// import { 
//     AppRegistry,
//     StyleSheet, 
//     Text, PermissionsAndroid,
//     View, 
//     Image,
//     Alert
// } from 'react-native';

// class GPSLocation extends React.Component{
//     constructor() {
//       super();
//       this.state={
//         data: [],
//       }   
//     }

//     ComponentDidMount(){
//         this.apiCall();
//     }

//     //API call to google geolocation services
//     async apiCall(){
//       let request =  await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAwtToFEcabJFc0rkmSqoIVF20eRPrHhE0');
//       let response = await request.json();
//       console.warn(response);
//     } 
// }