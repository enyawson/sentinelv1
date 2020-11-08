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
import Play from 'react-native-vector-icons/Ionicons';



export default function ScannedDocumentPage ({route, navigation,navigation:{setParams}}){

    const [selectedFormType, setSelectedFormType] = useState('select Form Type');
    const [description, setDescription] = useState("");
    const [scannedSheets, setScannedSheets] = useState([]);
   
   
    
  


    /**navigated image */
   // const { transferredImage } = route.params
    /**component did mount , component will unmount */
    useEffect(()=> {
        console.log('Report page,  mounted');   
        
        //get scanned image data
        getData();

        return ()=> { 
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

    // const formReportSubmit = async () => {
    //     /**Clears storage*/
    //     //clearStorage();
    //     /**save data to be displayed on the activityList  in storage */
    //     console.log("SCANNED IMAGES : "+ scannedSheets);
    //     await removeDataStored();
    //     navigation.navigate('Home');
    // }

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

    /**Get Images , image details from async storage in Document scanner page */
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('scannedImages')
            console.log('async scannedImages values', value);
            if(value !== null){
                setScannedSheets((JSON.parse(value)));
            }
        }catch(e){
        console.log('error with async getData');
        }     
        console.log("scanned sheets state "+ scannedSheets)
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

    /**This method clears storage for photos submitted to receive new ones */
    const removeDataStored = async () =>{
        try{
            await AsyncStorage.removeItem('scannedImages');

        }catch(e){
            console.log('error')
        }
        console.log('removed photos, picture details')
    }



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
                        data= {scannedSheets}
                        keyExtractor={(item, index)=> index}
                        renderItem={ ({ item}) => (  
                          <TouchableOpacity onPress={() => navigateToPhotoPreview(item) }>
                             <Image
                                style={{ width:70, height:75,margin:1, resizeMode:'cover'}}   
                                source = {{ uri: "file://"+ item}} 
                            />
                        </TouchableOpacity>   
                         )   
                        }
                        numColumns = {5}
                    />
                    
                </View>  
            </View>
            <TouchableOpacity style={styles.addPhotoButton}
                onPress={()=>{navigation.goBack()}}>
                <Add
                name={'add'}
                size={30}
                color="white"/>   
            </TouchableOpacity>

            <View style={{justifyContent: 'center', margin:5 ,flex: 1.2}}>
                <View style={{borderWidth: 1, 
                    borderColor:'#C4C4C4',
                    borderRadius:5,
                    width: 270, 
                    marginLeft: 5,
                    marginBottom: 0,
                    marginTop: 10}}>
                    <Picker
                        selectedValue={selectedFormType}
                        style={{height:45, width: 270, 
                        fontFamily:'roboto', 
                        fontStyle:'normal',
                        fontWeight:'normal'}}
                        onValueChange={(itemValue, itemIndex) =>
                           setForm(itemValue)
                        }
                    >
                    <Picker.Item label="select form type" value="" color="#898989" />    
                    <Picker.Item label="Form A" value="Form A"/>
                    <Picker.Item label="Form B" value="Form B"/>
                    </Picker>
                </View>
                <View marginBottom={0} marginLeft={5} marginTop={30}>
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
                            textAlignVertical={'top'}
                            value={description}
                            multiline={true}
                            placeholder={' enter text'}
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
                <View marginBottom={0} marginLeft={10}marginTop={30}  marginBottom={20} >
                    <View style={{flexDirection: 'row', }}>
                        <Text style={{
                            fontFamily:'roboto', fontSize: 16, marginRight: 5, marginLeft: 0,
                            fontWeight:'500', color:'#1D5179',
                            }}
                            onPress={()=>navigation.navigate('SignUp')}>
                            Register 
                        </Text>
                        <Text style={{
                            fontFamily:'roboto', fontSize: 16,marginLeft:5,
                            fontWeight:'500',color:'#898989'
                            }}>
                            and 
                        </Text>
                        <Text style={{
                            fontFamily:'roboto', fontSize: 16,marginLeft:5,
                            fontWeight:'500',color:'#1D5179'
                            }}>
                            Sign In 
                        </Text>
                        <Text style={{
                            fontFamily:'roboto', fontSize: 16,marginLeft:5,
                            fontWeight:'500',color:'#898989'
                            }}>
                            to get feedback
                        </Text>
                        {/* <View style={styles.radioCircumference}>
                            <TouchableOpacity style={styles.radioButton}></TouchableOpacity>
                        </View>
                        <Text style={{marginLeft: 5, marginRight: 0, marginTop: 10}}>anonymous</Text>  
                        <Text style={{marginLeft: 10, marginRight: 10, marginTop: 10, fontWeight:'bold'}}> or </Text>
                        <View style={styles.radioCircumference}>
                            <TouchableOpacity style={styles.radioButton}></TouchableOpacity>
                        </View> */}
                        {/* <Text style={{marginTop: 10,marginLeft: 5, marginRight: 0}}>Sign In</Text>                    */}
                    </View>
                </View>
            
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> formReportSubmit()}>
                    <Text style={{color:'white', 
                        alignSelf:'center',
                        fontSize: 18,
                        }}>
                        Submit
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