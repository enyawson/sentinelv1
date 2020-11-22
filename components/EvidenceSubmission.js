import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform,Dimensions, Button, Keyboard,
} from 'react-native';
import globalStyle from '../components_styles/globalStyle';
import { ScrollView, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { Picker } from '@react-native-community/picker';
import Microphone from 'react-native-vector-icons/FontAwesome5';
import  Add from 'react-native-vector-icons/Ionicons';
import  Icon from 'react-native-vector-icons/Ionicons';
import  Trash from 'react-native-vector-icons/Ionicons';
import CameraRoll from "@react-native-community/cameraroll";
import AsyncStorage from '@react-native-community/async-storage';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import { set } from 'react-native-reanimated';
import Play from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
import {APIKEY, TOKEN_URL, SUBMIT_INCIDENT} from '../components/ConstantUrls';




export default function EvidenceSubmission ({route, navigation,navigation:{setParams}}){

    const [selectedIncidence, setSelectedIncidence] = useState('select incidence');
    const [description, setDescription] = useState("");
   // const [timeFileTaken, setTimeFileTaken] = useState('4:50');
    const [location, setLocation] = useState('')
    //const [locCoordinates,setLocCoordinates] = useState('5.65544, -4556644')
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [picDetails, setPicDetails] = useState(" ");
    //const [dateFileTaken, setDateFileTaken] = useState('21/10/2020')
    const [mp4Extension, setMp4Extension] = useState(false);

    const [generateToken, setGenerateToken]= useState('');
    const [dataToServer, setDataToServer] = useState([])

    
  


    /**navigated image */
   // const { transferredImage } = route.params
    /**component did mount , component will unmount */
    useEffect(()=> {
        console.log('EVIDENCE USE_EFFECT,  mounted');
        /*Get the stored captured images from async storage*/   
        getData();
        getPicDetails();
        /*get the saved description and incidence*/
        getIncidenceDescription();

        /**all images saved in storage */
        //getMainActivityListData();
        //sendDataToServer();

        /**generate token */
        const data = JSON.stringify({"apikey": APIKEY});
        const config = {
            method: 'post',
            url: TOKEN_URL,
            headers:{
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            data : data,
        };
        axios(config)
        .then(function (response){
        
        //console.log(JSON.stringify(response.data.data.accessToken));
        let tokenValue = JSON.stringify(response.data.data.accessToken);
        setGenerateToken(tokenValue);
        //console.log("just appeared",tokenValue)
        
        })
        .catch(function (error){
        console.log(error);
        })
       
        
        /**sending data to server */
        sendDataToServer();
       
       
        /**component will unmount */
        return ()=> { 
            //saveIncidenceDescription()
           // console.log("report page unmounted")
        }
        
    }, []);

    
   

// *********************************************************************

   /*set the state of incident selected */
    const setIncidence = (itemSelected) => {
      setSelectedIncidence(itemSelected)
      console.log("Incidence " + itemSelected)
    }
    const setInputtedText = (inputtedText) => {
        setDescription(inputtedText)
        console.log("InputtedText "+ inputtedText)
    }
    /**on loading end */
    const _onLoadEnd = ()=> {
        setLoading(false)
    }
    const _onLoadStart = ()=> {
        setLoading(true)
    }


    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerLeft: () => (
    //        <TouchableOpacity onPress={() => 
    //        navigation.goBack()} >
    //            <Icon style = {{paddingLeft : 10}} name="arrow-back-sharp" size={26} color="white" />
    //        </TouchableOpacity>
            
    //       ),
    //     });
    // }, [navigation]);
   

  //*****************************************************************
   // this method takes another photo
   const addAnotherPhoto =()=> {
    //before adding a new photo, save state of text input
    saveIncidenceDescription();
    //then navigate to camera
    navigation.goBack();
   }

   //this method loops array images into Fetchblob path
const sendDataToServer =()=> {
    
    
//    // for loop to separate .jpg and .mp4 files
//     photos.forEach(function(item){
//         let ext = item.split('.').pop(); 
//         if (ext == 'mp4'){
//             evidenceVideos.push(item)
//             }else{
//             evidenceImages.push(item)
//         }
//     });
    //console.log(picDetails)
    //console.log("VIDEOS", evidenceVideos)
    // console.log("PHOTOS", evidenceImages)

    //This loop sends images
    for (let i=0; i < photos.length; i++){
        const evidenceImage = '';
        const evidenceVideo = '';
       let ext = photos[i].split('.').pop();
       if (ext == 'mp4'){
             evidenceVideo = photos[i];
        }
        if (ext == 'jpg'){
            evidenceImage = photos[i];
            console.log("image"+ i + " "+evidenceImage)
        }
        //pass individual files to server
        callRNFetchBlob(evidenceImage, evidenceVideo);  
        
    }

   }
   

  //Sending data to server RNFetchBlob
    const callRNFetchBlob = async(item1, item2)=> { 
    
        RNFetchBlob.fetch('POST', SUBMIT_INCIDENT, {
            Authorization : generateToken,
            otherHeader : APIKEY,
            // this is required, otherwise it won't be process as a multipart/form-data request
            'Content-Type' : 'multipart/form-data',
          }, [
            // incident image
            
            {
              
              name : 'incidentimage',
              filename : 'incidentImage.png',
              // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
              // Or simply wrap the file path with RNFetchBlob.wrap().
              data: RNFetchBlob.wrap(item1),
            },
            //incident video
            {
            name : 'incidentvideo',
            filename : 'incidentImage.png',
            // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
            // Or simply wrap the file path with RNFetchBlob.wrap().
            data: RNFetchBlob.wrap(item2)
            },
            // incidence type
            { name : 'type', data : selectedIncidence },
            // description
            { name : 'description', data : description },
            //latitude
            { name : 'latitude', data : picDetails.locationLat},
            //longitude
            { name : 'longitude', data : picDetails.locationLng},
            //street address
            { name : 'address', data : picDetails.streetName },
          ]).then((resp) => {
            console.log(resp);
          }).catch((err) => {
            // ...
        })
    }

    /**
    * This method clears Storage and gallery on submit, to 
    * allow new images into storage and gallery
    */
    const clearStorage= async() =>{
        try{
            await AsyncStorage.clear();
            console.log("Storage cleared")
        } catch(exception){
            console.log('error clearing  items');
    }
        
    //clear gallery
        setPhotos("")
        setDescription("")
        setSelectedIncidence("")
    }

    const evidenceSubmit = async () => {
        /**Clears storage*/
        //clearStorage();
        /**save data to be displayed on the activityList  in storage */
       // console.log("PHOTOS : "+ photos);
        await removeDataStored();
        await mainActivityListData();
        
        sendDataToServer(); 
        // navigate to submit form
        navigation.navigate('Home'); 
        
    }

    /**save incidence type and description */
    const saveIncidenceDescription = () => {
    let  storedObject = {};
    storedObject.incidenceValue = selectedIncidence;
    storedObject.descriptionText = description;

    try {
        AsyncStorage.setItem('allTextValue', JSON.stringify(storedObject));
        console.log("save incidence from storage", storedObject.incidenceValue)
        console.log("save description from storage", storedObject.descriptionText)
        
    }catch (error){
        console.log('error with saving incidence and description');
    }
    }
     /** This method gets incidence type and description*/
    const  getIncidenceDescription = async () => {
        try {
            let resObject = {};
            let infoValue = await AsyncStorage.getItem('allTextValue')
            resObject = JSON.parse(infoValue);
            console.log( "OBJECT BEING RECEIVED ",typeof resObject)
            setDescription(resObject.descriptionText)
            setSelectedIncidence(resObject.incidenceValue)
             console.log("Test inputted" + resObject.descriptionText)
             console.log("Incidence" + resObject.incidenceValue)

        } catch (error){
            console.log(error);
        }
    }

    /**Get Photos from async storage */
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('photos')
            // console.log('async Photo values', value);
            if(value !== null){
                setPhotos((JSON.parse(value)));
            }
            
        }catch(e){
        console.log('error with async getData');
        }     
         //console.log("photos state "+ photos[0])
    }
    /** This method gets the coordinates and time of image */
    const getPicDetails = async () => {
        try {
            const picDetailsValue = await AsyncStorage.getItem('activityListPicDetail')
            const value = JSON.parse(picDetailsValue);
            // console.log('async PicDetail values,'+ picDetailsValue);
            // console.log("Time on Pic "+ value.locationLat);
            if(value !== null){
                setPicDetails(value);
            }
        }catch(e){
        console.log('error with async getData');
        }     
       
         console.log('state picDetails '+ picDetails);
        // console.log('one of it '+ picDetails.locationLat);
    }
 
    /**This method clears storage for photos submitted to receive new ones */
    const removeDataStored = async () =>{
        try{
            await AsyncStorage.removeItem('photos');
            await AsyncStorage.removeItem('activityListPicDetail');
            await AsyncStorage.removeItem('allTextValue')
        }catch(e){
            console.log('error')
        }
        console.log('removed photos, picture details')
    }



    /** save image in an array 
     * evidence-files : consist of audio, videos, pictures
    */
    const mainActivityListData = async ()=> {
        let newData = {}

        newData.evidenceFiles = photos;
        newData.incidenceValue = selectedIncidence;
        newData.description = description;
        //newData.timeTaken = timeFileTaken;
        //newData.streetName = location;
        //picture details 
        newData.picDetail = picDetails;
       
        //newData.locationCord = locCoordinates;
        //newData.dateTaken = dateFileTaken;
        
        let data = await AsyncStorage.getItem('mainActivityData');
        data = data? JSON.parse(data) : [];
        
        data.push(newData);
        await AsyncStorage.setItem('mainActivityData', JSON.stringify(data), () => {    
            // console.log('MAIN ACTIVITY DATA '+ data);
            // console.log(data)
        });
        
        //clear files and text on evidence page after submitting
        setPhotos("")
        setDescription("")
        setSelectedIncidence("")
    }

    /** Get items in mainActivityList to send to the server */
    const getMainActivityListData = async ()=> {
        //     const value = await AsyncStorage.getItem('mainActivityData')
        //    setDataToServer(value);
        //    //console.log(value);
        try{
            const jsonValue = await AsyncStorage.getItem('mainActivityData')
            //console.log( " first json value ",typeof jsonValue)
            jsonValue != null ? JSON.parse(jsonValue) : null;

            const testJsonValue = JSON.parse(jsonValue);
            setDataToServer(testJsonValue);
           //console.log(testJsonValue[0])
     
        }catch(e){
            console.log('error getting data for server')
        }
        }
    
    //this method stores video path
    const storeData =async (value)=> {
        try{
            await AsyncStorage.setItem('previewVideoOrImage',value)
            } catch (e) {
                console.log('error saving video for preview')
            }
        }
/**
 * This method navigates to photo preview page
 * @param path image retrieved from flat list item in evidence page
 */
    const  navigateToPhotoPreview = (path) =>{
    //set the state of extension 
    let ext = path.split('.').pop();
    //console.log("show Preview ready")
    if (ext == 'mp4'){
        storeData(path);
        return(
            navigation.navigate( 'VideoPreview')
        );
    }
    if(ext == 'jpg')
    {
        return(
            navigation.navigate('PhotoPreviewer',{transferredImageItem: path})
        );  
    }
}
/**This method checks for the extension of file (jpg or mp4) */
const checkExtensionOfFile=(item)=>{
    //set the state of extension 
    let ext = item.split('.').pop();
    //console.log("Extension "+ ext);
    if (ext == 'jpg'){
         return(
            <Image
            onLoadStart={_onLoadStart}
            onLoadEnd={_onLoadEnd}
            style={{ width:115, height:214,margin:1, resizeMode:'cover'}}   
            source = {{ uri: "file://"+ item}}/>
     )
    } 
    if (ext == 'mp4'){
        return(
            <View>
                <Image
                onLoadStart={_onLoadStart}
                onLoadEnd={_onLoadEnd}
                style={{ width:115, height:214,margin:1, resizeMode:'cover'}}   
                source = {{ uri: "file://"+ item}}/>
                <View style={{ backgroundColor: 'black',
                 position:'absolute',justifyContent:'center',alignItems: 'center',margin:1,
                 width: 115 , height: 214,opacity:0.5}}>
                    <Play
                    name={'play-circle-outline'}
                    size={35}
                    color="white"/>   
                </View>  
            </View>
            )
            
    }
 }
    return(
        <View style= {{flex:1,}}>
         <StatusBar barStyle="light-content" backgroundColor="#174060"/>

         <ScrollView >
            <View flexDirection='column' flex={1.1} marginTop={30}  alignItems={'center'}
                marginRight ={5}
                marginLeft ={5}
                borderRadius={3}
                borderColor='#7E7E7E'>
                <FlatList
                    data= {photos}
                    keyExtractor={(item, index)=> index}
                    horizontal={true}
                    renderItem={ ({ item}) => (  
                        <TouchableOpacity onPress={() => navigateToPhotoPreview(item) }>
                        {checkExtensionOfFile(item)}
                      
                        </TouchableOpacity>   
                        )   
                    }
                
                />
                    <Text style={{fontSize:12}}>{picDetails.locationLat}  {picDetails.locationLng}</Text>
                    <Text style={{fontSize:12}}>{picDetails.dateTaken}</Text>
            </View>
            <TouchableOpacity style={styles.addPhotoButton}
                onPress={()=> addAnotherPhoto()}>
                <Add
                name={'add'}
                size={30}
                color="white"/>   
            </TouchableOpacity>
            <View style={{justifyContent: 'center',flex: 1.1, marginTop:'5%'}}>
                <View style={{borderWidth: 1,
                    alignSelf: 'center',
                    width:'90%',
                    borderColor:'#C4C4C4',
                    borderRadius:8,
                    marginBottom: 0,
    
                    marginTop: 10}}>
                    <Picker
                        selectedValue={selectedIncidence}
                        style={{height:40, fontSize: 0,
                        transform:[{scaleX:1.0},{scaleY:0.9}]
                        }}
                        
                        textStyle={{fontSize:10}}
                        onValueChange={(itemValue, itemIndex) =>
                        setIncidence(itemValue)
                        }
                    >
                    <Picker.Item label="select incidence type" value="" color="#898989"  />   
                    <Picker.Item label="No Incidence" value="non-Compliance"/> 
                    <Picker.Item label="Non-Compliance" value="non-Compliance"/>
                    <Picker.Item label="Logistics" value="logistics"/>
                    <Picker.Item label="Harassment" value="harassment"/>
                    <Picker.Item label="Interference" value="interference"/>
                    <Picker.Item label="Violence" value="violence"/>
                    <Picker.Item label="Delays" value="delays"/>
                    <Picker.Item label="Confusion" value="confusion"/>
                    <Picker.Item label="Chaos" value="chaos" />
                    <Picker.Item label="Power Failure" value="power failure"/>
                    </Picker>
                </View>
                <View marginBottom={0} marginLeft={'3%'} marginTop={'5%'} 
                 justifyContent={'center'} width={'90%'} alignSelf={'center'}>
                    <Text style={styles.textStyle}>
                        Description
                    </Text>
                </View>
                <View style={{flexDirection:'row', alignSelf:'center'}} >
                    <TextInput 
                        value={description}
                        style={{height: 70, 
                        width: '70%',
                        fontWeight:'600',
                        borderRadius: 10,
                        borderColor:'#C4C4C4',
                        borderWidth: 1, marginLeft: 0}}
                        onChangeText={(text) => 
                            setInputtedText(text)
                        }
                        textAlignVertical={'top'}
                        multiline={true}
                        placeholder={' enter text'}
                        fontSize={14}
                        enablesReturnKeyAutomatically={true}
                    > 
                    </TextInput> 
                    <TouchableOpacity style={styles.microphoneButton}
                    onPress={()=> navigation.navigate('AudioRecorder') } >
                        <Microphone name="microphone" 
                        size={21} 
                        color='white'
                        /> 
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                        style={{ 
                        
                       
                        position:'absolute',
                        bottom: 0,
                        left:0,
                        
                        backgroundColor:'blue',
                       
                        }}
                        onPress={()=> evidenceSubmit()}>
                        <Text style={{color:'white', 
                            alignSelf:'center',padding:5,
                            fontSize: 16,
                            }}>
                            Submit
                        </Text>
                </TouchableOpacity> 
                <KeyboardSpacer /> 
            </View>       
           
        </ScrollView>

        </View> 
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
    },
    text:{
        color: "#E6E4E4",
        fontSize: 6,
        opacity: 1,
    },
    image: {
        width: 90,
        height: 90,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    contentContainer: {
        paddingVertical: 20,
    },   
    moreIcon: {
        alignSelf: 'center',  
        justifyContent:'center',
        margin: 1,
    },
    moreView:{
        backgroundColor:'#E7E7E7',
        borderRadius:20,
        alignSelf:'center',
        elevation: 6,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 10,
    },
    textStyle:{
        fontSize: 14,   
        fontFamily: 'roboto',
        fontWeight: 'bold',
    },
    button: {
        width: 100,
        height: 45,
        margin: 10,
        marginTop: 30,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#1D5179',
        alignSelf:'center'
    },
    microphoneButton:{
        width: 48,
        height: 48,
        borderRadius:100,
        backgroundColor:'#1D5179',
        alignSelf: 'center',
        marginLeft: 15,
        justifyContent:'center',
        alignItems: 'center',
    },
    addPhotoButton:{
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        borderRadius: 100,
        backgroundColor: '#1D5179',
        position: 'absolute',
        right: 12,
        top: 5, 
    },
    playPhotoButton:{
        position:'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundColor: 'black',
        width: 68,
        height: 75,
        alignSelf:'center',
        opacity: 0.5,
    },
    trashButton: {
        width: 30,
        height: 40,
        marginLeft: 250,
        marginTop: 5,
        justifyContent: 'center',
    },
    radioButton: {
        width: 19,
        height: 19,
        borderRadius: 100,
        margin: 1.5,
    },
    radioCircumference: {
        borderRadius: 100, 
        borderWidth: 1, 
        borderColor:'black',
        width:24, 
        height: 24,
        marginTop: 7,
    },  
    activityIndicator: {
        color: 'blue',
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
        alignSelf:'center'
    }
})