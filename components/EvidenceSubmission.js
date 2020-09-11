import React, { useState, useEffect } from 'react';

import {
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
    StatusBar,
    TextInput,
    FlatList,
    Pressable,
    Dimensions,
    Modal,
    Button,
    Alert,
    Platform,
    Keyboard,
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



export default function EvidenceSubmission ({route, navigation}){
    //Incidence
    const [state, setState]= useState({
        selectedIncidence: 'Please select incidence',
        photos:[],
    });
    //state to hold description
    const [text, onChangeText] = useState({
        textInputted: '',
    })
    //selected item with flatlist
    const [selectedImage, setSelectedImage] = useState(null);
    

    //navigating value of image from photoLogic to this page

    let { transferredImage }= route.params
    console.log("transferred URI "+ transferredImage);
    console.log('retrieved images'+ state.photos)
    const { countImageAdded } = route.params
    console.log ('Number of pictures taken (EvidenceSub. page) : '+ countImageAdded);
    // const { getLatitudeTransferred } = route.params
    // const { getLongitudeTransferred } = route.params
    // const { getTimeTransferred } = route.params
    // const { getDateTransferred } = route.params
    // const { getTimeOfTransfer } = route.params

    /**
     * This method navigates to photo oreview
     * @param {} path image retrieved from flatlist item in evidence page
     */
    const  navigateToPhotoPreview = (path) =>{
        navigation.navigate('PhotoPreviewer',
                        {
                        transferredImageItem: path,
                        
                        })
    }
    

   

     //state to hold transferred image
    // const[dataFromPhotoLogic, setRetrievedDataFromPhotoLogic  ] = useState([
    //     {photo: transferredImage, key:dataFromPhotoLogic.map(function(e){return e.name;}).indexOf('photo')}
    // ]);

   // console.log('TRANSFERRED:' + transferredImage ) 



   /**
    * This method clears Storage and gallery on submit, to 
    * allow new images into storage and gallery
    * 
    * */
   const clearStorage= async() =>{
    try{
        await AsyncStorage.clear();

    } catch(exception){
        console.log('error clearing  items');
    }
    console.log('items cleared (Evidence Page)');

    //clear gallery
    setState({
        photos: " "
    })
}
  

    //loading images from camera roll on component mount
    useEffect(()=> {
        AsyncStorage.getItem('photos')
            .then((photos) => {
                const photo = photos ? JSON.parse(photos) : [];
                photo.push(transferredImage);
                AsyncStorage.setItem('photos', JSON.stringify(photo));
            });  
            const getData = async () => {
                try {
                    const value = await AsyncStorage.getItem('photos')
                    if(value !==null){
                        setState({
                            photos: JSON.parse(value),
                        })
                        /*set transferred image variable to empty to allow
                        the intake of a new one*/
                        transferredImage = " ";
                        console.log('emptied transferred image variable '+ transferredImage)
                    }
                }catch(e){
                   console.log('error with async getData');
                }  
            }
             //Get the stored images from camera
             getData();

           
        
            
        // dataFromPhotoLogic.push(transferredImage);
        // console.log('KEY'+ dataFromPhotoLogic.key);
        // console.log('this is the time in evidence '+ Date.now());
        // CameraRoll.getPhotos({
        //     first: 15,
        //     toTime: getTimeOfTransfer,
        //     assetType: "All",
            
           
           
        // })
        // .then((data)=> {
        //     const assets = data.edges
        //    // console.log("DATA EDGES" +assets)
        //    //const images = Array.apply(assets.map((asset) => asset.node.image));
        //    console.log('this is my timestamp' + Date.now());

          
        //     setState({
        //         photos: assets,
        //     })
        //     }, 
        //     (error) => {
        //         console.warn( error)
        //     }
            
        // );
    }, []);
          
 
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
                        data = {state.photos}
                        keyExtractor={(item, index)=> index}
                        renderItem={ ({ item}) => (  
                           
                          <TouchableOpacity onPress={() => navigateToPhotoPreview(item) }>
                             <Image
                                style={{ width:70, height:75,margin:0.5, resizeMode:'cover'}}   
                                source = {{ uri: "file://"+ item}} 
                                // source = {{ uri: item}} 
                                //source = {{ uri: item.node.image.uri}} 
                            />
                          </TouchableOpacity>   
                           
                           )   
                        }
                        numColumns = {5}
                       
                       
                        
                        // {state.photos.map((photo, i) => {
                        //     {console.log("PHOTO is :"+ photo)} 
                        //     {console.log("PHOTO TO BE VIEWED" + state.photos)}
                        //     return(
                        //         <Image 
                        //             key={i}
                        //             style={{ width:65, height:65,}}
                        //             source={{uri: photo.uri}}
                        //         />
                        //         );
                                
                        // })}
                        
                   />
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
                        selectedValue ={state.selectedIncidence}
                        style={{height:45, width: 270, 
                        fontFamily:'roboto', 
                        fontStyle:'normal',
                        fontWeight:'normal'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({selectedIncidence: itemValue})
                        }
                    >
                        
                    <Picker.Item label="Non-Compliance" value="Gun Shot"/>
                    <Picker.Item label="Logistics" value="Stolen ballot boxes"/>
                    <Picker.Item label="Harassment" value="Misunderstanding leading"/>
                    <Picker.Item label="Interference" value="Faulty"/>
                    <Picker.Item label="Violence" value="Power"/>
                    <Picker.Item label="Delays" value="fight"/>
                    <Picker.Item label="Confusion" value="Late"/>
                    <Picker.Item label="Chaos" value="controlling"/>
                    <Picker.Item label="Power Failure" value="Standard"/>
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
                            onChangeText={(text) => setState({text})}
                            value={state.text}
                            multiline={true}
                            enablesReturnKeyAutomatically={true}>
                        </TextInput>
                    </View>
                        <TouchableOpacity style={styles.microphoneButton}>
                            <Microphone name="microphone" 
                            size={21} 
                            color='white'
                            /> 
                        </TouchableOpacity>
                </View>
                <View marginBottom={0} marginLeft={0} marginTop={15}  marginBottom={15} >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{margin:10,marginRight:20,
                                fontFamily:'roboto', fontSize: 14,
                                fontWeight:'bold', 
                                }}>
                            Submit as
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
                    onPress={clearStorage}>
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

    
})