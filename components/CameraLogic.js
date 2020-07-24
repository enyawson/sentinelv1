import 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import React, {Component, useState} from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const  cameraLogic = () => {

    //state of the camera details
    const [state, setState] = useState({
        imageUri: 'null',
        imageTimestamp: 'null',
        latitude: 'null',
        longitude: 'null',
    });

    //options for launch camera method
    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'image',
        },
    
    }
    //Permission to access camera
    
        const requestCameraPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                      title: "Camera Permission ",
                      message: "App needs access to your camera.",
                      buttonNegative: "cancel",
                      buttonPositive: "OK"  
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED){
                    //call function to take picture
                    cameraLaunch;
                    //call function to access location of user
                }else {
                    //Camera access denied
                    //Return to home options
                    Alert.alert("Permission denied");
                }
               
            } catch (err){
                console.warn(err);
            }
        
        }
        //call calling permission to text
       
    
    //function to call camera to be used when permission is a positive call  
    cameraLaunch = () =>{
    ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel){
            Alert.alert('image picker cancelled');
        }else if (response.error) {
            Alert.alert('Image picker Error:  ', response.error);
        }else {
            const source = {uri: response.uri,
                imageTime: response.timestamp,
            };
             setState({
                imageUri: source,
                imageTimestamp: response.timestamp,
            });
            
        }  
     });
    }

    return(
        <View>
            <View style={{flexDirection: 'row'} }>
            <Text> Lat:{ state.latitude } Long:{ state.longitude } </Text>
            <Text> { imageTimestamp } </Text>
            </View> 
                <Image 
                    source = {{uri: state.imageUri}}
                    style={{width: 300, height: 300}}>    
                </Image>
        </View>
        
    )
}
export default cameraLogic;