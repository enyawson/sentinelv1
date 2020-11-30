import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, Dimensions
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
import Play from 'react-native-vector-icons/Ionicons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ScannerDoc from '../components/ScannerDoc';


export default function ScannedDocumentPage ({route, navigation,navigation:{setParams}}){

    const [selectedFormType, setSelectedFormType] = useState('select Form Type');
    const [description, setDescription] = useState("");
    const [scannedSheets, setScannedSheets] = useState([]);
    const [reference, setReference]= useState('');
    const [totalVoteCounted, setTotalVoteCounted]= useState('');
    const [totalRejectedVotes, setTotalRejectedVotes]= useState('');

   // width of cropped image
   const imageWidth = ((Dimensions.get('window').width) );
//    console.log(imageWidth)

    /**navigated image */
   // const { transferredImage } = route.params
    /**component did mount , component will unmount */
    useEffect(()=> {
        console.log('Report page mounted');   
        
        //get scanned image data
        getData();
       
        return ()=> { 
            console.log('report unmounted')
        }
    }, []);

  
   /*set the state of form type selected */
    const setForm = (itemSelected) => {
      setSelectedFormType(itemSelected)
      console.log("Form " + itemSelected)
    }
    /** set state of description entered */
    const setInputtedText = (inputtedText) => {
        setDescription(inputtedText)
        console.log("InputtedText "+ inputtedText)
    }
    const setReferenceText = (text)=>{
        setReference(text)
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
        
    //clear gallery and report fields
        setScannedSheets("")
        setDescription("")
        setSelectedFormType("")
    }

    const formReportSubmit = async () => {
        /**Clears storage*/
        //clearStorage();
        /**save data to be displayed on the activityList  in storage */
        
        await removeDataStored();
        setScannedSheets('');
        navigation.navigate('Home');
    }

    /**save Form type and description  used to preview activity on report*/
    const saveFormDescription = () => {
    let  storedObject = {};
    storedObject.formValue = selectedFormType;
    storedObject.descriptionText = description;

        try {
            AsyncStorage.setItem('formTextValues', JSON.stringify(storedObject));
            
        }catch (error){
            console.log('error with saving scannedSheets and description');
        }
    }

                
    /**Get Photos from async storage */
    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('scannerCroppedImage')
        // console.log('async Photo values', value);
        if(value !== null){
            setScannedSheets((JSON.parse(value)));
        }
        
        }catch(e){
        console.log('error with async getData');
        }    
    }
        
    


    // /** This method gets form type and description*/
    // const  getFormDescription = async () => {
    //     try {
    //         const infoValue = await AsyncStorage.getItem('formTextValue')
    //         let resObject = JSON.parse(infoValue);
    //         console.log('resObject '+ resObject)
    //         setDescription(resObject.descriptionText)
    //         setSelectedFormType(resObject.incidenceValue)
    //         console.log("Description" + resObject.descriptionText)
    //     } catch (error){
    //         console.log(error);
    //     }
    // }

    
   


    /** save image in an array 
     
    */
    // const mainActivityListData = async ()=> {
    //     // let newData = {}

        // newData.reportedForms = scannedSheets;
        // newData.formValue = selectedFormType;
        // newData.description = description;
        // //newData.timeTaken = timeFileTaken;
        // //newData.streetName = location;
        // //picture details 
        // //newData.picDetail = picDetails;
       
        // //newData.locationCord = locCoordinates;
        // //newData.dateTaken = dateFileTaken;
        
        // let data = await AsyncStorage.getItem('mainActivityData');
        // data = data? JSON.parse(data) : [];
        
        // data.push(newData);
        // await AsyncStorage.setItem('mainActivityData', JSON.stringify(data), () => {    
        //     // console.log('MAIN ACTIVITY DATA '+ data);
        //     // console.log(data)
        // });
        
        //clear files and text on report form page after submitting
    //     setScannedSheets("")
    //     setDescription("")
    //     setSelectedFormType("")
    // }
    
   
/**
 * This method navigates to photo preview page
 * @param path image retrieved from flat list item in report from page
 */
    const  navigateToPhotoPreview = (path) =>{
        navigation.navigate('PhotoPreviewer',
        {
            transferredImageItem: path,
        
        })      
    }
 /**This method clears scannedImages array */
 const removeDataStored = async () =>{
    try{
        await AsyncStorage.removeItem('scannedImages');
        await AsyncStorage.removeItem('scannerCroppedImage');
        console.log('images cleared');

    }catch(e){
        console.log('error')
    }
}


    return(
        <View style= {{flex:3,}}>
        <StatusBar barStyle="light-content" backgroundColor="#174060"/>
        
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>

       
            <View flexDirection='row' flex={1.5} marginTop={30} 
                marginRight ={5}
                marginLeft ={5}
                borderWidth={0}
                borderRadius={3}
                justifyContent={'center'}
                borderColor='#7E7E7E'>
                <View style={{justifyContent: 'center'}}>
                {/* <Image
                style={{ flex:1,width: imageWidth, margin:1, resizeMode:'contain'}}   
                source = {{ uri: scannedSheets}} 
                /> */}
                    <FlatList
                        data= {scannedSheets.reverse()}
                        keyExtractor={(item, index)=> index}
                        horizontal={true}
                        renderItem={ ({item}) => (  
                          <TouchableOpacity onPress={() => navigateToPhotoPreview(item) }>
                             <Image
                                style={{ flex:1,width: imageWidth, margin:1, resizeMode:'contain'}}   
                                source = {{ uri: item}} />
                                {/* <Image
                                style={{ width:115, height:214,margin:1, resizeMode:'cover'}}   
                                source = {{ uri: item}}/> */}
                        </TouchableOpacity>   
                         )   
                        }
                    />
                    
                </View>  
                {/* <TouchableOpacity style={styles.addPhotoButton}
                    onPress={()=> navigation.navigate('CameraScanner')}>
                    <Add
                    name={'add'}
                    size={30}
                    color="white"/>   
                </TouchableOpacity> */}
            </View>
           
           
            <View style={{justifyContent: 'center', margin:0 ,flex: 1, }}>
              
                <View style={{flexDirection:'column', marginTop:20, 
                marginLeft:10, marginRight:10}}>
                    <TextInput 
                        style={{     
                        width: '80%',
                        height:40,
                        borderRadius: 8,
                        borderColor:'#C4C4C4',
                        borderWidth: 1, 
                        marginLeft: 0,
                        marginRight: 30,
                        paddingTop: 10,
                        alignSelf:'center',
                        }}
                        onChangeText={(text) => 
                            setReferenceText(text)
                        }
                        textAlignVertical={'top'}
                        value={reference}
                        multiline={false}
                        keyboardType="numeric"
                        placeholder={' Enter reference Number'}
                        fontSize={14}
                        enablesReturnKeyAutomatically={true}
                    > 
                        </TextInput>
                </View>
                <View marginBottom={0} marginLeft={15} marginTop={10}>
                    <Text style={styles.textStyle}>
                        Comment
                    </Text>
                </View>
                <View style={{flexDirection:'row', alignSelf:'center' , }} >
                    <View style={{}}> 
                        <TextInput 
                            style={{
                            height: 70,
                            width: 270,
                            borderRadius: 8,
                            borderColor:'#C4C4C4',
                            borderWidth: 1, 
                            marginLeft: 5,
                            paddingTop: 20,}}
                            onChangeText={(text) => 
                             setInputtedText(text)
                            }
                            textAlignVertical={'top'}
                            value={description}
                            multiline={true}
                            placeholder={' Enter comment'}
                            fontSize={14}
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
                  
            </View>
            <View>
                 <TouchableOpacity
                style={{ width: Dimensions.get('window').width,
                height: 45,
                margin: 0,
                marginTop: 0,
                justifyContent: 'center',
                backgroundColor: '#1D5179',
                alignSelf:'center'}}
                onPress={()=> formReportSubmit()}>
                <Text style={{color:'white', 
                    alignSelf:'center',
                    fontSize: 18,
                    }}>
                    Submit
                </Text>
            </TouchableOpacity> 
            </View>
           
            </ScrollView>
            <KeyboardSpacer />
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
    textStyle:{
        fontSize: 14,   
        fontFamily: 'roboto',
        fontWeight: 'bold'
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