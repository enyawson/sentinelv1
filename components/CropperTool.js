import React, { Component } from 'react';
import AmazingCropper, { DefaultFooter } from 'react-native-amazing-cropper';
import AsyncStorage from '@react-native-community/async-storage';

export default class CropperTool extends Component {

    constructor(props,navigation){
        super(props);
      // console.log({...props});

        this.state = {
            imageUri: '',
            croppedImageUri:'',
           
        }
    }

    componentDidMount (){

        console.log('crop tool mounted')
        
        const { itemName } = this.props.route.params;
        this.setState({
            imageUri: itemName,
        })
        console.log('itemName @croptool', itemName )

    }

//    saveImage = async(res) => {
//       // const value= await AsyncStorage.getItem('photo')
//       // const photo= await AsyncStorage.getItem('photos')
//       AsyncStorage.getItem('photos').then((photos) => {
//       const photo = photos ? JSON.parse(photos) : [];
//       photo.push(res);
//       AsyncStorage.setItem('photos', JSON.stringify(photo));
//      // console.log("ASYNC STORAGE WORKED : "+photo)
     
//       // /**Navigate to Evidence page */
//       //navigation.navigate('EvidenceSubmission')

//        /**boolean to resume camera before navigation */
//        setRenderingImage(false);
//   }); 
// }

saveImage = async (res) => {
  let photos = await AsyncStorage.getItem('scannerCroppedImage');
  photos = photos ? JSON.parse(photos) : [];
  if (res) {
      photos.push(res);
      await AsyncStorage.setItem('scannerCroppedImage', JSON.stringify(photos), () => {
          
          this.props.navigation.navigate('ScannedDocumentPage');
          this.setState({
            imageUri: ''
          })
      });
      console.log('ASYNC STORAGE @CropperTool'+ photos);
  }
}

    //called when ok text is pressed
  onDone = async(croppedImageUri) => {
    console.log('croppedImageUri = ', croppedImageUri);
    // send image to scanned document page
    await this.saveImage(croppedImageUri);
    
    this.props.navigation.navigate('ScannedDocumentPage');
   
  }

  onError = (err) => {
    console.log(err);
  }

  onCancel = () => {
    console.log('Cancel button was pressed');
    // navigate back
  }

  render() {
    return (
      <AmazingCropper
        // Pass custom text to the default footer
        footerComponent={<DefaultFooter doneText='DONE' rotateText='ROT' cancelText='BACK' />}
        onDone={this.onDone}
        onError={this.onError}
        onCancel={this.onCancel}
        imageUri={this.state.imageUri}
        imageWidth={1800}
        imageHeight={2396}
        //imageWidth={2800}
        //imageHeight={4396}
      />
    );
  }
}