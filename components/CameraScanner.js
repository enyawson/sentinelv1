import React from 'react';
import {
    StyleSheet, Text,  View, 
    Image, TouchableOpacity, Dimensions,
    ActivityIndicator,} from 'react-native';

import { RNCamera } from 'react-native-camera';
import FlashOff from 'react-native-vector-icons/Ionicons';
import Cancel from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';





/**This functional component is called when any individual audio file is clicked */

export default class CameraScanner extends React.Component{
    
    constructor(props,navigation){
        super(props);
      // console.log({...props});

        this.state = {
            imageUri: '',
            zoom: 0,
            focusDepth: 1,
            pathStatus: false,
            loadingImage: false,
           
        }
    }
    
    componentDidMount (){
        console.log("Camera Scanner mounted")
        //will add umount feature here

    }
    componentWillUnmount (){

    }

    componentDidUpdate(prevProps, prevState){
    }

    // saveScannedImage= async(jsonValue)=>{
    //     try {
    //         //const jsonValue= JSON.stringify(value)
    //         await AsyncStorage.setItem('scannerImageToCrop', jsonValue)
    //       } catch (e) {
    //         // saving error
    //       }
    //       console.log("I am saved "+ jsonValue)
    // }
 
    takePicture = async () => {
        if (this.camera){
            const options = {quality: 1, 
            base64: false,
            pauseAfterCapture: false
            };
            const data = await this.camera.takePictureAsync(options);
            //  if (data != null){
            //     this.setState({
            //         loadingImage:true,
            //     }) 
            //  }
             //console.log("First load",this.state.loadingImage)
            //save image to crop
            //this.saveScannedImage(data.uri);
             //set image path to state
            this.setState({
                imageUri: data.uri
            })
            //set status of image state
            console.log(data)
            //set loading image to false
            // this.setState({
            //     loadingImage:false
            // })
            //console.log("second load",this.state.loadingImage)

            this.props.navigation.navigate('CropperTool',{itemName: data.uri}); 
            
        }
        
        console.log("am navigating from camera to cropper")
    }; 
    
   //Camera Component
   renderCamera = ()=>{
    
    return(
        <RNCamera
        ref={(ref) => {
            this.camera = ref;
        }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.false}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            whiteBalance={RNCamera.Constants.WhiteBalance.auto}
            zoom= {this.state.zoom}
            focusDepth={this.state.depth}
            playSoundOnCapture={true}
            androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'permission needed to use camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
            }}  
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'permission needed to use camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            captureAudio={true}>
        
        <View style={{
            flexDirection: 'column', 
            alignSelf: 'flex-end',
            }}>
                <TouchableOpacity
                style={{ backgroundColor:'black', opacity: 0.4, borderRadius:10, margin:10}}>
                    <FlashOff
                        name={'flash-off-outline'}
                        size={23}
                        color="white"
                        style={{margin:15, alignContent: 'center'}}
                    />  
                </TouchableOpacity>
                <TouchableOpacity
                style={{ backgroundColor:'black', opacity: 0.4, borderRadius:10, margin:10}}
                onPress={()=> this.props.navigation.goBack()}>
                    <Cancel
                        name={"close-circle-outline"}
                        size={23}
                        color="white"
                        style={{margin:15, alignContent: 'center'}}
                    />  
                </TouchableOpacity>
               
               
            </View>
         
            <View style={{ flexDirection: 'row', alignSelf:'stretch',justifyContent: 'center',}}>      
                <TouchableOpacity
                style={styles.cameraCapture}
                onPress={this.takePicture}>
                    <Icon name="camera" size={28} color= '#1D5179'/>
                </TouchableOpacity>      
            </View>
                
        </RNCamera>   
    );
}

    render () {
        
      return(
        <View style= {styles.container}>
           {this.renderCamera()}
           {this.state.loadingImage &&  
                <ActivityIndicator
                size='large'
                color='#fff'
                style={styles.activityIndicator}
                animating={this.state.loadingImage}
                />}

           
        </View>   
            
     );
    }
   
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column', 
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        
    }, 
    cameraCapture: {
        flex: 0,
        backgroundColor: '#ffff', 
        padding: 15,
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#1D5179'

    },
    activityIndicator: {
       
        color: 'blue',
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
        alignSelf:'center'
    },
});
