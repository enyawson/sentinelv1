import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';
import globalStyle from '../components_styles/globalStyle';
import { ScrollView, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { Picker } from '@react-native-community/picker';
import Microphone from 'react-native-vector-icons/FontAwesome5';
import  Add from 'react-native-vector-icons/Ionicons';
import  Trash from 'react-native-vector-icons/Ionicons';
import CameraRoll from "@react-native-community/cameraroll";
import AsyncStorage from '@react-native-community/async-storage';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import { set } from 'react-native-reanimated';




export default function EvidenceSubmission ({route, navigation,navigation:{setParams}}){

    const [selectedIncidence, setSelectedIncidence] = useState('select incidence');
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    let dataToActivityList = [];


    /**navigated image */
   // const { transferredImage } = route.params
    /**component did mount , component will unmount */
    useEffect(()=> {
        console.log('EVIDENCE USE_EFFECT,  mounted');
           
        /*Get the stored captured images from async storage*/   
        
        getData();

        /*save description and incidence*/
        saveIncidenceDescription();

        /*get the saved description and incidence*/
        getIncidenceDescription();

        /**save data to be displayed on the activityList  in storage */
        mainActivityListData();
        /**component will unmount */
        return ()=> { 
        }
   
    }, []);

  

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

    const evidenceSubmit = () => {
        //Clear storage
        //clearStorage();
        // navigate to submit form
        navigation.navigate('SubmitEvidenceForm');
    }

    /**save incidence type and description */
    const saveIncidenceDescription = () => {
    let  storedObject = {};
    storedObject.incidenceValue = selectedIncidence;
    storedObject.descriptionText = description;

    try {
        AsyncStorage.setItem('allTextValue', JSON.stringify(storedObject));
        
    }catch (error){
        console.log('error with saving incidence and description');
    }
    }

    /**Getting images from async storage */
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('photos')
            console.log('async values', value);
            if(value !== null){
                setPhotos((JSON.parse(value)))
            }
        }catch(e){
        console.log('error with async getData');
    }
           
    }

    /** get incidence type and description*/
    const  getIncidenceDescription = async () => {
        try {
            const infoValue = await AsyncStorage.getItem('allTextValue')
            let resObject = JSON.parse(infoValue);
            console.log('resObject '+ resObject)
            setDescription(resObject.descriptionText)
            setSelectedIncidence(resObject.incidenceValue)
            console.log("Description" + resObject.descriptionText)
        } catch (error){
            console.log(error);
        }
    }

    /** save image in an array 
     * evidence-files : consist of audio, videos, pictures
    */
    const mainActivityListData = async ()=> {
        let newData = {}
        newData.evidenceFiles = photos;
        newData.incidenceValue = selectedIncidence;
        newData.description = description;
        
        let data = await AsyncStorage.getItem('mainActivityData');
        data = data? JSON.parse(data) : [];
        
        data.push(newData);
        await AsyncStorage.setItem('mainActivityData', JSON.stringify(data), () => {    
        });
        console.log('MAIN ACTIVITY DATA '+ data);
       
    }
    

   
/**
 * This method navigates to photo preview page
 * @param path image retrieved from flat list item in evidence page
 */
    const  navigateToPhotoPreview = (path) =>{
        navigation.navigate('PhotoPreviewer',
        {
            transferredImageItem: path,
        
        })      
    }


    return(
        <SafeAreaView style= {globalStyle.MainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#174060"/>
            <View flexDirection='column' flex={0.456} marginTop={30} 
            marginRight ={5}
            marginLeft ={5}
            borderWidth={0.5}
            borderRadius={3}
            borderColor='#7E7E7E'>
                <View>
                    <FlatList
                        data= {photos}
                        keyExtractor={(item, index)=> index}
                        renderItem={ ({ item}) => (  
                          <TouchableOpacity onPress={() => navigateToPhotoPreview(item) }>
                             <Image
                                onLoadStart={_onLoadStart}
                                onLoadEnd={_onLoadEnd}
                                style={{ width:70, height:75,margin:0.5, resizeMode:'cover'}}   
                                source = {{ uri: "file://"+ item}} 
                                // source = {{ uri: item}} 
                                //source = {{ uri: item.node.image.uri}} 
                            />
                            {/* {loading && <ActivityIndicator
                                size='small'
                                color='#1D5179'
                                style={styles.activityIndicator}
                                animating={loading}
                            />} */}
                             
                           
                          </TouchableOpacity>   
                         )   
                        }
                        numColumns = {5}
                    />
                    {/* <Image
                        style={{ width:70, height:75,margin:0.5, resizeMode:'cover'}}   
                        source = {{ uri: "file://"+ photos}} 
                        // source = {{ uri: item}} 
                        //source = {{ uri: item.node.image.uri}} 
                    /> */}
                </View>  
            </View>
            <TouchableOpacity style={styles.addPhotoButton}
                    onPress={()=>{navigation.goBack()}}>
                    <Add
                       name={'add'}
                       size={30}
                       color="white"  
                    />   
            </TouchableOpacity>

            <View style={{justifyContent: 'center', margin:5 ,flex: 1.2}}>
                <View style={{borderWidth: 1, 
                    borderColor:'#C4C4C4',
                    borderRadius:5,
                    width: 270, 
                    marginLeft: 5,
                    marginBottom: 0,
                    marginTop: 15}}>
                    <Picker
                        selectedValue ={selectedIncidence}
                        style={{height:45, width: 270, 
                        fontFamily:'roboto', 
                        fontStyle:'normal',
                        fontWeight:'normal'}}
                        onValueChange={(itemValue, itemIndex) =>
                           setIncidence(itemValue)
                        }
                    >
                    <Picker.Item label="select incidence type" value="" color="gray"/>    
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
                <View marginBottom={0} marginLeft={5} marginTop={15}>
                    <Text style={styles.textStyle}>
                        Description
                    </Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <View>
                        <TextInput 
                            style={{height: 70, 
                            width: 270,
                            borderRadius: 8,
                            borderColor:'#C4C4C4',
                            borderWidth: 1, marginLeft: 5}}
                            onChangeText={(text) => 
                             setInputtedText(text)
                            }
                            value={description}
                            multiline={true}
                            enablesReturnKeyAutomatically={true}
                        > 
                        </TextInput>
                    </View>
                        <TouchableOpacity style={styles.microphoneButton}
                        onPress={()=> navigation.navigate('AudioRecorder') } >
                            <Microphone name="microphone" 
                            size={21} 
                            color='white'
                            /> 
                        </TouchableOpacity>
                </View>
                <View marginBottom={0} marginLeft={0} marginTop={30}  marginBottom={15} >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{margin:10,marginRight:10,
                                fontFamily:'roboto', fontSize: 14,
                                fontWeight:'bold', 
                                }}>
                            Register to track
                        </Text>
                        <View style={styles.radioCircumference}>
                            <TouchableOpacity style={styles.radioButton}></TouchableOpacity>
                        </View>
                        <Text style={{marginLeft: 5, marginRight: 0, marginTop: 10}}>anonymous</Text>  
                        <Text style={{marginLeft: 10, marginRight: 10, marginTop: 10, fontWeight:'bold'}}> or </Text>
                        <View style={styles.radioCircumference}>
                            <TouchableOpacity style={styles.radioButton}></TouchableOpacity>
                        </View>
                        <Text style={{marginTop: 10,marginLeft: 5, marginRight: 0}}>Sign In</Text>                   
                    </View>
                </View>
            
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> evidenceSubmit()}
                >
                    <Text style={{color:'white', 
                        alignSelf:'center',
                        fontSize: 18,
                        }}>
                        Next
                    </Text>
                </TouchableOpacity>   
            </View>
        
        </SafeAreaView> 
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
        fontWeight: 'bold'
    },
    button: {
        width: 100,
        height: 45,
        margin: 10,
        marginTop: 20,
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