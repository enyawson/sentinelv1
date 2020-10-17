import React, { PureComponent, useState, useEffect} from 'react';
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
    Pressable,ImageBackground
   
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import FlashOff from 'react-native-vector-icons/Ionicons';
import Stop from 'react-native-vector-icons/Ionicons';
import Play from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-vector-icons/Feather';
import Pause from 'react-native-vector-icons/Ionicons';
import GPSLocationLogic from './GPSLocationLogic';
import { TextInput } from 'react-native-gesture-handler';
import CameraRoll from "@react-native-community/cameraroll";
import ImageMaker, { ImageFormat } from "react-native-image-marker";
import Marker from 'react-native-image-marker';
import AsyncStorage from '@react-native-community/async-storage';
import { red } from '@material-ui/core/colors';

TouchableOpacity.defaultProps = { activeOpacity : 0.3};

export default function PhotoLogic ({ props, navigation }) {
  
    // const falseValue = 'false';
    // const trueValue = 'true';
 
    // states to hold data from GPSLocation file
    const[state, setState] = useState({
        permissionEnable : true,
        disableCameraView: '',
        accuracyValue: 0,
    });

    //checks if async storage is saved
    const [imageSaved, setImageSaved] = useState(false)
    const [imagePreview, setImagePreview] = useState("")
    const [imageUri, setImageUri] = useState("");
    const [imageState, setImageState] = useState('false')
    const [renderingImage, setRenderingImage] =useState(false)
  
    
    //State of Video
    const [ isRecording, setIsRecording]=useState(false);
    const [videoUri, setVideoUri] = useState(" ")
    const [videoComponent, setVideoComponent] = useState({
        toggleVideoButton: false,
        togglePauseButton: false,
        toggleResumeButton: false,
        toggleCameraButton: false,
    })

    // states to hold data from Camera
    const [camState, setCamState]= useState({
        pathStatus: false,
        focusedScreen: null,
        pathBase64: null,
        recordOptions: {
            mute: false,
            maxDuration: 5,
            quality: RNCamera.Constants.VideoQuality['288p'],
        },
        ratio: '16:9',
        zoom: 0,
        timeForCapture: Date.now(),
        count: 0,
    })

    // this state holds the coordinates of the image on capture
    const[capturedImageState, setCapturedImageState] = useState({
        capturedImageLatitude: null,
        capturedImageLongitude: null,
        capturedImageDate: null,
        capturedImageDateTime: null,
        //state for watermark
        loading: null, 
        loadingIconMark: null, 
        saveFormat: ImageFormat.png,
        base64: false,
        uri: ' '
    })

    useEffect(() => {
        console.log("Photo component is mounting");
        console.log ('status of toggleVideoButton :'+ videoComponent.toggleVideoButton);
        // console.log("ImageUri Value after mount Taking Photo " + imageUri);
        // console.log("Video Uri after mount "+ videoUri);
        console.log("ToggleVideoButton state "+ videoComponent.toggleVideoButton);
        console.log("TogglePauseButton state "+ videoComponent.togglePauseButton);
        return () => {
            
        }
    }, [imageUri, videoComponent.toggleVideoButton, videoComponent.togglePauseButton])
    
    //test function 
    // const testFunc =()=> {
    //     const testIt = !text;
    //     setText(testIt);
    //     console.log("Text Value After called" + testIt);

    // }
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

        //  console.log('accuracy value on camera: ' +  setAccuracyValue); //text passed accuracy
        //  console.log('disabled view : '+ setDisableCameraView)
        //  console.log('coordinates appearing on preview: ' + value.longitude + ',' + value.latitude)
         setState({
            accuracyValue : setAccuracyValue,
            disableCameraView : setDisableCameraView, 
        }),
        //this sets the value of co-ordinates , date and time on the preview image
         setCapturedImageState({
             capturedImageLatitude: setPreviewImageLatitude,
             capturedImageLongitude: setPreviewImageLongitude,
             capturedImageDate: setPreviewImageDate,
             capturedImageDateTime: setPreviewImageDateTime,
         })
       
        
    }
    //console check of accuracyValue and disableCameraView
    // console.log ('yep: '+state.accuracyValue);
    // console.log('tey: '+ state.disableCameraView);

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
           
        }
        CameraRoll.save(imageUri, {type:'photo', album: 'ElectionWatchFolder'});
        console.log('Image Saved in Election Watch folder');      
        
}

const saveImage2 = async (res) => {
    let photos = await AsyncStorage.getItem('photos');
    photos = photos ? JSON.parse(photos) : [];
    if (res) {
        photos.push(res);
        await AsyncStorage.setItem('photos', JSON.stringify(photos), () => {
            console.log('rendering status before turned off ,'+ renderingImage)
            setRenderingImage(false);
            console.log("renderingImage status after image saved "+ renderingImage)
            
            navigation.navigate('EvidenceSubmission');
        });
        console.log('ASYNC STORAGE WORKED'+ photos);
    }
}
// This method saves image asynchronous
const saveImage = async(res) => {
        // const value= await AsyncStorage.getItem('photo')
        // const photo= await AsyncStorage.getItem('photos')
        AsyncStorage.getItem('photos').then((photos) => {
        const photo = photos ? JSON.parse(photos) : [];
        photo.push(res);
        AsyncStorage.setItem('photos', JSON.stringify(photo));
        console.log("ASYNC STORAGE WORKED : "+photo)
       
        // /**Navigate to Evidence page */
        //navigation.navigate('EvidenceSubmission')

         /**boolean to resume camera before navigation */
         setRenderingImage(false);
    }); 
}

// create water mark - 2
const createNewWaterMark = (path) => new Promise((resolve, reject) => {
    setRenderingImage(true)
    setCapturedImageState({loading: true})
    Marker.markText({
        src: path,
        text: capturedImageState.capturedImageLatitude +" " + capturedImageState.capturedImageLongitude +'\n'+
            capturedImageState.capturedImageDate + ","+ capturedImageState.capturedImageDateTime,

        position: 'bottomCenter',
        color: '#E6E4E4',
        fontName: 'Arial-BoldItalicMT',
        fontSize: 30,
        shadowStyle: {
            dx: 10.5,
            dy: 20.8,
            radius: 20.9,
            
        },
        scale: 1,
        saveFormat: capturedImageState.saveFormat,
        quality :100
    })
    .then(async (res) => {
        console.log("renderingImage status after picture taken, "+ renderingImage)
        saveImage2(res);
        resolve(true)
    })
    .catch((err) => reject(err))
})

// function to create water mark
 const createWaterMark = async (path) => {
        setCapturedImageState({
            loading: true,
    })
    
    Marker.markText({
    src: path,
    text: capturedImageState.capturedImageLatitude +" " + capturedImageState.capturedImageLongitude +'\n'+
        capturedImageState.capturedImageDate + ","+ capturedImageState.capturedImageDateTime,

    position: 'bottomCenter',
    color: '#E6E4E4',
    fontName: 'Arial-BoldItalicMT',
    fontSize: 30,
    shadowStyle: {
        dx: 10.5,
        dy: 20.8,
        radius: 20.9,
        
    },
    scale: 1,
    saveFormat: capturedImageState.saveFormat,
    quality :100
    }).then (async (res) => {
 
        //create icon soft masters on image
        //const imageUri = capturedImageState.markResult;
        //createIconMark(res)
        //saves water mark path to camera roll
        const saveNewImage = capturedImageState.uri
        /**save image in async photo stor */
        await saveImage(res);
    }).catch(( err ) => {
        console.log(err)
        setCapturedImageState({
            loading: false,
            err
        })
    })   
}

//create icon mark on water marked image
function createIconMark(imageUri){
        const iconUri = require("../assets/Softmasters_watermark_logo.png");
        const  backgroundImage = imageUri;
        setCamState({
            loadingIconMark: true,
        })
        Marker.markImage({
                src: backgroundImage,
                markerSrc: iconUri, //icon uri
                X: 50,  //left
                Y: 150, //top
                scale: 1,  //scale of background
                markerScale: 0.5, // scale of icon
                quality: 100, //quality of image
                saveFormat: capturedImageState.saveFormat,
        }).then((path) => {
            setCapturedImageState({
                uri: Platform.OS === 'android'? 'file://' + path : path,
                loading: false
            })
            console.log("IMAGE water mark set ");
        }).catch((err) => {
            console.log(err, 'err')
            setCapturedImageState({
                loading:false,
                err
            })
        })   
}

//  this method navigate to evidence page with data from photo
const  navigateToEvidenceScreen = (path) =>{
    navigation.navigate('EvidenceSubmission',
    {
        transferredImage: path,
        //countImageAdded: camState.count,
        // getLatitudeTransferred: capturedImageState.capturedImageLatitude,
        // getLongitudeTransferred: capturedImageState.capturedImageLongitude,
        // getDateTransferred: capturedImageState.capturedImageDate,
        // getTimeTransferred: capturedImageState.capturedImageDateTime,
        // getTimeOfTransfer: camState.timeForCapture,
    })
        console.log("NAVIGATION output of path " + path)
}

/**set video uri */
const setStateOfVideoUri = (uriFromVideo)=> {
    setVideoUri(uriFromVideo);
}
/** set state of image uri */
const setStateOfImageUri = (dataUri)=>{
    setImageUri(dataUri);
    console.log("state of imageUri after Pic taken " + imageUri);
}
/**
 * This method takes photo on capture.
 * 
 */
const takePicture = async () => {
    if (camera){
        const options = {quality: 1, 
        base64: false,
        pauseAfterCapture: false
        };
        const data = await camera.takePictureAsync(options);
        //set image path to state
        setStateOfImageUri(data.uri);
        //set status of image state
        if(imageUri){
            setImageState(true)
            console.log("image state"+ imageState)
        }
        //print date and time on image
        const status  = await createNewWaterMark(data.uri);
        console.log("Done creating a water and Status is: ", status);
    }
    //count number of pictures added
    setCamState({
        count: (camState.count) + 1,
    })  
    
}; 



const takeVideo = async () => {
        
        //console.log('is Recording takeVideo status : '+ isRecording)
        if (camera && !isRecording) {
            try {
                const promise = camera.recordAsync(camState.recordOptions);
                if (promise){
                    setIsRecording({isRecording: true});
                    const data = await promise;
                    
                    const videoPath = await data.uri
                   
                    console.log("VideoPath after video capture : " + videoPath)
                    console.log('Video Taken', data)
                    setVideoUri( await videoPath);
                    console.log('video uri : '+ videoUri);
                    saveImage2(videoPath)
                }
             } catch (e){
                 console.error(e);

             }
        }
};

const renderRecording = () =>{
    console.log('is Recording status : '+ isRecording)
    if(isRecording){
        stopVideo();
        renderStopRecBtn();
    }else{
        takeVideo();
        console.log('isRecording status in takeVideo : '+ isRecording)
        renderRecBtn();
        
    }
    // const backgroundColor = isRecording ? 'white' : 'black';
    // const action = isRecording ? stopVideo() : takeVideo();
    // const button = isRecording ? renderStopRecBtn(): renderRecBtn();
    // return (
    //     <View style={styles.container}>
    //          <TouchableOpacity
    //         style={[styles.flipButton, {flex: 0.3, alignSelf: 'flex-end', backgroundColor,}]}
    //         onPress={()=> action()}
    //     >
    //     {button}
    //     </TouchableOpacity>
        
    //     </View>
       
    // );
}

const stopVideo = async () => {
    await camera.stopRecording();
    setIsRecording({isRecording: false});
    console.log('is Recording value after stop video :'+ isRecording)
};

// const renderRecBtn =() => {
//     console.log("RECORDING.............")
//     return (
//         <View>
//             <Text>
//                Recording...... 
//             </Text>
//         </View>
//     )
// }

// const renderStopRecBtn = () => {
//     console.log("STOP VIDEO")
//     return (
//         <View>
//             <Text>
//                Stop
//             </Text>
//         </View>
//     )
// }

/**On Press stop render video component is set to null */
// const renderVideoComponentOff = ()=> {
//     const newState = !videoComponent.toggleVideoButton;
//     const toggleOnCamView = !videoComponent.toggleCameraButton;
   
//     setVideoComponent({
   
//         toggleVideoButton: newState,
//         toggleCameraButton: toggleOnCamView,
//     })
//     console.log('toggleVideoComponentButton to false '+ videoComponent.toggleVideoButton)
// }
/**Function to change video icon views*/
const renderVideoComponent = ()=> {
    //set video state to true to turn display of camera button to none
    const newState = !videoComponent.toggleVideoButton;
    //turn camera button to true
    let toggleCamView = !videoComponent.toggleCameraButton
    setVideoComponent({
       toggleVideoButton: newState,
       toggleCameraButton: toggleCamView,
   })
   console.log('status of toggleVideoButton onclick :'+ videoComponent.toggleVideoButton)
   
}


/**Function to to turn off take picture Button */
const renderPauseButton=()=>{
     let togglePause = !videoComponent.togglePauseButton;

     setVideoComponent({
         togglePauseButton: togglePause,
    })
    console.log("status pause onclick : "+ videoComponent.togglePauseButton)
    console.log("status of toggle pause "+ togglePause);
}

/**
 * This method calls camera to take picture
 */
const renderCamera = ()=>{
    
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
            zoom= {state.zoom}
            focusDepth={state.depth}
           
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
            captureAudio={true}
        >
        
        <View style={{alignItems:'flex-start',
            flexDirection: 'row', 
            justifyContent:'space-between', 
            flex:4,
            alignSelf: 'stretch'}}>
                <TouchableOpacity
                onPress={()=> navigation.goBack()}>
                   <ArrowBack
                    name={'arrow-back-outline'}
                    size={23}
                    color="white"
                    style={{margin:15, alignContent: 'center'}}
                    
                />  
                </TouchableOpacity>
               
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
                    justifyContent: 'center',
                    
                }}>
                
                <View 
                flexDirection='row' 
                pointerEvents={(state.disableCameraView)? 'none': 'auto'} //change first auto to none to use accuracy detection
                opacity={(state.disableCameraView===false)? 1 : 0.5}
                style={{ marginBottom: 25, }}>
                {videoComponent.toggleCameraButton ==true? 
                    <View>
                        <View style={{display:'none'}}>
                            <TouchableOpacity
                                    style={styles.cameraCapture}
                                    onPress={takePicture}
                            >
                                <Icon name="camera" size={28} color= '#1D5179'/>
                            </TouchableOpacity>        
                        </View>
                        <View>
                            {/* {videoComponent.togglePauseButton == true? 
                                <View>

                                </View>
                                : */}
                                
                                    <TouchableOpacity
                                        style={styles.stop}
                                    >
                                        <Stop 
                                        name ="stop" 
                                        size ={28} 
                                        color = '#d0021b'
                                        />
                                    </TouchableOpacity>  
                             

                            {/* } */}
                                  
                         </View>
                     </View>
                    :
                    <View>
                        <TouchableOpacity
                        style={styles.cameraCapture}
                        onPress={takePicture}>
                            <Icon name="camera" size={28} color= '#1D5179'/>
                        </TouchableOpacity>      
                    </View>
                
                } 
                    <View>
                        <TouchableOpacity
                        disabled={false}
                        style={styles.video} >
                            {videoComponent.toggleVideoButton? 
                                <TouchableOpacity
                                >
                                    <Pause
                                    name="pause"
                                    size={28} 
                                    color="#fff"
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                     onPress= {()=> renderVideoComponent()}>
                                    <Video 
                                    name="video"
                                    size={28} 
                                    color="#f8f8ff"
                                    
                                    /> 
                                </TouchableOpacity>
                                    
                                
                            }
                        </TouchableOpacity>  
                    </View>
                    
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
            <View >
                <ImageBackground style={styles.preview}
                source = {{uri:'file//'+imagePreview}}/>
            </View>  
        );
        
}

    return (  
        <View style={styles.container}>
            {/* { imagePreview? renderPreviewImage() : renderCamera() } */}
            { renderCamera() }
              {renderingImage &&  
                <ActivityIndicator
                size='large'
                color='#fff'
                style={styles.activityIndicator}
                animating={renderingImage}
                />}
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
    activityIndicator: {
       
        color: 'blue',
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
        alignSelf:'center'
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
    onPressCapture: {
        flex: 0,
        backgroundColor: '#ffff', 
        padding: 15,
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
       
        borderWidth: 3,
        elevation: 5,
        width: 70,
        height: 70,
        position: 'absolute',
        
        
    },
    overlapButtonView: {
        flexDirection: 'column',
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
    stop:{
        flex: 0,
        backgroundColor: '#212121',
        padding: 15,
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
        borderWidth : 1,
        borderColor: 'gray',
    },
    video:{
        flex: 0,
        backgroundColor: '#212121',
        padding: 15,
        alignSelf: 'center',
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
        borderWidth : 1,
        borderColor: 'gray',
    },
    alternateStop:{
        flex: 0,
        backgroundColor: '#212121',
        alignSelf: 'center',
        padding: 12,
        margin: 10,
        alignContent:'center',
        borderRadius: 100,
        elevation: 5,
        borderWidth : 1,
        borderColor: 'gray',
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
    flipText: {
        color: 'white',
        fontSize: 30,
    },
    flipButton:{
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});

AppRegistry.registerComponent('App', () => PhotoLogic);
