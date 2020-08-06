import React, { PureComponent, useState} from 'react';
import { AppRegistry, StyleSheet, 
    TouchableOpacity, View, Modal,
     BackHandler} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PhotoVideo from 'react-native-vector-icons/FontAwesome5';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import FlashOff from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-vector-icons/Feather';
import  GPSLocationLogic from './GPSLocationLogic';
import GPSLocation from './GPSLocation';
import { acc, set } from 'react-native-reanimated';




TouchableOpacity.defaultProps = { activeOpacity : 0.8};
export default function PhotoLogic ({ navigation}) {
    const falseValue = 'false';
    const trueValue = 'true';

     
    // states to hold data from GPSLocation file
    const[state, setState] = useState({
        permissionEnable : true,
        standardValue: 6,
        disableCameraView: '',
        accuracyValue: 0,
    });
   

    /**
     * This method handles the accuracy of the coordinates  from GPSLocation
     */
    handleData = (value) => {
       
         let setAccuracyValue = value.isWithInAccuracy;
         let setDisableCameraView = value.disableCameraButton;
         console.log('accuracy value on camera: ' +  setAccuracyValue); //text passed accuracy
         console.log('disabled view : '+ setDisableCameraView)
         setState({
            accuracyValue : setAccuracyValue,
            disableCameraView : setDisableCameraView,
           
        }) 
       
        
    }
    //console check of accuracyValue and disableCameraView
    console.log ('yep: '+state.accuracyValue);
    console.log('tey: '+ state.disableCameraView);
    
    
  

        return (
            <View style={styles.container}>
            
                <RNCamera
                 ref={(ref) => {
                     camera = ref;
                 }}
                  style = {styles.preview}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.on}
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
                >
                <Modal
                transparent = {true}
                visible = {true}>
                    <View style={{alignItems:'flex-start',
                     flexDirection: 'row', 
                     justifyContent:'space-between', flex:1}}>
                        <ArrowBack
                            name={'arrow-back-outline'}
                            size={23}
                            color="white"
                            style={{margin:15, alignContent: 'center'}}
                            onPress={()=> navigation.goBack()}
                            />

                        <FlashOff
                            name={'flash-off-outline'}
                            size={23}
                            color="white"
                            style={{margin:15, alignContent: 'center'}}/>   

                        <Icon
                            name={'map-marker-alt'}
                            size={23}
                            color="white"
                                style={{margin:15, alignContent: 'center'}}/>  
                    </View>
                    <View style={{
                            flex: 1, 
                            flexDirection: 'row', 
                            alignSelf:'stretch',
                            marginTop: 500,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            justifyContent: 'center'
                        }}>
                        
                        <View 
                        flexDirection='row' 
                        pointerEvents={(state.disableCameraView)? 'none': 'auto'}
                        opacity={(state.disableCameraView===false)? 1 : 0.5}>
                            <TouchableOpacity
                                disabled={false} 
                                onPress={takePicture} 
                                style={styles.alternateCapture}
                            >
                                <PhotoVideo 
                                    name="photo-video" 
                                    size={28} 
                                    color="#f8f8ff"
                                    disabled={true}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                disabled={false}
                                onPress={takePicture} 
                                style={styles.capture}
                            >
                                <Icon
                                    name="camera"
                                    size={28}
                                    color="#1D5179"
                                />
                            </TouchableOpacity>
                                <TouchableOpacity 
                                    disabled={false}
                                    onPress={takePicture} 
                                    style={styles.alternateCapture}>
                                <Video 
                                    name="video"
                                    size={28} 
                                    color="#f8f8ff"
                                />
                            </TouchableOpacity>  
                        </View>  
                </View>
                </Modal>
                <GPSLocationLogic customProp={handleData} />
                </RNCamera>
            </View>
        );
    }
    takePicture = async () => {
        if (camera){
            const options = {quality: 1, base64: true};
            const data = await camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
         
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#ffffff', 
        padding: 15,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 15,
        alignContent:'center',
        borderRadius: 100,
        
    },
    alternateCapture:{
        flex: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.8)', 
        padding: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 15,
        alignContent:'center',
        borderRadius: 10,
    },
    turnViewOff: {
        flexDirection: 'row',
    },
    turnViewOn: {
        flexDirection: 'row',
        
    },
    
});

AppRegistry.registerComponent('App', () => PhotoLogic);
