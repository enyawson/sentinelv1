import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Modal, Image} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PhotoVideo from 'react-native-vector-icons/FontAwesome5';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import FlashOff from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-vector-icons/Feather';
import GPSLocationLogic from './GPSLocationLogic';

TouchableOpacity.defaultProps = { activeOpacity : 0.8};
export default function PhotoLogic (props) {

        return (
            <View style={styles.container}>
            
                <RNCamera
                 ref={(ref) => {
                     camera = ref;
                 }}
                  style = {styles.preview}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.auto}
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
                            style={{margin:15, alignContent: 'center'}}/>

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
                    <View style={{flex: 1, flexDirection: 'row', alignSelf:'stretch',
                    marginTop: 500,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    justifyContent: 'center'
                     }}>
                        <TouchableOpacity 
                            onPress={takePicture} 
                            style={styles.alternateCapture}>
                            <PhotoVideo name="photo-video" size={28} color="#f8f8ff"/>
                         </TouchableOpacity>
                         <TouchableOpacity 
                            onPress={takePicture} 
                            style={styles.capture}>
                            <Icon name="camera" size={28} color="#1D5179"/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={takePicture} 
                            style={styles.alternateCapture}>
                            <Video name="video" size={28} color="#f8f8ff"/>
                         </TouchableOpacity>    
                </View>

                </Modal>


                {/* <GPSLocationLogic /> */}
                </RNCamera>

                

                
            </View>
        );
    }
    takePicture = async () => {
        if (camera){
            const options = {quality: 0.5, base64: true};
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
    
});

AppRegistry.registerComponent('App', () => PhotoLogic);
