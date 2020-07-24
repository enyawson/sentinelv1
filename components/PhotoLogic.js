import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import GPSLocationLogic from './GPSLocationLogic';

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
                 <GPSLocationLogic />
                </RNCamera>

                

                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity 
                    onPress={takePicture} 
                    style={styles.capture}>
                       <Icon name="camera" size={35} color="#1D5179"/>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'black',  
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        padding: 15,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 15,
        alignContent:'center',
        borderRadius: 100,
        
    },
    
});

AppRegistry.registerComponent('App', () => PhotoLogic);
