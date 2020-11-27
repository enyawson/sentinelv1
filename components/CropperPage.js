// import React, {Component, useState} from 'react';
// import {View, Text, Image, StatusBar, StyleSheet, Alert} from 'react-native';
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Platform,
//   Button,
//   Modal,
//   TouchableHighlight,
//   TouchableWithoutFeedback,
// } from 'react-native'; 
// import ImagePicker from 'react-native-image-crop-picker';
// import AsyncStorage from '@react-native-community/async-storage';
// import {NavigationActions} from 'react-navigation';
// export default class CropperPage extends Component {
//     state={
//         image:''
//     };
//     componentDidMount(){
//         AsyncStorage.getItem('scannedImage').then(data => {
//             this.setState({image: data});
//             console.log("IMAGE TO CROP"+ this.state.image);
//             this.pick('ScannedDocumentPage');  
//             //removes cropped images from async storage to free up space
//             this.removeDataStored();
//         });
//     }
//     pick(activity){
//         const {navigate} = this.props.navigation;
//         ImagePicker.openCropper({
//             path: this.state.image,
//             width: 500,
//             height: 500,
//             freeStyleCropEnabled: true,
//           }).then(image=>
//         {
//             AsyncStorage.getItem("croppedImages").then(data=>{
//             let images=data ? JSON.parse(data):[];
//             images.push(image.path);
//             AsyncStorage.setItem("croppedImages",JSON.stringify(images));
//             navigate(activity);
//             console.log(images) })
//          });
//     }
//     /**This method clears scannedImages array */
//      removeDataStored = async () =>{
//       try{
//             await AsyncStorage.removeItem('croppedImages');

//         }catch(e){
//             console.log('error')
//         }
//     }




//     render() {
//         const {navigate} = this.props.navigation;
//         return (
//             <View style={{backgroundColor:'black'}}>
//                 <Text>{''}</Text>
//             </View>
//         );
// }
// }