import React, { PureComponent, useState} from 'react';
import { 
    AppRegistry,
    StyleSheet, 
    TouchableOpacity, View, Modal,
     BackHandler,
     Dimensions,
     Image,
     Text,
     ImageBackground,
     CameraRoll,
    } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PhotoVideo from 'react-native-vector-icons/FontAwesome5';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import FlashOff from 'react-native-vector-icons/Ionicons';

import Video from 'react-native-vector-icons/Feather';
import  GPSLocationLogic from './GPSLocationLogic';
import { acc, set } from 'react-native-reanimated';
import EvidenceSubmission from './EvidenceSubmission';
import { NavigationEvents } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';




TouchableOpacity.defaultProps = { activeOpacity : 0.8};
export default function PhotoLogic ({ navigation},props) {
    const falseValue = 'false';
    const trueValue = 'true';

     
    // states to hold data from GPSLocation file
    const[state, setState] = useState({
        permissionEnable : true,
        standardValue: 6,
        disableCameraView: '',
        accuracyValue: 0,
    });

    // states to hold data from Camera
    const[camState, setCamState]= useState({
        path : null,                        // path of image saved.
        pathStatus: false,

    })
   

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


    /**
     * This method takes photo on capture press.
     */
    takePicture = async () => {
        if (camera){
            const options = {quality: 1, 
                base64: true,
            };
            const data = await camera.takePictureAsync(options);
            console.log(data.uri);
            setCamState({
                path: data.uri,
                pathStatus: true,
            });
        }
    };
  

    /**
     * This method calls camera to take picture
     */
    renderCamera = ()=>{
        return(
            <View style={styles.container}>
                <RNCamera
            ref={(ref) => {
                camera = ref;
            }}
             style = {styles.preview}
             type={RNCamera.Constants.Type.back}
             flashMode={RNCamera.Constants.FlashMode.auto}
             autoFocus={RNCamera.Constants.AutoFocus.on}
             whiteBalance={RNCamera.Constants.WhiteBalance.auto}
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
                justifyContent:'space-between', flex:1, }}>
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
                       backgroundColor: 'rgba(0, 0, 0, 0.5)',
                       justifyContent: 'center'
                   }}>
                   
                   <View 
                   flexDirection='row' 
                   pointerEvents={(state.disableCameraView)? 'auto': 'auto'} //change first auto to none to use accuracy detection
                   opacity={(state.disableCameraView===false)? 1 : 0.5}
                   style={{margin: 10,  }}>
                       {/* <TouchableOpacity
                           disabled={false} 
                        //    onPress={takePicture} 
                           style={styles.alternateCapture}>
                           <Image style={{width: 30, height: 28, }}
                            source = { require('../assets/imagesFolder.png') }/>
                       </TouchableOpacity> */}

                       <TouchableOpacity 
                           disabled={false}
                           onPress={takePicture} 
                           style={styles.capture}>

                           <Icon
                               name="camera"
                               size={28}
                               color="#1D5179"/>
                        </TouchableOpacity>

                        <TouchableOpacity 
                               disabled={false}
                            //    onPress={takePicture} 
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


    /**
     * This method calls the PreView
    */
    renderPreviewImage =()=>{
        return(
            <View>
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
                    <Icon
                        name={'map-marker-alt'}
                        size={23}
                        color="white"
                        style={{margin:15, alignContent: 'center'}}
                    />  
                </View>

                <View
                    style={{ marginBottom: 15}}> 
                    <TouchableOpacity 
                        disabled={false}
                        onPress={()=>{
                            setCamState({ path: null });
                            renderCamera;
                        }}
                        style={styles.capture}>
                        <Icon
                            name="camera"
                            size={28}
                            color="#1D5179"
                        />
                    </TouchableOpacity>
                </View>
                
 
                <View style={{
                        flex: 0.17, 
                        flexDirection: 'row', 
                        alignSelf:'stretch',
                        marginTop: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center'
                    }}>
                    
                    <View flexDirection='row' >
                        <TouchableOpacity
                            disabled={false} 
                            style={{alignSelf: 'center', 
                            marginRight: 15,
                            marginLeft: 10, }}>
                            <Image style={{width: 30, height: 28, }}
                            source = { require('../assets/imagesFolder.png') }/>
                        </TouchableOpacity>

                        <View style={{width: 0.5, height:35, backgroundColor:'white', alignSelf:'center', marginRight: 0}}/> 
                        
                        <TextInput style={{ width: 210, height: 50,
                        fontSize:18,
                        fontFamily:'roboto',
                        margin:15,
                        marginLeft: 5,
                        alignSelf: 'center'}}
                        placeholder=" Add a caption..."
                        placeholderTextColor='#B5B5B5'
                        maxLength={100}
                        multiline={true}
                        enablesReturnKeyAutomatically={true}>
                        </TextInput>
                   
                        <TouchableOpacity 
                            disabled={false}
                            style={{alignSelf: 'center', marginLeft:0, }}
                            onPress={() => {
                            setCamState({ path: null })}
                        }>
                            <Image style={{width: 49 , height: 39, borderRadius:5}}
                            source = { require('../assets/send.png') }/>
                        </TouchableOpacity>  
                    </View>  

                 </View>
            </Modal>
            
                <Image
                    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}
                    source={{uri: camState.path}}
                />

            </View>
        );
    }

    return (  
        <View style={styles.container}>
            { camState.path ? renderPreviewImage() : renderCamera() }
        </View>
    );
}
    
  

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#000'
         
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        
    }, 
    capture: {
        flex: 0,
        backgroundColor: '#ffffff', 
        padding: 15,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
    },
    alternateCapture:{
        flex: 0,
        backgroundColor: '#212121',
        padding: 15,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        fontWeight: '600',
        fontSize: 18,
    },
   
    turnViewOff: {
        flexDirection: 'row',
    },
    turnViewOn: {
        flexDirection: 'row',
        
    },

    
});

AppRegistry.registerComponent('App', () => PhotoLogic);
