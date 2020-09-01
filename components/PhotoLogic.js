import React, { PureComponent, useState} from 'react';
import { 
    AppRegistry,
    StyleSheet, 
    TouchableOpacity, View, Modal,
    Dimensions,
    Image,
    Text,
    PermissionsAndroid,
    ActivityIndicator,
    Platform,
    Pressable,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import FlashOff from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-vector-icons/Feather';
import GPSLocationLogic from './GPSLocationLogic';
import { TextInput } from 'react-native-gesture-handler';
import CameraRoll from "@react-native-community/cameraroll";
import ImageMaker, { ImageFormat } from "react-native-image-marker";
import Marker from 'react-native-image-marker';




TouchableOpacity.defaultProps = { activeOpacity : 0.8};
export default function PhotoLogic ({ props, navigation }) {
    const falseValue = 'false';
    const trueValue = 'true';

     
    // states to hold data from GPSLocation file
    const[state, setState] = useState({
        permissionEnable : true,
        disableCameraView: '',
        accuracyValue: 0,
    });

    // states to hold data from Camera
    const[camState, setCamState]= useState({
        path : null,                        // path of image saved.
        pathStatus: false,
        focusedScreen: null,
        pathBase64: null,
    })

    // this state holds the coordinates of the image on capture
    const[capturedImageState, setCapturedImageSate] = useState({
        capturedImageLatitude: null,
        capturedImageLongitude: null,
        capturedImageDate: null,
        capturedImageDateTime: null,
        //state for watermark
        loading: null,  
        saveFormat: ImageFormat.png,
        base64: false,
        markResult: ' ',
    })
    
    /**
     * This method handles the accuracy of the coordinates  from GPSLocation
     */
   let handleData = (value) => {
        
         let setAccuracyValue = value.isWithInAccuracy;
         let setDisableCameraView = value.disableCameraButton;

         //sets the value of coordinates from GPSLocationLogic
         let setPreviewImageLongitude = value.longitude;
         let setPreviewImageLatitude = value.latitude;
         let setPreviewImageDate = value.date;
         let setPreviewImageDateTime = value.dateTime;

         console.log('accuracy value on camera: ' +  setAccuracyValue); //text passed accuracy
         console.log('disabled view : '+ setDisableCameraView)
         console.log('coordinates appearing on preview: ' + value.longitude + ',' + value.latitude)
         setState({
            accuracyValue : setAccuracyValue,
            disableCameraView : setDisableCameraView, 
        }),
        //this sets the value of co-ordinates , date and time on the preview image
         setCapturedImageSate({
             capturedImageLatitude: setPreviewImageLatitude,
             capturedImageLongitude: setPreviewImageLongitude,
             capturedImageDate: setPreviewImageDate,
             capturedImageDateTime: setPreviewImageDateTime,
         })
       
        
    }
    //console check of accuracyValue and disableCameraView
    console.log ('yep: '+state.accuracyValue);
    console.log('tey: '+ state.disableCameraView);

    // //if component did mount check the following
    // componentDidMount() 
    // {
    //     navigation.addListener('willFocus', () => 
    //     setCamState({focusedScreen: true,}) 
    //     );
    //     const { navigation } = AppRegistry.props;
    //     navigation.addListener('willFocus', () => 
    //     setCamState({focusedScreen: false,})
    //     );
    // }
    /**
     * This method takes photo on capture press.
     */
    const takePicture = async () => {
        if (camera){
            const options = {quality: 1, 
            base64: true,
            };
            const data = await camera.takePictureAsync(options);
            console.log("the data bas64 being used = " +data.base64)
          
            setCamState({
                pathBase64: data.base64,
                path: data.uri,
                pathStatus: true,
               
            });
            { console.log('this is the path' + camState.path)}
            { console.log('this is the data.uri' + data.uri)}
            //This method creates water mark on image captured
            { console.log('WATERMARK')}
             createWaterMark();
        }
        
    };

    //This method passes coordinates and time to watermark
    let returnCordPrintedOnImage = () => {
        return (
            <View >
                <Text style={{fontSize: 15, color: '#E6E4E4'}}>
                    {capturedImageState.capturedImageLatitude + ', ' + capturedImageState.capturedImageLongitude}
                
                </Text>
                <Text style={{fontSize: 15, color: '#E6E4E4'}}>
                    { capturedImageState.capturedImageDate + " "+ capturedImageState.capturedImageDateTime}
                    
                </Text>
        </View>
        )
    }

    // function to create water mark
    function createWaterMark (){
        setCapturedImageSate({
            loading: true,
        })
        
        Marker.markText({
        src: camState.path,
        text: capturedImageState.capturedImageLatitude +" " + capturedImageState.capturedImageLongitude +'\n'+
                 capturedImageState.capturedImageDate + ","+ capturedImageState.capturedImageDateTime,

        position: 'bottomCenter',
        color: '#E6E4E4',
        fontName: 'Arial-BoldItalicMT',
        fontSize: 44,
        shadowStyle: {
            dx: 10.5,
            dy: 20.8,
            radius: 20.9,
            color: '#ff00ff'
        },
        scale: 1,
        saveFormat: capturedImageState.saveFormat,
        quality :100
        }).then ((res) => {
            setCapturedImageSate({
                loading: false,
                markResult: res,
            })
            //saves water mark path to cameraroll
            savePicture(res);
            console.log("water mark save to path" + res)
        }).catch(( err ) => {
            console.log(err)
            setCapturedImageSate({
                loading: false,
                err
            })

        })
  
    }
    //requested Permissions to save data
    async function hasAndroidPermission() {
       
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        //checks the permission response from the user (whether accepted or denied)
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission){
            return true;
            //save image in album
        }

        //return status of storage permission
        const status = await PermissionsAndroid.request(permission);
        // this can be used when status is required to perform certain action
        return status == 'granted';
    }

    //function to save Image
    async function savePicture(path){
        let imageUri = path;
        //if permission denied do this or save picture
        if  (Platform.OS == "android" && !(await hasAndroidPermission() )){
            //returns this if permission denied
            return;
            console.log('Image NOT Saved in Election Watch folder');
        }
        CameraRoll.save(imageUri, {type:'photo', album: 'ElectionWatchFolder'});
        console.log('Image Saved in Election Watch folder');
        
    }

    //this method navigate to evidence page with data from photo
//    const  navigateToEvidenceScreen = () =>{
//         navigation.navigate('EvidenceSubmission' ,
//                         {
//                         transferredImage: camState.pathBase64,
//                         getLatitudeTransferred: capturedImageState.capturedImageLatitude,
//                         getLongitudeTransferred: capturedImageState.capturedImageLongitude,
//                         getDateTransferred: capturedImageState.capturedImageDate,
//                         getTimeTransferred: capturedImageState.capturedImageDateTime,
//                         })
//     }
    
    

    /**
     * This method calls camera to take picture
     */
  const  renderCamera = ()=>{
    
        return(
        
         <RNCamera
            ref={(ref) => {
                camera = ref;
            }}
             style = {styles.preview}
             type={RNCamera.Constants.Type.back}
             flashMode={RNCamera.Constants.FlashMode.off}
             autoFocus={RNCamera.Constants.AutoFocus.on}
             whiteBalance={RNCamera.Constants.WhiteBalance.auto}
             zoom= {0}
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
          
            <View style={{alignItems:'flex-start',
                flexDirection: 'row', 
                justifyContent:'space-between', 
                flex:4,
                alignSelf: 'stretch'}}>
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
                       style={{margin:15, alignContent: 'center'}}
                    />   
                   <Icon
                       name={'map-marker-alt'}
                       size={23}
                       color="white"
                       style={{margin:15, alignContent: 'center'}}
                    />  
                </View>
               <View
                    style={{alignSelf: 'stretch',
                    flex: 0.35,
                    alignContent:'center'}}>
                    <GPSLocationLogic customProp={handleData} />
                </View>  
               <View style={{
                       flex: 0., 
                       flexDirection: 'row', 
                       alignSelf:'stretch',
                       justifyContent: 'center'
                   }}>
                   
                   <View 
                   flexDirection='row' 
                   pointerEvents={(state.disableCameraView)? 'none': 'auto'} //change first auto to none to use accuracy detection
                   opacity={(state.disableCameraView===false)? 1 : 0.5}
                   style={{
                      marginBottom: 25,
                   }}>
                       <Pressable
                           disabled={false}
                        //    onPress={ takePicture }
                           onPressIn={()=>{
                                takePicture(); 
                            }
                           }
                           onPressOut={()=>{
                                // navigateToEvidenceScreen();
                                navigation.navigate('EvidenceSubmission');
                            }
                           }
                           
                           style={styles.capture}>

                           <Icon
                               name="camera"
                               size={28}
                               color="#1D5179"/>
                        </Pressable>

                        <Pressable
                               disabled={false}
                            //    onPress={takePicture} 
                               style={styles.alternateCaptureVideo} >

                           <Video 
                               name="video"
                               size={28} 
                               color="#f8f8ff"
                           />
                       </Pressable>  
                   </View>  
                </View>
                 
           </RNCamera>   
        );
    }


    /**
     * This method calls the PreView
    */
    const renderPreviewImage =()=>{
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
                        onPress={()=> navigation.popToTop('PhotoLogic')}
                    />
                   
                </View>

                <View
                    style={{ marginBottom: 15}}> 
                    {/* <TouchableOpacity 
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
                    </TouchableOpacity> */}
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
                            style={{alignSelf: 'center', marginLeft:0, }}>
                            
                            <Image style={{width: 49 , height: 39, borderRadius:5}}
                            source = { require('../assets/send.png') }/>
                        </TouchableOpacity>  
                    </View>  

                 </View>
            </Modal>
            
            <View>
                <Image
                style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode:'cover'}}
                source={{uri: camState.path}}/>
                <View style={{ position: 'absolute', top: 350, left: 0, right: 0, height: 300, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 15, color: '#E6E4E4'}}>
                        {capturedImageState.capturedImageLatitude + ', ' + capturedImageState.capturedImageLongitude}
                        {console.log('text on image did mount successfully')}
                    </Text>
                    <Text style={{fontSize: 15, color: '#E6E4E4'}}>
                        { 'Date :' + capturedImageState.capturedImageDate + ' Time :' + capturedImageState.capturedImageDateTime}
                        {console.log('text on image did mount successfully')}
                     </Text>
                </View>

            </View>

        </View>
        );
    }

    return (  
        <View style={styles.container}>
            {/* { camState.path ? renderPreviewImage() : renderCamera() } */}
            { renderCamera() }
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
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
    },
    alternateCaptureVideo:{
        flex: 0,
        backgroundColor: '#212121',
        padding: 15,
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
        borderWidth : 1,
        borderColor: 'red',
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
