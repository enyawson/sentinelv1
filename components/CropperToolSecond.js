// import React, { Component, useRef} from 'react';

// import {
//   StyleSheet,} from 'react-native';
// import { CropView } from 'react-native-image-crop-tools';
// import AsyncStorage from '@react-native-community/async-storage';
// export default class CropperToolSecond extends Component {

//     constructor(props,navigation){
//         super(props);
//       // console.log({...props});

//         this.state = {
//             imageUri: '',
//             croppedImageUri:'',
           
//         }
//     }
//     cropViewRef = ref();
//     componentDidMount (){

//         console.log('crop tool mounted')
        
//         const { itemName } = this.props.route.params;
//         this.setState({
//             imageUri: itemName,
//         })
//         console.log('itemName @croptool', itemName )

//     }



// saveImage = async (res) => {
//   let photos = await AsyncStorage.getItem('scannerCroppedImage');
//   photos = photos ? JSON.parse(photos) : [];
//   if (res) {
//       photos.push(res);
//       await AsyncStorage.setItem('scannerCroppedImage', JSON.stringify(photos), () => {
          
//           this.props.navigation.navigate('ScannedDocumentPage');
//           this.setState({
//             imageUri: ''
//           })
//       });
//       console.log('ASYNC STORAGE @CropperTool'+ photos);
//   }
// }

    
  

//   render() {
//     return (
//         <CropView
        
//         sourceUrl={this.state.imageUri}
//         style={styles.cropView}
//         ref={cropViewRef}
//         onImageCrop={(res) => console.log(res)}
//         keepAspectRatio
//         aspectRatio={{width: 16, height: 9}}
//       />
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   cropView: {
//     flex: 1,
//     backgroundColor: 'red'
//   },
// });